# Locarla Daily Summary Tool

A single-file browser-based tool that generates SEO-optimised WordPress content for the **Locarla Industry Insights** blog. No installation, no server — just open `index.html` in any modern browser.

---

## Quick Start

1. Open `index.html` in Chrome or Firefox
2. Choose a mode: **Tenders Summary**, **Contract Awards**, or **News Summary**
3. Follow the 3-step flow
4. Copy the WP code and paste into WordPress Text/HTML editor

---

## The Three Modes

### 📋 Tenders Summary
Generates a daily summary of UK social housing tender alerts.

### 🏆 Contract Awards
Generates a daily summary of UK social housing contract awards (CANs).

### 📰 News Summary
Converts daily news text with links into publication-ready WordPress HTML.

---

## Mode 1 — Tenders Summary

### Step 1: Get the Bulletin HTML

1. Log into Locarla
2. Open today's **Daily Bulletin** page
3. Press `Ctrl+U` — this opens the page source in a new tab
4. Press `Ctrl+A` then `Ctrl+C` to copy all
5. Come back to the tool and paste into the text area
6. Set the **Summary Date** to today
7. Click **Process Bulletin →**

You will see: `✓ X Housing tenders found in bulletin`

### Step 2: Upload Tenders Excel

1. Export the **Tenders Excel** from Locarla (full untouched file)
2. Click the upload zone and select the `.xlsx` file
3. The tool matches bulletin tenders to Excel entries automatically
4. **✓ Excel** (green) = matched · **⚠ Manual** (amber) = not found in Excel

### Step 3: Review & Edit

Every field in the table is editable:

| Field | Notes |
|-------|-------|
| Title | Editable textarea — correct if needed |
| Client | The procuring authority |
| Value | Format: £2.5m or £450k |
| Tenure | In months |
| Location | Region or city |
| Description | Scope of works |

**Row controls:**
- **✕** — Remove a row you don't want in the summary
- **+ Add Row** — Add a missing tender manually (fill all fields)
- **⬇ Download List** — Save the current table as `.xlsx`

### Step 4: Generate Summary

1. Your **Anthropic API Key** is pre-filled (saved in the tool)
2. Click **Generate Summary →**
3. Review in the **Visual** tab
4. Switch to **WordPress Code** tab
5. Click **🔗 Links → New Tab** if needed
6. Click **Copy WP Code**
7. Paste into WordPress **Text/HTML editor**
8. Click **↺ Regenerate** for a different variation

### Tenders Filter Rules

| Rule | Detail |
|------|--------|
| Section | Tender Alerts section only |
| Sector | Must include Housing |
| Title drops | Starts with: `AIN -`, `CDE -`, `Additional Information -`, `Modification Notice -`, `Cancelled -`, `Expired -` |
| Category drops | Materials, Other Daily Tenders |
| FM trades | Hard FM, Mould/Damp only |
| Prof Services | Architect & Surveyor, EPC/Energy Management, Fire Risk Assessment only |
| Excel match | Status = Open · ≥55% word overlap with bulletin title |

---

## Mode 2 — Contract Awards

### Step 1: Get the Bulletin HTML

Same as Tenders — `Ctrl+U` on the bulletin page → `Ctrl+A` → `Ctrl+C` → paste into the tool.

### Step 2: Upload CANs Excel

1. Export the **CANs Excel** from Locarla (full untouched file — do not pre-filter)
2. Upload the `.xlsx` file
3. The tool applies all filters automatically and matches to bulletin entries

### Step 3: Review & Edit

Same editable table as Tenders, with an additional **Winner** column:

| Field | Notes |
|-------|-------|
| Title | Editable textarea |
| Authority | The procuring organisation |
| Winner | Company awarded the contract — comes from Excel |
| Value | e.g. £1.2m |
| Tenure | In months |
| Location | Region or city |
| Description | Scope of works |

**Row controls:**
- **✕** — Remove unwanted rows
- **+ Add Row** — Add a missing award manually
- **⬇ Download List** — Export as `.xlsx`

### Step 4: Generate Summary

Same as Tenders — Generate → Visual/WP Code tabs → Copy WP Code.

### Awards Filter Rules

**Bulletin side:**

| Rule | Detail |
|------|--------|
| Section | Contracts Awarded section only — stops at Minutes |
| Title drops | Same as Tenders above |
| Sector | Must include Housing |
| FM trades | Hard FM, Mould/Damp only |
| Prof Services | Architect & Surveyor, EPC/Energy Management, Fire Risk Assessment only |

**Excel (CANs) side:**

| Rule | Detail |
|------|--------|
| Status | `Awarded` only |
| UK column | `UK7` or blank **only** — UK5, UK6, UK10–UK16 all excluded |
| Sector | Must include Housing |
| Total Value | ≥ £30,000 (lower values filtered out) |
| Published date | Matches today's summary date first; falls back to full pool if fewer than 5 rows match |
| Winner skip | Rows where Winner contains: `not awarded`, `cancelled`, `withdrawn`, `no award` |

---

## Mode 3 — News Summary

This mode converts your daily news text into publication-ready WordPress HTML — no bulletin or Excel needed.

### How to Use

1. Click **📰 News Summary** tab — the tool jumps straight to the editor
2. Set the **News Date** (pre-filled to today)
3. Paste your news text into the visual editor box
4. Click **✨ Convert to WP Code**
5. The WordPress HTML appears in the output box below
6. Click **Copy WP Code**
7. Paste into WordPress **Text/HTML editor**

### Input Format

