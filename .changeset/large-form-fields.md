---
"@sdwa/components": minor
---

Form fields take `size="large"`, for audiences who need bigger controls. The default size is unchanged.

- `Input`, `TextArea`, `Select` (trigger), `SelectItem` and `Checkbox` (the whole label, which is the tap target) are at least 48 px tall at `size="large"`, with `text-lg`. `TextArea` is at least 128 px tall. The checkbox box grows from 20 px to 24 px.
- `Label` is `text-lg`; `Description` and `FieldError` are `text-base`.
- `TextField`, `FieldGroup`, `Select` and `CheckboxGroup` pass their `size` on to the Label, Input, TextArea, SelectItems, Checkboxes, Description and FieldError inside them.
- New `FieldSizeProvider`: `<FieldSizeProvider size="large">` around a form or the whole app makes every field below it large without a `size` on each. A field's own `size` still wins. `FieldSize` and `useFieldSize` (for app-built fields) are exported too.
- `InputProps` no longer includes the native `size` attribute (a width in characters); set the width with `className`.
