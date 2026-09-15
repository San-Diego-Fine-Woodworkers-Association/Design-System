---
"@sdwa/components": minor
"@sdwa/tokens": minor
---

Add the components apps/auth needs for component parity: `Card`/`CardContent`, `FieldGroup`, `Collapsible`/`CollapsibleTrigger`/`CollapsibleContent`, `Notification`, `AppLayout`, and `Link`. `@sdwa/tokens` adds `--warning`/`--success`/`--info` (and `-foreground`) tokens for status/notification UI.

Fixes:
- `@sdwa/components` and `@sdwa/tokens` are now correctly marked `"use client"` — both use React hooks/context internally via `react-aria-components`, and previously had no directive, which broke any Next.js Server Component that imported from them.
- `Collapsible`'s trigger no longer underlines its label on hover.
- `Notification`'s `warning`/`success`/`info` variants use the new dedicated tokens instead of `--accent`/`--primary`/`--secondary`. Those tokens shift hue and chroma per-theme for unrelated button/surface purposes — `--accent` has zero chroma in dark mode, which made `warning` render as plain grey there.
