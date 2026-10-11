---
"@sdwa/components": minor
---

Add the form components the member media upload needs, each a thin wrapper over `react-aria-components` styled with design tokens:

- `FilePickerButton`: a `Button` that opens the device's file picker (`FileTrigger`), with `acceptedFileTypes`, `allowsMultiple`, `defaultCamera` and `onSelect`.
- `ProgressBar`: label, value text and track; supports `isIndeterminate`.
- `Select` and `SelectItem`: a dropdown bundled with label, description and error message like `FieldGroup`, with 44 px options for touch. A hidden native `<select>` carries `name` for form submission.
- `Checkbox` (shows a visible `*` when `isRequired`) and `CheckboxGroup` (bundled with label, description and error message).
- `TextArea`: the multi-line counterpart to `Input`, used inside `TextField`.
