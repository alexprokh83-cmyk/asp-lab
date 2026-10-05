// @ts-check
import { defineConfig } from "astro/config";

// The production domain is NOT set here: it comes from PUBLIC_SITE_URL
// (src/config/site.ts). Never put a preview/localhost origin in `site`.
export default defineConfig({
  output: "static",
  // The canonical slash policy (locale homes "/", "/uk/", "/ru/"; other pages
  // without a trailing slash) is produced by src/lib/i18n.ts; the hosting
  // platform must serve both forms or redirect to the canonical one.
  trailingSlash: "ignore",
  build: { format: "directory" },
});
