import {
  TextArea as RACTextArea,
  type TextAreaProps as RACTextAreaProps,
} from "react-aria-components";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps.js";

export interface TextAreaProps extends RACTextAreaProps {}

const base =
  "min-h-24 resize-y rounded-md border border-input bg-background px-3 py-2 text-sm outline-none " +
  "data-[focused]:ring-2 data-[focused]:ring-ring " +
  "data-[invalid]:border-destructive " +
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

/**
 * Thin wrapper over react-aria-components' TextArea: the multi-line
 * counterpart to Input, styled the same way. Compose it inside TextField
 * with Label, Description and FieldError exactly as you would Input.
 */
export function TextArea(props: TextAreaProps) {
  return (
    <RACTextArea
      {...props}
      className={composeTailwindRenderProps(props.className, base)}
    />
  );
}
