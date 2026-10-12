import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from "react-aria-components";
import {
  type ButtonSize,
  type ButtonVariant,
  buttonBase,
  buttonSizeStyles,
  buttonVariantStyles,
} from "../utils/buttonStyles.js";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps.js";
import { useFieldSize } from "../utils/fieldSize.js";

export type { ButtonSize, ButtonVariant };

export interface ButtonProps extends RACButtonProps {
  variant?: ButtonVariant;
  /**
   * `default` (the original `text-sm px-4 py-2`) or `large` (48 px tall,
   * `text-lg`, matching the large form fields). Unset, it follows the
   * nearest FieldSizeProvider or sized field, so a large form's buttons
   * match its fields; outside one it is `default`.
   */
  size?: ButtonSize;
}

/**
 * Thin wrapper over react-aria-components' Button: default styling per
 * variant and size, with the className/style override slots RACButton
 * already exposes (SDF-13). No hook-level reimplementation (SDF-17).
 */
export function Button({ variant = "primary", size, ...props }: ButtonProps) {
  const resolvedSize = useFieldSize(size);
  return (
    <RACButton
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        `${buttonBase} ${buttonVariantStyles[variant]} ${buttonSizeStyles[resolvedSize]}`,
      )}
    />
  );
}
