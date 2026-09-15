# @sdwa/tokens

## 0.3.0

### Minor Changes

- c1c7c7d: Self-host Inter, Merriweather, and JetBrains Mono in `theme.css` so consumers get working fonts from one `@import "@sdwa/tokens/theme.css"`, with no `next/font`, Google Fonts `<link>`, or other per-framework font loader required. All three fonts are SIL Open Font License 1.1; license text ships alongside the font files in `dist/fonts/{inter,merriweather,jetbrains-mono}/OFL.txt`.

## 0.2.0

### Minor Changes

- f93f57c: Add the components apps/auth needs for component parity: `Card`/`CardContent`, `FieldGroup`, `Collapsible`/`CollapsibleTrigger`/`CollapsibleContent`, `Notification`, `AppLayout`, and `Link`. `@sdwa/tokens` adds `--warning`/`--success`/`--info` (and `-foreground`) tokens for status/notification UI.
  
  Fixes:
  - `@sdwa/components` and `@sdwa/tokens` are now correctly marked `"use client"` — both use React hooks/context internally via `react-aria-components`, and previously had no directive, which broke any Next.js Server Component that imported from them.
  - `Collapsible`'s trigger no longer underlines its label on hover.
  - `Notification`'s `warning`/`success`/`info` variants use the new dedicated tokens instead of `--accent`/`--primary`/`--secondary`. Those tokens shift hue and chroma per-theme for unrelated button/surface purposes — `--accent` has zero chroma in dark mode, which made `warning` render as plain grey there.

## 0.1.1

### Patch Changes

- 318c4b1: Verify the automated release pipeline (changesets version PR, gated npm publish via trusted
  publishing/OIDC) for this package specifically. No functional change.
