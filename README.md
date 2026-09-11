# SDFWA Design System

The shared design system for SDFWA's frontend projects: components, tokens, linting rules,
and domain assets used across the org's apps and metaframeworks.

> **Status:** early scaffolding. Structure below is the intended shape and will be fleshed out
> via a future wayfinding pass — packages, APIs, and conventions are not final.

## Packages

- **[`@sdwa/components`](./packages/components)** — React Aria-based UI components, organized as
  Atomic Design tiers. Browse the full catalog in the
  [Storybook](https://san-diego-fine-woodworkers-association.github.io/Design-System/).
- **[`@sdwa/tokens`](./packages/tokens)** — design tokens (theme CSS custom properties, `data-theme`/
  `data-context` composition) consumed by the component package and available standalone.
- **[`@sdwa/lint-config`](./packages/lint-config)** — shared Biome preset for frontend projects and
  metaframeworks, so consuming repos don't hand-roll their own.
- **Domain assets** — brand assets (logo, etc.) used across SDFWA products. Not yet added.

Packages publish to npm under the `@sdwa` scope (`npm install @sdwa/<package>`) once the
[npm Publishing Pipeline](https://linear.app/sdfwa-web-infra/project/sdfwa-design-system-npm-publishing-pipeline-e21f8a3632ac)
map's first real release lands — see [`PUBLISHING.md`](./PUBLISHING.md) for the release process
and [`CONTRIBUTING.md`](./CONTRIBUTING.md) for how to contribute a change.

## Structure

This will likely land as a monorepo with one package per concern, roughly:

```
/
├── packages/
│   ├── components/   # React Aria-based component library
│   ├── tokens/        # design tokens
│   └── lint-config/   # shared lint/format rules
├── assets/            # domain assets (logo, etc.)
└── docs/
    ├── agents/        # agent-skill config (issue tracker, domain docs)
    └── adr/            # architecture decision records
```

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).
