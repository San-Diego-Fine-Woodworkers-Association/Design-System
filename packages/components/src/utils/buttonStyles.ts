export type ButtonVariant = "primary" | "secondary" | "destructive" | "quiet";

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
