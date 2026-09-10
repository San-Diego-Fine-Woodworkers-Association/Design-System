import {
  Input as RACInput,
  type InputProps as RACInputProps,
} from "react-aria-components";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps.js";

export interface InputProps extends RACInputProps {}

const base =
  "rounded-md border border-input bg-background px-3 py-2 text-sm outline-none " +
  "data-[focused]:ring-2 data-[focused]:ring-ring " +
  "data-[invalid]:border-destructive " +
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

/** Thin wrapper over react-aria-components' Input (SDF-17). */
export function Input(props: InputProps) {
  return (
    <RACInput
      {...props}
      className={composeTailwindRenderProps(props.className, base)}
    />
  );
}
