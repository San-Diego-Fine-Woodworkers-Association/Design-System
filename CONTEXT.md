# SDFWA Design System

The component library and design tokens Digital-Services apps consume for UI.

## Language

**@sdwa/components**:
This repo's React component library, built on react-aria-components (headless
accessibility primitives) and Tailwind CSS. The destination apps migrate to.
_Avoid_: "the design system" alone (ambiguous with `@sdfwa/ui`), "the component library"

**@sdfwa/ui**:
A separate, existing shadcn/Radix-based component library that lives in the
Digital-Services monorepo (`Digital-Services/packages/ui`). Apps currently
consume it. It is not an older version of `@sdwa/components`: the two are
distinct libraries with different primitives, and migration means replacing
one with the other, not upgrading in place.
_Avoid_: "the old design system", "the current UI package" (both imply lineage that doesn't exist)

**Parity** (component parity):
A `@sdwa/components` component matches its `@sdfwa/ui` counterpart in
function, interactive behavior, and accessibility (keyboard navigation, ARIA,
focus management). It does **not** mean pixel-exact visual matching: new
design tokens intentionally change appearance. Automated test coverage is
decided per component, not required by the definition of parity.
_Avoid_: "1:1 match", "pixel parity"

**AppLayout**:
A deliberately minimal `@sdwa/components` component that supplies background
styling and injects the token/theme provider. It replaces what an app
previously got from `@sdfwa/ui/globals.css`. It does not include app-specific
layout composition (for example, centering a login form) — that stays local
to the consuming app.
_Avoid_: "page shell", "root layout" (both used loosely elsewhere for app-local code)
