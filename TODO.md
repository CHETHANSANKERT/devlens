# TODO

- [ ] Fix GitHub Pages SPA routing + asset paths
  - [ ] Update `vite.config.ts` with correct `base` for repo hosting (e.g. `/devlens/`).
  - [ ] Generate `dist/404.html` as SPA fallback (loads the app) so `/issues`, `/ai`, etc work on refresh.
  - [ ] Re-run `npm run build` and verify built `dist/index.html` asset URLs are correct.
  - [ ] Deploy to GitHub (Actions or manual) and verify deep links + refresh.

