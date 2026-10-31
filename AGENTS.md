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
- Site is dark-only (`<html class="dark">`); colors come from tokens in `src/styles.css`.
