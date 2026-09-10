# SDFWA Design System

The shared design system for SDFWA's frontend projects: components, tokens, linting rules,
and domain assets used across the org's apps and metaframeworks.

> **Status:** early scaffolding. Structure below is the intended shape and will be fleshed out
> via a future wayfinding pass — packages, APIs, and conventions are not final.

## What's in here

- **Components** — React Aria-based UI components.
- **Tokens** — design tokens (color, spacing, typography, etc.) consumed by the component
  package and available standalone for teams that need raw values.
- **Lint/format config** — shared ESLint/Prettier (or equivalent) rules for frontend projects
  and metaframeworks, so consuming repos don't hand-roll their own.
- **Domain assets** — brand assets (logo, etc.) used across SDFWA products.

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

Issues and epics are tracked in Linear (SDFWA Web Infra team, key `SDF`). See
[`docs/agents/issue-tracker.md`](./docs/agents/issue-tracker.md) for conventions.
