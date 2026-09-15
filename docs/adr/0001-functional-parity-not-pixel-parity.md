# Component parity means functional match, not pixel match

`@sdwa/components` replaces `@sdfwa/ui` app by app, starting with `auth`. The
components could have targeted pixel-exact visual matching with their
`@sdfwa/ui` counterparts, to minimize the perceived change during migration.
Instead, parity is defined as functional, behavioral, and accessibility
matching only: `@sdwa/components` carries its own design tokens and styling
decisions, and visual appearance is expected to change. A future engineer
seeing a visually different component after migration should treat that as
intended, not a regression.
