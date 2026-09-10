import {
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps,
} from "react-aria-components";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps.js";

export interface TextFieldProps extends RACTextFieldProps {}

/**
 * Thin wrapper over react-aria-components' TextField (SDF-17): just the
 * layout container. Label, Input, Description, FieldError are separate
 * composable parts (not TextField-internal, per the research) — see
 * Label.tsx, Input.tsx, Description.tsx, FieldError.tsx.
 */
export function TextField(props: TextFieldProps) {
  return (
    <RACTextField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex flex-col gap-1",
      )}
    />
  );
}
