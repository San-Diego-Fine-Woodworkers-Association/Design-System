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
wins.

```tsx
import { FieldSizeProvider } from "@sdwa/components";

<FieldSizeProvider size="large">
  <App />
</FieldSizeProvider>;
```

`TextField`, `FieldGroup`, `Select` and `CheckboxGroup` pass their size on to the Label, Input,
SelectItems, Checkboxes, Description and FieldError inside them.

See the [Storybook](https://san-diego-fine-woodworkers-association.github.io/Design-System/)
for the full component catalog, all supported variants, and the theme/context matrix.

Part of the [SDFWA Design System](https://github.com/San-Diego-Fine-Woodworkers-Association/Design-System).
