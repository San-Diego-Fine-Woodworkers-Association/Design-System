import {
  Input as RACInput,
  type InputProps as RACInputProps,
} from "react-aria-components";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps.js";
import { type FieldSize, useFieldSize } from "../utils/fieldSize.js";

/**
 * Omits the native `size` attribute (a width in characters), which nothing
 * here uses; set the width with `className` instead.
 */
export interface InputProps extends Omit<RACInputProps, "size"> {
  /**
   * `default` (the original `text-sm`, about 38 px tall) or `large` (at
   * least 48 px tall, `text-lg`). Unset, it follows the nearest
   * FieldSizeProvider or sized field (e.g. `<TextField size="large">`).
   */
  size?: FieldSize;
}

const base =
  "rounded-md border border-input bg-background px-3 py-2 text-sm outline-none " +
  "data-[focused]:ring-2 data-[focused]:ring-ring " +
  "data-[invalid]:border-destructive " +
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

/**
 * Size overrides applied after base, like buttonSizeStyles: `default` adds
 * nothing, so base alone is still the default size.
 */
const sizeStyles: Record<FieldSize, string> = {
  default: "",
  large: "min-h-12 px-4 py-2 text-lg",
};

/** Thin wrapper over react-aria-components' Input (SDF-17). */
export function Input({ size, ...props }: InputProps) {
  const resolvedSize = useFieldSize(size);
  return (
    <RACInput
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        `${base} ${sizeStyles[resolvedSize]}`,
      )}
    />
  );
}
