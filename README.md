# isaackim

김이삭 깃허브

## CONPORTLAB homepage prototype

This local workspace contains a static homepage prototype based on the CONPORTLAB homepage revision direction.

### What is included

- `index.html` - main landing page
- `styles.css` - responsive layout and visual system
- `script.js` - navigation, filters, contact form behavior, and small interactions
- `pages/` - separate detail pages linked from CTA and "more" buttons
- `assets/` - local visual assets and company profile placeholder

### Local preview

Run a simple static server from the repository root:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

### QA

For full pre-delivery QA, keep the local preview server running and run:

```bash
node scripts/qa-all.mjs --base-url http://127.0.0.1:4173
```

The full QA runner executes whitespace checks, JavaScript syntax checks, SEO/sitemap QA, official Imweb asset QA, Chrome source snapshot QA, official/admin copy QA, Imweb admin landing source QA, visual screenshot QA, section screenshot QA, full HTML render QA, and interaction QA. The combined JSON report is written to `qa/all-qa-latest/report.json`.

With the local preview server running, run:

```bash
node scripts/qa-site.mjs --base-url http://127.0.0.1:4173
```

The script checks local HTML links/assets and renders every HTML entry page at desktop and mobile widths. The JSON report is written to `qa/site-qa-latest/report.json`.

For SEO and sitemap checks, run:

```bash
node scripts/qa-seo.mjs --expected-lastmod 2026-05-30
```

The SEO script checks indexable page metadata, brand titles, canonical URLs, Twitter/OG tags, sitemap coverage, duplicate URLs, and sitemap `lastmod` values. The JSON report is written to `qa/seo-qa-latest/report.json`.

For navigation and conversion-flow interaction checks, run:

```bash
node scripts/qa-interactions.mjs --base-url http://127.0.0.1:4173
```

The interaction script checks desktop dropdowns, mobile menu behavior, the landing product selector, newsletter submit message, contact modal, and local lead queue behavior. The JSON report is written to `qa/interaction-qa-latest/report.json`.

For official Imweb asset provenance checks, run:

```bash
node scripts/qa-assets.mjs
```

The asset script checks runtime references only, so `docs/` and QA scripts do not count as proof that an official asset is live on the site. It verifies official Imweb source assets from `assets/imweb/official-*`, flags unapproved unused official assets, blocks non-official Imweb image references except the cleaned brand logos, and requires the company/product/recruit/solution/usecase official folders to remain fully used. It also compares assets with the Chrome source snapshots in `qa/chrome-source-latest/`, recording direct CDN filename matches, mapped source URL/SHA matches from `docs/conportlab-official-asset-map.json`, and same-dimension source matches. If a local official asset is intentionally used but no longer appears in the current Chrome source snapshots, it must be listed as a source-evidence allowlisted runtime asset in the report instead of being silently treated as proven source-matched. The JSON report includes each asset's live reference files/lines, source snapshot evidence, dimensions, byte size, and short SHA-256 hash, and is written to `qa/asset-qa-latest/report.json`.

For Chrome source snapshot integrity checks, run:

```bash
node scripts/qa-source-snapshots.mjs
```

The source snapshot script verifies that the latest Chrome-captured official page snapshot includes the required product, solution, use case, company, history, news/media, recruit, and contact pages, and that the Imweb admin design snapshot includes the mapped visible landing backgrounds. It also checks snapshot freshness with a default 48-hour maximum age; override with `--max-snapshot-age-hours` when intentionally auditing older captured sources. The JSON report is written to `qa/source-snapshot-qa-latest/report.json`.

For official/admin copy and menu-structure checks, run:

```bash
node scripts/qa-copy.mjs
```

The copy script checks required official phrases across the main landing, product, solution, use case, company, history, news/media, recruit, and contact pages. It also verifies source-backed phrases against the latest Chrome snapshots in `qa/chrome-source-latest/`, so core wording must be present both in the local page and in the captured official/Imweb source. The source snapshots are checked with the same default 48-hour freshness limit. Desktop and mobile menu labels/links are checked against the official site structure. The JSON report is written to `qa/copy-qa-latest/report.json`.
The official copy source map is maintained in `docs/conportlab-official-copy-map.json`, and the QA script reads that file directly so the documented source mapping, source-backed phrases, and test criteria stay in sync.

For Imweb admin landing section source checks, run:

```bash
node scripts/qa-admin-source.mjs
```

The admin source script reads `docs/conportlab-admin-section-map.json` and the latest Chrome admin design snapshot, then verifies that the six visible admin landing backgrounds and five visible admin logo/partner images have matching local runtime assets. It now also fails when a visible Imweb admin CDN background or image is not represented in the map, so newly exposed admin assets cannot silently be skipped. It checks that key admin section phrases and exact full admin source sentences remain reflected in the expected local files, and verifies that the landing page's `admin-source-copy` JSON keys are actually referenced by `data-admin-source-key` sections. Source snippets and exact source text are checked against the matching admin background image text, not the combined page text, and the admin snapshot is also checked against the default 48-hour freshness limit. The JSON report is written to `qa/admin-source-qa-latest/report.json`.

For repeatable visual screenshot QA, run:

```bash
node scripts/qa-visual.mjs --base-url http://127.0.0.1:4173
```

The visual script captures desktop and mobile screenshots for the main landing and key official pages, then checks horizontal overflow, clipped visible text, blank images, console errors, and suspiciously empty tall sections. Screenshots and `report.json` are written to `qa/visual-qa-latest/`.

For section-by-section screenshot QA, run:

```bash
node scripts/qa-sections.mjs --base-url http://127.0.0.1:4173
```

The section script captures desktop and mobile screenshots for 35 named landing/official sections and checks missing or hidden sections, section-level overflow, clipped text, blank images, image visibility, console errors, and configured maximum heights for compact landing sections. Before each section screenshot it scrolls through reveal targets inside the section, so lazy images and scroll-triggered cards are visible in the captured evidence. Screenshots and `report.json` are written to `qa/section-qa-latest/`.

### Note

The original repository is private. Local `git clone` was blocked by missing GitHub credentials in this environment, so this workspace was recreated from the authenticated GitHub app context and local static assets.
