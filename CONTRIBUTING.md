# Contributing

## Issue tracking

Work is tracked in Linear (SDFWA Web Infra team, key `SDF`). See
[`docs/agents/issue-tracker.md`](./docs/agents/issue-tracker.md) for conventions, including how
this repo runs `/wayfinder` planning maps.

## Adding a changeset

If your change affects the published behavior of `@sdwa/tokens`, `@sdwa/components`, or
`@sdwa/lint-config` (anything a consumer of that package would notice — not internal-only repo
tooling), add a changeset alongside your PR:

```sh
bunx changeset add
```

This prompts you to:

1. Pick which package(s) your change affects.
2. Pick a bump type per package — `patch` (bug fix, no API change), `minor` (new, backward-compatible
   capability), or `major` (breaking change).
3. Write a short description of the change, in terms a consumer would understand — this text
   becomes the package's `CHANGELOG.md` entry.

This writes a small markdown file under `.changeset/`. Commit it with your PR. A PR that doesn't
change any published package's behavior (docs, CI config, internal refactors with no external
effect) doesn't need one.

See [`PUBLISHING.md`](./PUBLISHING.md) for what happens to your changeset after it merges.

## Monorepo

This is a Bun workspace monorepo (`packages/*`). Use `bun install` at the repo root — there is no
separate per-package install step. `bun run lint` (or `lint:ci` for a check-only run) applies the
shared [`@sdwa/lint-config`](./packages/lint-config) Biome preset across the whole repo.
