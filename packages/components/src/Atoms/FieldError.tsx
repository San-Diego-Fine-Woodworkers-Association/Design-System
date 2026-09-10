import {
  FieldError as RACFieldError,
  type FieldErrorProps as RACFieldErrorProps,
} from "react-aria-components";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps.js";

export interface FieldErrorProps extends RACFieldErrorProps {}

/** Thin wrapper over react-aria-components' FieldError (SDF-17). */
export function FieldError(props: FieldErrorProps) {
  return (
    <RACFieldError
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "text-xs text-destructive",
      )}
    />
  );
}
