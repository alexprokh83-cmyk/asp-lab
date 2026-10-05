# Hosting notes

The deployment target is not decided. Verify these on the real host before launch:

1. **Clean URLs.** Pages are emitted as `dir/index.html`. The host must serve `/solutions` and `/uk/solutions` without `.html`, and `/`, `/uk/`, `/ru/` for locale homes.
2. **Trailing-slash policy.** Canonical: locale homes end with `/`, all other pages do not. The host should redirect the non-canonical form (or serve both). Not yet verified on a real host.
3. **Genuine 404.** `dist/404.html` must be returned with HTTP status 404 (Netlify, Cloudflare Pages and Vercel pick it up automatically; for nginx use `error_page 404 /404.html;`). It shows all three languages because a static 404 cannot know the visitor's language.
4. **Preview vs production.** Without `SITE_MODE=production` and a real `PUBLIC_SITE_URL` the build is noindex, robots disallow, and the sitemap is empty. Set both only for the real launch.
