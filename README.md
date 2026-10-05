# ST Tankers AUB – Stowage planning prototype

Click-through prototype of the stowage planning flow, built with the **ST Tankers AUB**
design system (Figma file `ST - Design System - AUB`, key `pAcp7x5Nwf7Iiqjh2Mgbx9`).
It is meant to be shared with the team as a live, interactive preview of each screen in
the process flow.

Screens in the flow so far:

| Step | Screen             | Route                | Notes                                                                                               |
| ---- | ------------------ | -------------------- | --------------------------------------------------------------------------------------------------- |
| 1    | Stowage optimizer  | `/stowage-optimizer` | Optimization status, optimizer + vessel inputs, cargo constraints, interactive tank grid, toolbar. |

The index page at `/` lists every screen in the flow. New screens are registered in
`src/screens/index.ts`; the index page and router pick them up automatically.

## Run locally

```bash
npm install
npm run dev
```

Open <http://127.0.0.1:4873>. The screens are designed for the AUB desktop canvas
(1440×1024 minimum; the reference layout is 1920×1080).

Other scripts:

```bash
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build on http://127.0.0.1:4874
npm run lint      # oxlint
```

To share a static build, deploy the `dist/` folder to any static host (it is a
single-page app, so route all paths to `index.html`).

## How the design system is applied

### Tokens (`src/index.css`)

AUB colours, type scale, radii and elevations are declared once as Tailwind theme
tokens and used by name everywhere (`bg-p1`, `text-f1`, `border-n8`, `t1`…`t10`,
`rounded-aub-sm`, `shadow-e02`). Values audited directly from Figma are marked; the
remaining values were sampled from the reference screen and should be confirmed
against the **Colours** page.

| Token family | Examples                                                     |
| ------------ | ------------------------------------------------------------ |
| Neutral      | `n1` #0F1A2A … `n6` #788496, `n7` #94A3B8, `n8` #CBD4E1, `n11` #F6F8FC |
| Primary      | `p1` #008ECF (default), `p2` #007DBA, `p3` #006B9C, `p5` #E5F4FA |
| Font         | `f1` #27364B headings/body, `f2`/`f3` secondary               |
| Semantics    | `success` #49B648, `warning` #F5A623, `danger` #D34765, `danger-soft` #FFD1CD |
| Type         | `t1` PT Serif Bold 26/40 (Header 1), `t6` Roboto 16/24 (Body 1), `t9` Roboto Bold 12/18 (Label) |

### Icons (`src/design/icons.ts`, `src/components/ui/Icon.tsx`)

Previous implementations drifted on icon choice and size. The prototype fixes that with
two rules:

1. **One registry.** Every icon is referenced by a semantic name (`info`, `pinned`,
   `validated`, `logout`…) that maps to exactly one glyph in `src/design/icons.ts`.
   Screens never import an icon pack directly.
2. **Fixed sizes.** `<Icon size="…">` renders a glyph of a fixed size centred in a fixed
   box, following the AUB *Icon/FA – Regular* style (16px glyph in a 24px box):

   | size | glyph | box  | use                                   |
   | ---- | ----- | ---- | ------------------------------------- |
   | `xs` | 10px  | 16px | inline inside tags and dense cells    |
   | `sm` | 12px  | 16px | inline with 12–14px text, chips       |
   | `md` | 16px  | 24px | default – navigation, banners, fields |
   | `lg` | 20px  | 24px | header status icons, tool rails       |
   | `xl` | 24px  | 32px | hero / empty states                   |

The design system draws icons with Font Awesome 6 **Pro**, which is licensed. The
prototype uses the closest Font Awesome 6 **Free** glyphs; swapping the registry to Pro
is a one-file change.

### Components (`src/components/ui`)

Hand-built to the AUB component specs (no third-party component library, as required by
the design kit): `Button` (Buttons 2.1), `Switch` (Switch v2.1), `TextField` /
`SelectField` (InputField v2.2), `SegmentedControl`, `StatusChip` / `TankChip` / `Tag`,
`Card`, `Banner`, `InfoHint`, and `LeftNavigation` (LeftNavigation v2.2, collapsed).

## Adding the next screen

1. Create `src/screens/<screen-name>/<ScreenName>Screen.tsx` using the primitives above.
2. Register it in `src/screens/index.ts` with its route, flow step and description.
3. Reuse icon names from `src/design/icons.ts`; add new semantic names there if needed.
