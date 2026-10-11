import { type ThemeContext, type ThemeMode, useTheme } from "@sdwa/tokens";

export interface ThemeAttributes {
  "data-theme"?: ThemeMode;
  "data-context"?: ThemeContext;
}

/**
 * The nearest ThemeProvider's (or AppLayout's) theme and context as
 * `data-theme`/`data-context` attributes, or none outside a provider.
 *
 * Overlays (ModalOverlay, Modal, Popover) portal to `document.body`, outside
 * the themed `<div>`, so the token cascade doesn't reach them. Putting these
 * attributes on the portalled element re-applies the same tokens there.
 *
 * `useTheme` throws outside a provider. It is still called exactly once on
 * every render (only its throw is caught), so hook order never changes.
 */
export function useThemeAttributes(): ThemeAttributes {
  try {
    // biome-ignore lint/correctness/useHookAtTopLevel: called unconditionally; only useTheme's "no provider" throw is caught.
    const { theme, context } = useTheme();
    return { "data-theme": theme, "data-context": context };
  } catch {
    return {};
  }
}
