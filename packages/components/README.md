# @sdwa/components

React Aria-based UI components for SDFWA's frontend projects, organized as Atomic Design
tiers: `Atoms/`, `Molecules/`, `Organisms/`. Thin wrappers over
[`react-aria-components`](https://react-spectrum.adobe.com/react-aria/components.html), styled
with Tailwind CSS and [`@sdwa/tokens`](https://www.npmjs.com/package/@sdwa/tokens).

## Install

```sh
npm install @sdwa/components @sdwa/tokens
```

## Usage

```tsx
import { Button } from "@sdwa/components";

<Button variant="primary">Save</Button>;
```

### Large form fields

Every form field takes `size="large"`: controls and options at least 48 px tall (a WCAG 2.5.5
touch target) with `text-lg`, labels `text-lg`, descriptions and errors `text-base`. To make every
field in a form or app large, wrap it once in `FieldSizeProvider`; a field's own `size` still
wins. Buttons, button-look Links and FilePickerButtons with no `size` follow the provider too, and
a large Button is the same 48 px as a large Input.

```tsx
import { FieldSizeProvider } from "@sdwa/components";

<FieldSizeProvider size="large">
  <App />
</FieldSizeProvider>;
```

`TextField`, `FieldGroup`, `Select` and `CheckboxGroup` pass their size on to the Label, Input,
SelectItems, Checkboxes, Description and FieldError inside them.

`Notification` and `ProgressBar` follow it as well: a large Notification has `text-lg` text, a
larger icon and a 48 px dismiss button; a large ProgressBar has a `text-lg` label and percent.

### Notifications that appear while the page is open

Screen readers announce changes to a live region that is already on the page, and often miss
one that arrives with its message inside. Mount a `NotificationRegion` with the page (empty),
and render the `Notification` inside it when there is something to say:

```tsx
import { Notification, NotificationRegion } from "@sdwa/components";

<NotificationRegion>
  {offline && <Notification variant="info">You're offline. We'll keep trying.</Notification>}
</NotificationRegion>;
```

Use `politeness="assertive"` for errors that must interrupt. A Notification inside a region
leaves the `role`/`aria-live` to it.

See the [Storybook](https://san-diego-fine-woodworkers-association.github.io/Design-System/)
for the full component catalog, all supported variants, and the theme/context matrix.

Part of the [SDFWA Design System](https://github.com/San-Diego-Fine-Woodworkers-Association/Design-System).
