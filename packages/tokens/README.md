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

## Visible scrollbar: `scrollbar-visible`

`theme.css` adds a Tailwind utility, `scrollbar-visible`. Put it on a scroll container
to keep its scrollbar on screen. Without it, many systems show an overlay scrollbar that
hides until you scroll, so people may not realise the box scrolls.

```tsx
<ul className="max-h-96 overflow-y-auto scrollbar-visible">…</ul>
```

- It's opt-in, one element at a time. Put it on the scroll container itself (the element
  with `overflow-*-auto`), not on a parent. Variants work: `md:scrollbar-visible`.
- It covers both axes, so a sideways `overflow-x-auto` strip gets a permanent bar too.
- The thumb is `--muted-foreground` on a `--muted` track: a 16 px scrollbar with a 10 px
  rounded thumb, which darkens to `--foreground` on hover. The thumb's contrast against
  the track is 5.34:1 in light and 7.67:1 in dark.

What each browser does with it:

| Browser | Result |
|---|---|
| Chrome, Edge | A permanent 16 px themed scrollbar, also when the system uses overlay scrollbars. |
| Safari on macOS | The same `::-webkit-scrollbar` styles as Chrome. Giving `::-webkit-scrollbar` an explicit size is the usual way to get a permanent scrollbar instead of an overlay one in WebKit. Not yet checked on a Mac. |
| Firefox | Colours the scrollbar. Whether it stays on screen depends on the user's system and Firefox scrollbar settings: CSS can't turn Firefox's overlay scrollbars off. |
| **Safari on iPhone and iPad** | **No effect.** iOS Safari ignores custom scrollbar styling, so this can't force a scrollbar there. |

On iOS, a WebKit engineer said in 2019 that there are
[no plans to bring custom scrollbar styling](https://bugs.webkit.org/show_bug.cgi?id=198858)
to overflow scrolling. As far as we know that hasn't changed. iOS Safari also
[reports support for `::-webkit-scrollbar` that it doesn't have](https://bugs.webkit.org/show_bug.cgi?id=246371),
so a feature check can't tell.

**So keep a cue that doesn't rely on the scrollbar**, such as a "Scroll to see all 24
photos" line by the box, or a max height that cuts a row in half so the next row peeks
out.

How it works: each engine gets one mechanism. Chromium 121+ ignores `::-webkit-scrollbar`
on any element whose `scrollbar-width` or `scrollbar-color` isn't `auto`, so the standard
properties are inside `@supports not selector(::-webkit-scrollbar)`, which only Firefox
matches. For Chromium and Safari the utility sets both back to `auto`, because
`scrollbar-color` inherits and an ancestor's value would otherwise switch the styling off.
Don't set `scrollbar-width` or `scrollbar-color` on the same element yourself.

Part of the [SDFWA Design System](https://github.com/San-Diego-Fine-Woodworkers-Association/Design-System).
