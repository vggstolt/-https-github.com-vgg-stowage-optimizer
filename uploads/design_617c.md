# ST Tankers AUB — agent design kit

Source of truth: Figma file **ST - Design System - AUB**  
File key: `pAcp7x5Nwf7Iiqjh2Mgbx9`  
URL: https://www.figma.com/design/pAcp7x5Nwf7Iiqjh2Mgbx9/ST---Design-System---AUB?node-id=341-871  
Cover node: `341:871` (page **Cover**)  
Audited from Figma Desktop via `figma-cli` Safe Mode on 2026-09-24.

This kit is **only** for Stolt Tankers AUB. Do not use Rippl, SDS (`@stolt/sds`), or any other library component, token, or naming convention when building screens from this file.

HTML / Angular prototypes: use [`../ST-AUB-HTML-Prototype/design.md`](../ST-AUB-HTML-Prototype/design.md) (`snl-complib` / Storybook), not Figma instances.

## What this file is

A routing + rules document so an agent can build product screens in Figma by **instantiating published AUB components** and applying **AUB local styles**. The file is styles-based (paint / text / effect / grid styles). Local variables are empty (`Collection 1` has 0 variables) — bind styles, not variables.

## Hard rules

1. Open / connect to this file only (`pAcp7x5Nwf7Iiqjh2Mgbx9`). Confirm `figma.root.name === "ST - Design System - AUB"` before any write.
2. Instantiate components from this file. Never rebuild a control from rectangles if a live component exists.
3. Skip names starting with `.`, `.ARCHIVED`, `.⛔️`, `⛔`, or pages under **----- ARCHIVED ------**.
4. Prefer the highest version on the named component page (`Buttons 2.1`, `InputField v2.2`, `LeftNavigation v2.2`, `Modal 2.0`, `FileUploader2.0`). The **Components** page holds older duplicates.
5. Apply **local styles** by name (`Primary/P1 - Default`, `Text/T6 Body 1`, `E03`). Do not invent hex unless matching a documented style.
6. Default canvas: **1440 × 1024**, 12-column grid, column 96px, gutter 24px, left-aligned, margin 0. Customer Portal is the documented responsive exception.
7. After building, screenshot and check: styles used, no archived instances, 1440 width, auto-layout, AUB type scale.

## How to connect

### figma-cli (Safe Mode) — required for this kit’s audit path

```bash
figma-cli connect --safe
# In Figma Desktop: Plugins → Development → FigCli (keep plugin tab open)
figma-cli eval "return JSON.stringify({file:figma.root.name,page:figma.currentPage.name})"
```

Ground truth is `eval`, not `figma-cli status`. If eval prints “Not connected”, reconnect `--safe` and re-run the FigCli plugin **in this file**.

### Figma MCP / Desktop Bridge

Same document. Node ids are interchangeable in one session. Use MCP for search + instantiate when the Desktop Bridge is connected; use CLI `eval` for bulk inventory, property dumps, and batch edits.

Search: `figma_search_components` / `figma-cli find "Buttons 2.1"`  
Instantiate: `figma_instantiate_component` or Plugin API `createInstance()`  
Set variants: `figma_set_instance_properties` or `instance.setProperties({ Type: "Primary", State: "Default" })`

Details: [references/screen-build.md](references/screen-build.md)

## Document map

| Section | Pages | Agent use |
|---|---|---|
| Cover / process | Cover, Changelog & Emoji Legend | Version stamp only |
| Tokens | Colours, Formatting, Grids, Icons, Logo, Spacing, Shimmer Loader, Styles & Elevations, Typography | Bind styles; do not restyle atoms |
| Components (live) | Accordion → Truncated overflow text | Primary instance sources |
| Patterns | Accordions vs Tabs vs Cards, Search, Login, Favourite filters, table overflow, copy | Layout recipes, not extra components |
| Project mocks | Voyage list, Supply Forecasting, Port Planning, Aristow Rebuild | Examples only — do not treat as library |
| Archived | Components, Scroller (partial), Testing, Non UI Comps, Mobile Components | Docs helpers + old sets — do not ship |

