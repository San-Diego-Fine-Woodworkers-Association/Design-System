# @sdwa/tokens

Design tokens (theme CSS custom properties) for SDFWA's frontend projects, and a thin
`ThemeProvider`/`useTheme()` React helper for setting them.

## Install

```sh
npm install @sdwa/tokens
```

## Usage

```css
@import "@sdwa/tokens/theme.css";
```

```tsx
import { ThemeProvider } from "@sdwa/tokens";

<ThemeProvider theme="light" context="app">
  <App />
</ThemeProvider>;
```

`theme` is `"light" | "dark"`; `context` is `"app" | "content"` (denser spacing/radius for
in-application chrome vs. looser values for long-form content). Both are applied as
`data-theme`/`data-context` attributes, which `theme.css` keys its custom properties off of.

## Fonts

`theme.css` self-hosts Inter, Merriweather, and JetBrains Mono (Latin subset,
`@font-face` with `font-display: swap`) and declares them as the `--font-sans`,
`--font-serif`, and `--font-mono` values. Importing `@sdwa/tokens/theme.css` is
enough: no `next/font`, Google Fonts `<link>`, or other per-framework font loader
is required.

- **Inter** (`--font-sans` / Tailwind `font-sans`) is the default typeface, used for
  body text, UI chrome, and most components.
- **Merriweather** (`--font-serif` / Tailwind `font-serif`) is the accent typeface,
  reserved for the wordmark and long-form content headers (for example, blog posts).
- **JetBrains Mono** (`--font-mono` / Tailwind `font-mono`) is the code/monospace
  typeface, used for code blocks and tabular or fixed-width values.

All three fonts ship under the [SIL Open Font License 1.1](https://openfontlicense.org),
not this package's MIT license. The license text and copyright notices are in
`dist/fonts/{inter,merriweather,jetbrains-mono}/OFL.txt`; keep them alongside the
font files in any redistribution.

Part of the [SDFWA Design System](https://github.com/San-Diego-Fine-Woodworkers-Association/Design-System).
