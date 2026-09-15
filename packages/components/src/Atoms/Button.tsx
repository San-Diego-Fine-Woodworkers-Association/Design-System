import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from "react-aria-components";
import {
  type ButtonVariant,
  buttonBase,
  buttonVariantStyles,
} from "../utils/buttonStyles.js";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps.js";

export type { ButtonVariant };

export interface ButtonProps extends RACButtonProps {
  variant?: ButtonVariant;
}

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
        `${buttonBase} ${buttonVariantStyles[variant]}`,
      )}
    />
  );
}
