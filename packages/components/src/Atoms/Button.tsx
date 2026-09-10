import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from "react-aria-components";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps.js";

export type ButtonVariant = "primary" | "secondary" | "destructive" | "quiet";

export interface ButtonProps extends RACButtonProps {
  variant?: ButtonVariant;
}

const base =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium " +
  "transition-colors data-[hovered]:opacity-90 data-[pressed]:opacity-80 " +
  "data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring " +
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  quiet: "bg-transparent text-foreground data-[hovered]:bg-accent",
};

/**
 * Thin wrapper over react-aria-components' Button: default styling per
 * variant, with the className/style override slots RACButton already
 * exposes (SDF-13). No hook-level reimplementation (SDF-17).
 */
export function Button({ variant = "primary", ...props }: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        `${base} ${variantStyles[variant]}`,
      )}
    />
  );
}