Paste your news text directly. Each paragraph = one story. Links should be in Markdown format:

```
Story text here. __[Source Name](https://url.com)__

Another story with multiple sources. __[Source One](https://url1.com)__, __[Source Two](https://url2.com)__, and __[Source Three](https://url3.com)__
```

You can also paste rich text directly from a web page — the editor preserves clickable links automatically.

### What the Converter Does

- Wraps all content in `<div class="blue-color">` — makes links appear blue on the Locarla site
- Adds `<h6>Daily News: DD/MM/YYYY</h6>` heading
- Wraps each story in `<span style="font-weight: 400;">...</span>`
- Converts every link to `<a href="URL" target="_blank" rel="noopener noreferrer">` — opens in new tab
- Preserves separators between multiple sources (`,` and `, and`)
- Adds a blank line between each story paragraph for WordPress paragraph breaks

### Output Format Example

```html
<div class="blue-color">
<h6>Daily News: 09/05/2026</h6>
<span style="font-weight: 400;">Eastlight Community Homes has secured a £20m retrofit funding facility from NatWest. </span><a href="https://housingdigital.co.uk/..." target="_blank" rel="noopener noreferrer"> <span style="font-weight: 400;">Housing Digital</span></a>

<span style="font-weight: 400;">Birmingham City Council has awarded WB Property Group an £18.6m contract. </span><a href="https://..." target="_blank" rel="noopener noreferrer"> <span style="font-weight: 400;">Housing Executive</span></a><span style="font-weight: 400;">,</span><a href="https://..." target="_blank" rel="noopener noreferrer"> <span style="font-weight: 400;">Scottish Housing News</span></a>
</div>
```

### Editor Toolbar

| Button | Action |
|--------|--------|
| **B** | Bold selected text |
| *I* | Italic selected text |
| Clear | Clear the editor |
| Clear All | Clear both editor and output |

---

## WordPress Code Tips

- Always paste into the **Text** tab (also called HTML editor), not the Visual/Gutenberg tab
- Each `<span>...<a>` line becomes a separate paragraph in WordPress
- The `blue-color` CSS class is defined in the Locarla theme — links will appear blue automatically
- The `<h6>` heading renders as a small bold heading matching the blog style

---

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| `0 tenders/awards found` | Wrong HTML pasted | Use `Ctrl+U` on the bulletin page itself, not a copied link |
| Winner field blank | Not in Excel for that row | Fill manually in the review table |
| UK6 awards appearing | Normalisation issue | Tool uses `.trim().toUpperCase()` — should not happen after latest fix |
| Summary not generating | API key issue | Key is pre-filled; if blank, paste your `sk-ant-api03-...` key |
| News links missing in output | Plain text pasted without markdown | Use `__[Name](URL)__` format, or paste rich text with actual hyperlinks |
| All stories on one line | Paragraphs not split | Separate stories with a blank line (double Enter) |
| DataDog CORS errors in console | Locarla analytics in bulletin HTML | Harmless — ignore completely |
| `Cookie "_cfuvid" rejected` | Cloudflare cookie in bulletin | Harmless — ignore completely |
| `Source map error` | Browser dev tools noise | Harmless — ignore completely |

---

## Filter Constants Reference

```javascript
// Titles starting with any of these are dropped (both Tenders and Awards)
TITLE_DROP_PREFIXES = [
  'AIN -', 'AIN-', 'CDE -', 'CDE-',
  'Additional Information -', 'Modification Notice -',
  'Cancelled -', 'Cancelled-', 'Expired -'
]

// Awards where Winner contains any of these are skipped
WINNER_SKIP_TERMS = ['not awarded', 'cancelled', 'withdrawn', 'no award']

// FM sub-trades allowed (all others in FM category are dropped)
FM_ALLOWED_PT = ['hard fm', 'mould', 'damp']

// Professional Services sub-trades allowed
PROFSVC_ALLOWED_PT = [
  'architect & surveyor',
  'epc / energy management',
  'fire risk assessment'
]

// Awards: minimum value £30,000
// Awards: UK column must be 'UK7' or blank
// Awards: Status must be 'Awarded'
// Tenders: Status must be 'Open'
```

---

## Technical Notes

| Item | Detail |
|------|--------|
| File | Single `index.html` — no install, no build step |
| Browser | Chrome or Firefox (modern version) |
| Libraries | SheetJS 0.18.5 (Excel), PDF.js 3.11.174 (reserved) |
| AI API | Anthropic Claude (`claude-sonnet-4-6`, max 4000 tokens) |
| API Key | Pre-embedded in the file · stored in `localStorage` as `locarla_api_key` |
| Deployment | GitHub Pages — replace `index.html` in repo root and push |
| Repo | `thevishwakarma/tenders-tool` |

---

## Bulletin HTML Selectors (Developer Reference)

| Element | Selector |
|---------|----------|
| Awards section start | `<a name="Contracts_Awarded">` |
| Awards section stop | `<a name="Minutes">` or `<a name="hash3+">` |
| Award title | `a.headText` with `color:#45b29d` (teal) |
| Trade category (skip) | `a.headText` with `color:#37a000` (green) |
| Client/authority | `span.sourceText > a` or `span.sourceText > span` |
| Meta table | `<table width="230">` |
| Tender title | `a.headText` with `color:#334d5c` + `font-size:22px` |
| Tenders section stop | First `a.headText` with `color:#45b29d` |

---

*Locarla Daily Summary Tool · Built for Locarla Social Housing UK · Industry Insights*
