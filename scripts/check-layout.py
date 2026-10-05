#!/usr/bin/env python3
"""Optional browser check (needs playwright + chromium): after `npm run build`, serves dist/ and checks every page at
320/375/768/1024/1440/1920 px for page-level horizontal overflow and exactly one <h1>. Not part of `npm test`."""
import subprocess, sys, time, glob, os
from playwright.sync_api import sync_playwright
paths = sorted({"/" + os.path.relpath(os.path.dirname(f), "dist").replace(".", "") .strip("/") for f in glob.glob("dist/**/index.html", recursive=True) if "_astro" not in f})
srv = subprocess.Popen([sys.executable, "-m", "http.server", "4399", "--directory", "dist"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1); bad = []
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        for w in (320, 375, 768, 1024, 1440, 1920):
            pg = b.new_page(viewport={"width": w, "height": 900})
            for path in paths:
                pg.goto("http://localhost:4399" + (path if path != "/" else "/"), wait_until="load")
                ov = pg.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
                h1 = pg.evaluate("document.querySelectorAll('h1').length")
                if ov > 0 or h1 != 1: bad.append((w, path, ov, h1))
        b.close()
finally:
    srv.terminate()
print(f"{len(paths)} pages x 6 widths checked")
print("OK" if not bad else "\n".join(f"FAIL width={w} {p} overflow={o}px h1={h}" for w, p, o, h in bad))
sys.exit(1 if bad else 0)
