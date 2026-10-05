import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("renders each content page as its own route, including the case study", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const leaf = (path: string) => router.matchRoutes(path).at(-1)?.routeId;

    expect(leaf("/work")).toBe("/work/");
    expect(leaf("/work/co-living-operations")).toBe("/work/co-living-operations");
    for (const path of ["/services", "/about", "/contact", "/privacy", "/terms"]) {
      expect(leaf(path)).toBe(path);
    }
  });
});
