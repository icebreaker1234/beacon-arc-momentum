import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "./brand-mark";

const links = [
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="site-container flex h-20 items-center justify-between">
        <BrandMark />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="nav-link"
              activeProps={{ className: "text-primary" }}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="lg">
            <Link to="/contact">
              Let’s talk <span aria-hidden="true">↗</span>
            </Link>
          </Button>
        </nav>
        <Button
          className="min-h-11 min-w-11 md:hidden"
          variant="ghost"
          size="icon"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav
          className="border-t border-border bg-background px-5 py-6 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-sm px-3 py-3 text-lg font-medium text-foreground hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-3">
              <Link to="/contact" onClick={() => setOpen(false)}>
                Let’s talk
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