Full page ids: [references/file-map.md](references/file-map.md)

## Foundations (short)

| Token | Where | Spec |
|---|---|---|
| Color | Paint styles | Neutral N1–N12, Primary P1–P5, Font F1–F5, Pastel PA1–PA10, Semantics S11–S34 |
| Type | Text styles | PT Serif T1; Roboto T2–T10; Font Awesome 6 Pro for icons |
| Space | `Spacer: Measurment` | 8–80px in 8px steps, vertical or horizontal |
| Shape | Styles & Elevations | Radius 4 / 8 / 12 / 16 / 24 / 32 / 999. Default card radius **4px** |
| Stroke | Styles & Elevations | 1px default, 2px selected, **4px selected tabs** |
| Elevation | Effect styles E01–E05 | All shadows use N1 `#0F1A2A` |
| Grid | `12 col grid [2.0]` | 96 / 24 / 0; min UI 1440×1024 |

→ [colors](references/colors.md) · [typography](references/typography.md) · [spacing](references/spacing.md) · [elevation-shape](references/elevation-shape.md) · [grids](references/grids.md) · [formatting](references/formatting.md) · [icons](references/icons.md)

## Screen composition order

1. Frame 1440×1024, apply grid style `12 col grid [2.0]`, fill `Neutral/N10` or `Neutral/N12`.
2. Instance `LeftNavigation v2.2` (`24234:1064`) — `Type=Prod|Dev|UAT`, `State=Expanded|Collapsed`.
3. Instance `PageTitle v2.1` (`15681:88214`) and/or `PageHeader - Standalone products` (`3541:8404`).
4. Body: `Card: Main`, `Table-Cell2.1` / `Table-Header2.1`, filters via `Dropdown 2.2` + `Filters 2.2`.
5. Actions: `Buttons 2.1` (Primary / Secondary / Tertiary × Default|Danger × Large).
6. Forms: `InputField v2.2`, `Checkbox`, `Radiobutton v2.1`, `Switch v2.1`, `DatePicker 2.1`, `FileUploader2.0`.
7. Feedback: `Toast`, `Alert`, `Banner`, `Modal 2.0`, `Side Panel 2.0`, `Tooltip v2.1`.
8. Copy: sentence case titles; dates/times per [formatting](references/formatting.md).

Live vs archived names: [references/components.md](references/components.md)  
Machine index: [references/components.json](references/components.json) · [references/styles.json](references/styles.json)

## Feedback loop (stop after each task)

Do **one** task, then wait for the user.

| Task | Deliverable | Done when |
|---|---|---|
| **1 — Kit scaffold** (this pass) | `design.md` + reference files from a live Figma audit | User confirms structure / names |
| **2 — Component APIs** | Per-component property cards (buttons, inputs, nav, table, modal, …) | User picks which components to deepen |
| **3 — Pattern recipes** | Search, login, filters, table overflow, accordion vs tabs vs cards | User picks a pattern to encode |
| **4 — Screen build dry-run** | One sample frame in AUB using only live instances | User reviews screenshot |

Do not start Task 2 until the user says so.

## Known file defects (work around)

- `Buttons 2.1` and `Toggle v2.1` have broken `componentPropertyDefinitions` in Plugin API. Set variants from child names: `Type`, `State`, `Variant`, `Large` (buttons); `Selected`, `State`, `Type` (toggle).
- Duplicate `Tertiary Large=False Default` variants exist on `Buttons 2.1`. Prefer the first matching instance.
- Alignment enum on inputs is misspelled `RIght`.
- Empty variable collection `Collection 1` — ignore.
- Legacy `Components` page still contains `.Input Fields`, `.ARCHIVED Buttons`, `.⛔️ LeftNavigation v2.1`. Never instantiate those for new work.
