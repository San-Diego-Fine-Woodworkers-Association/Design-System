import {
  TextArea as RACTextArea,
  type TextAreaProps as RACTextAreaProps,
} from "react-aria-components";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps.js";
import { type FieldSize, useFieldSize } from "../utils/fieldSize.js";

export interface TextAreaProps extends RACTextAreaProps {
  /**
   * `default` (the original `text-sm`, at least 96 px tall) or `large`
   * (at least 128 px tall, `text-lg`). Unset, it follows the nearest
   * FieldSizeProvider or sized field (e.g. `<TextField size="large">`).
   */
  size?: FieldSize;
}

const base =
  "min-h-24 resize-y rounded-md border border-input bg-background px-3 py-2 text-sm outline-none " +
  "data-[focused]:ring-2 data-[focused]:ring-ring " +
  "data-[invalid]:border-destructive " +
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

/** Size overrides applied after base, like Input's. */
const sizeStyles: Record<FieldSize, string> = {
  default: "",
  large: "min-h-32 px-4 py-2 text-lg",
};

/**
 * Thin wrapper over react-aria-components' TextArea: the multi-line
 * counterpart to Input, styled the same way. Compose it inside TextField
 * with Label, Description and FieldError exactly as you would Input.
 */
export function TextArea({ size, ...props }: TextAreaProps) {
  const resolvedSize = useFieldSize(size);
  return (
    <RACTextArea
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        `${base} ${sizeStyles[resolvedSize]}`,
      )}
    />
  );
}
