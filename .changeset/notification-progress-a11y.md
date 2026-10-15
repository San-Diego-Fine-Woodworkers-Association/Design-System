---
"@sdwa/components": minor
---

Notification and ProgressBar accessibility for older readers and screen readers.

- **Notification body text is full strength.** The body was the muted grey (`text-muted-foreground`), 4.27:1 on the info tint; it is now `text-foreground` (11.8:1 and up). Visible change: body text is darker in every Notification.
- **Notification always shows its icon.** Without a title, the variant's icon is now drawn at the start of the body (with a dismiss button, on the same row), so status is an icon and words, not a tint alone. Titled notifications look as before.
- **New `NotificationRegion`.** A live region (`role="status"`, or `role="alert"` with `politeness="assertive"`) that is mounted with the page, empty, so a Notification rendered inside it later is announced: screen readers often miss a live region that arrives with its message already inside. A Notification inside a region leaves `role`/`aria-live` to it. A Notification on its own keeps its own live region, as before.
- **Notification and ProgressBar take `size`** (`"default" | "large"`) and follow `FieldSizeProvider`, like the form fields. A large Notification has `text-lg` text, a larger icon and a 48 px dismiss button; a large ProgressBar has a `text-lg` label and percent. Outside a provider, both are the size they were.
