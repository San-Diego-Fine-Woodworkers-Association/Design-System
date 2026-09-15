import { type ThemeMode, ThemeProvider } from "@sdwa/tokens";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface AppLayoutProps {
  /**
   * The active theme. Required rather than defaulted: the consuming app
   * owns theme selection (e.g. from a user preference or system setting),
   * and silently defaulting here would hide that decision.
   */
  theme: ThemeMode;
  className?: string;
  children?: ReactNode;
}

const base = "min-h-screen bg-background text-foreground";

/**
 * App-shell background and token injection for a whole application (SDF-42).
 *
 * Deliberately minimal: it wraps `children` in `@sdwa/tokens`'s
 * `ThemeProvider` with `context="app"` fixed (that's what makes this
 * *AppLayout* specifically, as opposed to a future `ContentLayout` using
 * `context="content"` — the tokens package's `data-context` split already
 * anticipates that boundary, see `theme.css`), and applies the base
 * `min-h-screen bg-background text-foreground` styling consumers otherwise
 * pulled in via a global stylesheet.
 *
 * It does not compose app-specific layout (centering, nav chrome, sidebars).
 * That stays local to the consuming app / a future `ContentLayout` — see
 * the "SDFWA Design System: Component Parity" project's Out of scope notes.
 *
 * `ThemeProvider` wraps a plain `<div>` (no react-aria-components render
 * props), so `className` is merged with `tailwind-merge` directly — same
 * situation as `Form`/`Dialog` — rather than via
 * `composeTailwindRenderProps`.
 */
export function AppLayout({ theme, className, children }: AppLayoutProps) {
  return (
    <ThemeProvider
      theme={theme}
      context="app"
      className={twMerge(base, className)}
    >
      {children}
    </ThemeProvider>
  );
}
