<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture

- Keep shared public-site navigation and footer in the root route so every content page has one consistent shell and one main landmark.
- Build reusable brand, heading, callout, and workflow visual components; page routes should compose these rather than duplicate them.
- The contact form is intentionally client-only until a real delivery service is connected, and must never imply successful delivery.
