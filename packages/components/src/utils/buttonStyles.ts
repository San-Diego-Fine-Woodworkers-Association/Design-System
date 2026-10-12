export type ButtonVariant = "primary" | "secondary" | "destructive" | "quiet";

export type ButtonSize = "default" | "large";

export const buttonBase =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium " +
  "transition-colors data-[hovered]:opacity-90 data-[pressed]:opacity-80 " +
  "data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring " +
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

export const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  quiet: "bg-transparent text-foreground data-[hovered]:bg-accent",
};

/**
 * Size overrides applied after buttonBase (tailwind-merge resolves the
 * padding/font-size conflicts). `default` adds nothing, so buttonBase alone
 * is still the default size. `large` is exactly 48 px tall (a WCAG 2.5.5
 * sized touch target, `min-h-12` with padding that never exceeds it), the
 * same height as a large Input, Select trigger and SelectItem, with larger
 * text, for audiences who need bigger controls.
 */
export const buttonSizeStyles: Record<ButtonSize, string> = {
  default: "",
  large: "min-h-12 px-6 py-2 text-lg",
};
