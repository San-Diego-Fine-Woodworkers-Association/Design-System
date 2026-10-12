---
"@sdwa/components": minor
---

Form fields take `size="large"`, for audiences who need bigger controls. The default size is unchanged.

- `Input`, `TextArea`, `Select` (trigger), `SelectItem` and `Checkbox` (the whole label, which is the tap target) are at least 48 px tall at `size="large"`, with `text-lg`. `TextArea` is at least 128 px tall. The checkbox box grows from 20 px to 24 px.
- `Label` is `text-lg`; `Description` and `FieldError` are `text-base`.
- `TextField`, `FieldGroup`, `Select` and `CheckboxGroup` pass their `size` on to the Label, Input, TextArea, SelectItems, Checkboxes, Description and FieldError inside them.
- New `FieldSizeProvider`: `<FieldSizeProvider size="large">` around a form or the whole app makes every field below it large without a `size` on each. A component's own `size` still wins, and `size="default"` opts out. `FieldSize` and `useFieldSize` (for app-built fields) are exported too.
- `Button`, button-look `Link` and `FilePickerButton` with no `size` now follow the nearest `FieldSizeProvider` or sized field. Outside a provider they are unchanged. Inline links are unaffected.
- **Visible change: a large `Button` (and button-look `Link`, `FilePickerButton`) is 4 px shorter**, 48 px instead of 52 px at a 16 px root (`py-3` becomes `py-2`; `min-h-12` sets the height), so it is exactly as tall as a large Input or Select next to it. Apps already using `size="large"` buttons, such as the Member Media Upload page, will see them get slightly shorter.
- `InputProps` no longer includes the native `size` attribute (a width in characters); set the width with `className`.
