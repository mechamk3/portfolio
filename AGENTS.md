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

## Portfolio structure
- Site copy lives in `src/content/{en,fa}.ts` (+ `hris/` for the case study); pages only read from there, so keep the dictionaries free of keys no page renders.
- Every page sits under `src/routes/$locale.*`; `/` redirects to the default locale (fa) and `__root` sets `lang`/`dir` from the locale param.
- The shared ThemeProvider defaults to dark, restores the visitor's local theme preference after hydration, and controls the root dark class; all colors use global semantic tokens with light overrides.
- Shared project artwork lives in ProjectVisual and uses real screenshots or domain symbols, so home and project-list cards stay visually consistent without fabricated product data.
- The shared Backdrop supplies a quiet, token-based canvas to every locale page; keep decoration centralized rather than layering it into sections.
- Base palette colors and semantic roles are defined centrally in global CSS; section backgrounds are plain full-width bands, never decorative grids or hatching. Success, warning, and danger retain distinct semantic hues independently of brand accents.
