import {
  FieldError as RACFieldError,
  type FieldErrorProps as RACFieldErrorProps,
} from "react-aria-components";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps.js";
import { type FieldSize, useFieldSize } from "../utils/fieldSize.js";

export interface FieldErrorProps extends RACFieldErrorProps {
  /**
   * `default` (`text-xs`) or `large` (`text-base`). Unset, it follows the
   * nearest FieldSizeProvider or sized field (e.g. `<TextField
   * size="large">`).
   */
  size?: FieldSize;
}

const base = "text-xs text-destructive";

/** Size overrides applied after base, like Input's. */
const sizeStyles: Record<FieldSize, string> = {
  default: "",
  large: "text-base",
};

/** Thin wrapper over react-aria-components' FieldError (SDF-17). */
export function FieldError({ size, ...props }: FieldErrorProps) {
  const resolvedSize = useFieldSize(size);
  return (
    <RACFieldError
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        `${base} ${sizeStyles[resolvedSize]}`,
      )}
    />
  );
}
