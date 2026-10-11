---
"@sdwa/components": minor
"@sdwa/tokens": patch
---

`@sdwa/components`:

- `Button` and button-styled `Link` take `size="large"`: at least 48 px tall with `text-lg`. The default size is unchanged. `ButtonSize` and `buttonSizeStyles` are exported.
- `Label` shows a red `*` when its react-aria field is required (`TextField`, `FieldGroup`, `Select`, `CheckboxGroup`, ...). Screen readers don't hear it, because the input is already announced as required. Pass `isRequired` to show it outside a field, or `isRequired={false}` to hide it. **Visible change:** required `FieldGroup`s (for example the auth login form) now show the `*`.
- `Modal` takes `size="wide"` (max 56rem) for a full-size media viewer.
- `ModalOverlay`, `Modal` and `Popover` copy the nearest `AppLayout`/`ThemeProvider` theme and context onto the portalled element. Overlays now keep the theme's tokens without `UNSTABLE_portalContainer`.

`@sdwa/tokens` (light theme, WCAG 2.2 AA):

- `--destructive` darkened to `oklch(0.55 0.1936 33.339)`. Red text on the page goes from 3.54:1 to 4.89:1, and white on the red button from 3.87:1 to 5.34:1.
- `--input` darkened to `oklch(0.63 0 0)`. The form-control border goes from 1.30:1 to 3.20:1 against the page.
