#!/usr/bin/env python3
"""Browser audit (needs playwright + chromium; run after `npm run build`). Serves dist/ and checks:
catalogue filters, mobile menu focus handling, skip link, language-switcher equivalence, sticky-header anchors,
axe-core WCAG 2 A/AA scan, print layout and lab Web-Vitals. Laboratory values only, not field data."""
import glob, json, os, subprocess, sys, time
from playwright.sync_api import sync_playwright

PORT = 4398; BASE = f"http://localhost:{PORT}"
AXE = open("node_modules/axe-core/axe.min.js", encoding="utf-8").read()
fails, notes = [], []
def check(ok, msg):
    (notes if ok else fails).append(("PASS " if ok else "FAIL ") + msg)

srv = subprocess.Popen([sys.executable, "-m", "http.server", str(PORT), "--directory", "dist"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1)
try:
    with sync_playwright() as p:
        b = p.chromium.launch()

        # 1. catalogue filters (JS on)
        pg = b.new_page(viewport={"width": 1280, "height": 900})
        pg.goto(BASE + "/lab")
        vis = lambda: pg.evaluate("[...document.querySelectorAll('.lab-item')].filter(e=>!e.hidden).length")
        total = pg.evaluate("document.querySelectorAll('.lab-item').length")
        check(total == 13 and vis() == 13, f"lab: all 13 projects visible by default (cards={total}, visible={vis()})")
        check(pg.evaluate("!document.querySelector('.lab-filters').hidden"), "lab: filter nav revealed by JS")
        want = pg.evaluate("[...document.querySelectorAll('.lab-item')].filter(e=>e.dataset.cats.split(' ').includes('qa')).length")
        pg.click("a[data-filter=qa]")
        check(vis() == want and want > 0, f"lab: QA direction shows {want} projects (got {vis()})")
        check("category=qa" in pg.url, "lab: URL carries validated category")
        check(pg.evaluate("document.getElementById('lab-status').textContent.length>0"), "lab: filter change announced in live region")
        check(pg.evaluate("document.querySelector('a[data-filter=qa]').getAttribute('aria-current')") == "true", "lab: active filter marked aria-current")
        w2 = pg.evaluate("[...document.querySelectorAll('.lab-item')].filter(e=>e.dataset.cats.split(' ').includes('requests')).length")
        pg.goto(BASE + "/lab?category=requests"); check(vis() == w2, f"lab: ?category=requests preselects {w2} (got {vis()})")
        pg.goto(BASE + "/lab?category=%3Cscript%3E"); check(vis() == 13, "lab: invalid category falls back to all")
        ctx = b.new_context(java_script_enabled=False); pn = ctx.new_page(); pn.goto(BASE + "/lab")
        check(pn.evaluate("document.querySelectorAll('.lab-item').length") == 13 and pn.evaluate("document.querySelector('.lab-filters').hidden"), "lab (no JS): all 13 cards present, filter UI hidden")
        check(pn.evaluate("document.querySelector('noscript')!==null"), "lab (no JS): fallback note present")
        ctx.close()
        # every project opens on its own page with the full template
        slugs = pg.evaluate("[...new Set([...document.querySelectorAll('.pcard__link')].map(a=>a.getAttribute('href')))]") if False else None
        pg.goto(BASE + "/lab")
        hrefs = pg.evaluate("[...document.querySelectorAll('.pcard__link')].map(a=>a.getAttribute('href'))")
        check(len(set(hrefs)) == 13, f"lab: 13 distinct project links ({len(set(hrefs))})")
        for h in sorted(set(hrefs)):
            pg.goto(BASE + h)
            ok = pg.evaluate("[...document.querySelectorAll('h1')].length===1 && ['pp-about','pp-how','pp-features','pp-uses','pp-tech'].every(i=>document.getElementById(i))")
            check(ok, f"project page {h}: one H1 and all sections")

        # 2. language switcher keeps the equivalent page, validated category and anchor
        pg.goto(BASE + "/uk/lab/qa-llm-lab")
        hrefs = pg.evaluate("[...document.querySelectorAll('.site-header__actions a[hreflang], .lang-switcher a')].map(a=>a.getAttribute('href'))")
        check("/lab/qa-llm-lab" in hrefs and "/ru/lab/qa-llm-lab" in hrefs, f"switcher: equivalent routes {sorted(set(hrefs))[:4]}")
        pg.goto(BASE + "/lab?category=qa#x")
        sw = pg.evaluate("[...document.querySelectorAll('.site-header__actions a[hreflang]')].map(a=>a.getAttribute('href'))")
        check(any("category=qa" in h for h in sw), f"switcher: preserves validated category on /lab ({sw})")

        # 3. skip link + visible focus
        pg.goto(BASE + "/solutions"); pg.keyboard.press("Tab"); pg.wait_for_timeout(450)
        box = pg.evaluate("(()=>{const e=document.activeElement;const r=e.getBoundingClientRect();return {cls:e.className,top:r.top,h:r.height,t:e.textContent.trim()}})()")
        check("skip" in box["cls"] and box["top"] >= 0, f"skip link focused first and on screen ({box})")
        pg.keyboard.press("Tab"); ol = pg.evaluate("getComputedStyle(document.activeElement).outlineStyle+' '+getComputedStyle(document.activeElement).outlineWidth")
        check("none" not in ol, f"visible focus outline ({ol})")

        # 4. sticky header must not hide anchor targets
        pg.goto(BASE + "/solutions#documents"); pg.wait_for_timeout(300)
        top = pg.evaluate("document.getElementById('documents').getBoundingClientRect().top"); hh = pg.evaluate("document.querySelector('.site-header').getBoundingClientRect().height")
        check(top >= hh - 1, f"anchor #documents clears sticky header (top={top:.0f}, header={hh:.0f})")

        # 5. mobile: language control visible before the menu, focus handling
        m = b.new_page(viewport={"width": 375, "height": 812}); m.goto(BASE + "/")
        check(m.evaluate("(()=>{const e=document.querySelector('.site-header__lang-mobile');return !!e&&e.getBoundingClientRect().width>0})()"), "mobile: language control visible before opening the menu")
        btn = "button.site-header__mobile-btn"; m.click(btn); m.wait_for_timeout(250)
        inside = lambda: m.evaluate("(()=>{const d=document.querySelector('[role=dialog], .mobile-nav');return d.contains(document.activeElement)})()")
        check(inside(), "mobile menu: focus moves into the dialog")
        ok = True
        for _ in range(40):
            m.keyboard.press("Tab"); ok = ok and inside()
        check(ok, "mobile menu: Tab stays trapped inside while open (40 presses)")
        check(m.evaluate("!!document.querySelector('.mobile-nav .tg, .mobile-nav [class*=tg]')"), "mobile menu: Telegram CTA present")
        m.keyboard.press("Escape"); m.wait_for_timeout(250)
        check(m.evaluate("document.activeElement.matches('button.site-header__mobile-btn')"), "mobile menu: Escape closes and focus returns to the trigger")
        check(m.evaluate("(()=>{const d=document.querySelector('.mobile-nav');return !d||d.hidden||getComputedStyle(d).display==='none'||getComputedStyle(d).visibility==='hidden'})()"), "mobile menu: closed state is not exposed")

        # 5b. no-JS navigation fallback + principal target sizes
        ctx = b.new_context(java_script_enabled=False, viewport={"width": 375, "height": 812}); nj = ctx.new_page(); nj.goto(BASE + "/")
        check(nj.evaluate("document.querySelectorAll('.noscript-nav a').length") >= 8, "no-JS: fallback navigation lists the primary routes")
        ctx.close()
        for w, h in ((1280, 900), (375, 812)):
            t = b.new_page(viewport={"width": w, "height": h}); t.goto(BASE + "/")
            small = t.evaluate("""[...document.querySelectorAll('.site-header a, .site-header button, .btn, .faq__item summary, .lab-filters a')]
              .filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&(r.height<44||r.width<44)})
              .map(e=>e.className+':'+Math.round(e.getBoundingClientRect().width)+'x'+Math.round(e.getBoundingClientRect().height)).slice(0,6)""")
            check(not small, f"targets >=44px at {w}px (small: {small})")
            t.close()
        # menu background inert while open
        m2 = b.new_page(viewport={"width": 375, "height": 812}); m2.goto(BASE + "/"); m2.click("button.site-header__mobile-btn"); m2.wait_for_timeout(200)
        check(m2.evaluate("document.querySelector('main').hasAttribute('inert') && document.querySelector('header.site-header').hasAttribute('inert')"), "mobile menu: background is inert while open")
        m2.keyboard.press("Escape"); m2.wait_for_timeout(200)
        check(m2.evaluate("!document.querySelector('main').hasAttribute('inert')"), "mobile menu: background restored after close")
        # desktop 'For whom' disclosure
        d = b.new_page(viewport={"width": 1440, "height": 900}); d.goto(BASE + "/")
        order = d.evaluate("[...document.querySelectorAll('.site-header__nav-list > li')].map(li=>li.innerText.trim().split('\\n')[0])")
        check(order == ["Solutions", "Local AI", "For whom", "Projects", "About"], f"desktop nav order {order}")
        d.click("#for-whom-btn"); check(d.evaluate("document.getElementById('for-whom-btn').getAttribute('aria-expanded')") == "true" and d.evaluate("!document.getElementById('for-whom-menu').hidden"), "For whom opens on click")
        d.keyboard.press("Escape"); check(d.evaluate("document.getElementById('for-whom-menu').hidden"), "For whom closes on Escape")

        # 6. axe-core
        pages = ["/", "/solutions", "/local-ai", "/business", "/education", "/public-sector", "/lab", "/lab/qa-llm-lab", "/lab/local-transcription", "/lab/jira-to-github-migration", "/approach", "/about", "/contact", "/privacy", "/404.html",
                 "/uk/", "/uk/local-ai", "/uk/lab/qa-llm-lab", "/ru/", "/ru/solutions", "/ru/lab"]
        for w, h in ((1280, 900), (375, 812)):
            a = b.new_page(viewport={"width": w, "height": h})
            for path in pages:
                a.goto(BASE + path, wait_until="load"); a.add_script_tag(content=AXE)
                r = a.evaluate("axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}}).then(r=>r.violations.map(v=>({id:v.id,impact:v.impact,n:v.nodes.length,sel:v.nodes[0].target.join(' ')})))")
                check(not r, f"axe {w}px {path}: {'no violations' if not r else json.dumps(r)}")
            a.close()

        # 7. print
        pr = b.new_page(viewport={"width": 1000, "height": 800}); pr.goto(BASE + "/lab/qa-llm-lab"); pr.emulate_media(media="print")
        check(pr.evaluate("getComputedStyle(document.querySelector('.site-header')).display") == "none" and pr.evaluate("document.querySelectorAll('#pp-about, #pp-features').length")>0, "print: header hidden, project sections kept")
        check(pr.evaluate("document.documentElement.scrollWidth<=document.documentElement.clientWidth+1"), "print: no horizontal overflow")

        # 8. lab web vitals (home, desktop + mobile)
        for w, h, tag in ((1440, 900, "desktop"), (375, 812, "mobile")):
            v = b.new_page(viewport={"width": w, "height": h})
            v.add_init_script("window.__v={lcp:0,cls:0};new PerformanceObserver(l=>{for(const e of l.getEntries())window.__v.lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)window.__v.cls+=e.value}).observe({type:'layout-shift',buffered:true});")
            v.goto(BASE + "/", wait_until="load"); v.wait_for_timeout(1500)
            r = v.evaluate("window.__v")
            check(r["lcp"] <= 2500 and r["cls"] <= 0.1, f"lab vitals {tag}: LCP={r['lcp']:.0f} ms, CLS={r['cls']:.3f} (localhost, unthrottled, NOT field data)")
        b.close()
finally:
    srv.terminate()

print("\n".join(notes)); print("\n".join(fails))
print(f"\n{len(notes)} passed, {len(fails)} failed")
sys.exit(1 if fails else 0)
