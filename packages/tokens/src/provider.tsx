import {
  createContext,
  useContext,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

export type ThemeMode = "light" | "dark";
export type ThemeContext = "app" | "content";

export interface ThemeState {
  theme: ThemeMode;
  context: ThemeContext;
}

const ThemeStateContext = createContext<ThemeState | null>(null);

export interface ThemeProviderProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  theme: ThemeMode;
  context: ThemeContext;
  children?: ReactNode;
}

/**
 * Typed sugar over the `data-theme`/`data-context` attributes (SDF-12).
 * The attributes alone are sufficient for pure-CSS consumers; this wrapper
 * is only for components-package consumers that want the values back via
 * `useTheme`.
 */
export function ThemeProvider({
  theme,
  context,
  children,
  ...rest
}: ThemeProviderProps) {
  return (
    <ThemeStateContext.Provider value={{ theme, context }}>
      <div data-theme={theme} data-context={context} {...rest}>
        {children}
      </div>
    </ThemeStateContext.Provider>
  );
}

export function useTheme(): ThemeState {
  const value = useContext(ThemeStateContext);
  if (!value) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return value;
}
