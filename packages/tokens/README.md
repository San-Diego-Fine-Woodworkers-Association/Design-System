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

Part of the [SDFWA Design System](https://github.com/San-Diego-Fine-Woodworkers-Association/Design-System).
