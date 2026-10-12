# @sdwa/components

## 0.4.0

### Minor Changes

- 64be4c2: Form fields take `size="large"`, for audiences who need bigger controls. The default size is unchanged.
  
  - `Input`, `TextArea`, `Select` (trigger), `SelectItem` and `Checkbox` (the whole label, which is the tap target) are at least 48 px tall at `size="large"`, with `text-lg`. `TextArea` is at least 128 px tall. The checkbox box grows from 20 px to 24 px.
  - `Label` is `text-lg`; `Description` and `FieldError` are `text-base`.
  - `TextField`, `FieldGroup`, `Select` and `CheckboxGroup` pass their `size` on to the Label, Input, TextArea, SelectItems, Checkboxes, Description and FieldError inside them.
  - New `FieldSizeProvider`: `<FieldSizeProvider size="large">` around a form or the whole app makes every field below it large without a `size` on each. A component's own `size` still wins, and `size="default"` opts out. `FieldSize` and `useFieldSize` (for app-built fields) are exported too.
  - `Button`, button-look `Link` and `FilePickerButton` with no `size` now follow the nearest `FieldSizeProvider` or sized field. Outside a provider they are unchanged. Inline links are unaffected.
  - **Visible change: a large `Button` (and button-look `Link`, `FilePickerButton`) is 4 px shorter**, 48 px instead of 52 px at a 16 px root (`py-3` becomes `py-2`; `min-h-12` sets the height), so it is exactly as tall as a large Input or Select next to it. Apps already using `size="large"` buttons, such as the Member Media Upload page, will see them get slightly shorter.
  - `InputProps` no longer includes the native `size` attribute (a width in characters); set the width with `className`.

## 0.3.0

### Minor Changes

- 2d6b23e: Add the form components the member media upload needs, each a thin wrapper over `react-aria-components` styled with design tokens:
  
  - `FilePickerButton`: a `Button` that opens the device's file picker (`FileTrigger`), with `acceptedFileTypes`, `allowsMultiple`, `defaultCamera` and `onSelect`.
  - `ProgressBar`: label, value text and track; supports `isIndeterminate`.
  - `Select` and `SelectItem`: a dropdown bundled with label, description and error message like `FieldGroup`, with 44 px options for touch. A hidden native `<select>` carries `name` for form submission.
  - `Checkbox` (shows a visible `*` when `isRequired`) and `CheckboxGroup` (bundled with label, description and error message).
  - `TextArea`: the multi-line counterpart to `Input`, used inside `TextField`.
- 6f76fb5: `@sdwa/components`:
  
  - `Button` and button-styled `Link` take `size="large"`: at least 48 px tall with `text-lg`. The default size is unchanged. `ButtonSize` and `buttonSizeStyles` are exported.
  - `Label` shows a red `*` when its react-aria field is required (`TextField`, `FieldGroup`, `Select`, `CheckboxGroup`, ...). Screen readers don't hear it, because the input is already announced as required. Pass `isRequired` to show it outside a field, or `isRequired={false}` to hide it. **Visible change:** required `FieldGroup`s (for example the auth login form) now show the `*`.
  - `Modal` takes `size="wide"` (max 56rem) for a full-size media viewer.
  - `ModalOverlay`, `Modal` and `Popover` copy the nearest `AppLayout`/`ThemeProvider` theme and context onto the portalled element. Overlays now keep the theme's tokens without `UNSTABLE_portalContainer`.
  
  `@sdwa/tokens` (light theme, WCAG 2.2 AA):
  
  - `--destructive` darkened to `oklch(0.55 0.1936 33.339)`. Red text on the page goes from 3.54:1 to 4.89:1, and white on the red button from 3.87:1 to 5.34:1.
  - `--input` darkened to `oklch(0.63 0 0)`. The form-control border goes from 1.30:1 to 3.20:1 against the page.

### Patch Changes

- Updated dependencies [6f76fb5]
  - @sdwa/tokens@0.3.1

## 0.2.2

### Patch Changes

- e3b22ca: Fix `@sdwa/tokens` dependency published as `workspace:*`, which made 0.2.0 and 0.2.1 impossible to install. The dependency is now `^0.3.0`.

## 0.2.1

### Patch Changes

- Updated dependencies [c1c7c7d]
  - @sdwa/tokens@0.3.0

## 0.2.0

### Minor Changes

- f93f57c: Add the components apps/auth needs for component parity: `Card`/`CardContent`, `FieldGroup`, `Collapsible`/`CollapsibleTrigger`/`CollapsibleContent`, `Notification`, `AppLayout`, and `Link`. `@sdwa/tokens` adds `--warning`/`--success`/`--info` (and `-foreground`) tokens for status/notification UI.
  
  Fixes:
  - `@sdwa/components` and `@sdwa/tokens` are now correctly marked `"use client"` — both use React hooks/context internally via `react-aria-components`, and previously had no directive, which broke any Next.js Server Component that imported from them.
  - `Collapsible`'s trigger no longer underlines its label on hover.
  - `Notification`'s `warning`/`success`/`info` variants use the new dedicated tokens instead of `--accent`/`--primary`/`--secondary`. Those tokens shift hue and chroma per-theme for unrelated button/surface purposes — `--accent` has zero chroma in dark mode, which made `warning` render as plain grey there.

### Patch Changes

- Updated dependencies [f93f57c]
  - @sdwa/tokens@0.2.0

## 0.1.1

### Patch Changes

- 318c4b1: Verify the automated release pipeline (changesets version PR, gated npm publish via trusted
  publishing/OIDC) for this package specifically. No functional change.
