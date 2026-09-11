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

See the [Storybook](https://san-diego-fine-woodworkers-association.github.io/Design-System/)
for the full component catalog, all supported variants, and the theme/context matrix.

Part of the [SDFWA Design System](https://github.com/San-Diego-Fine-Woodworkers-Association/Design-System).
