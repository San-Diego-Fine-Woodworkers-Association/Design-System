import { composeRenderProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";

/**
 * Merges the design system's default Tailwind classes with a caller-supplied
 * `className` (string or render-prop function), using tailwind-merge to
 * resolve conflicting utilities by CSS property instead of source order.
 */
export function composeTailwindRenderProps<T>(
  className: string | ((renderProps: T) => string) | undefined,
  tw: string,
): string | ((renderProps: T) => string) {
  return composeRenderProps(className, (resolvedClassName) =>
    twMerge(tw, resolvedClassName),
  );
}
