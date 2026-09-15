import type { ReactNode } from "react";
import type { TextFieldProps as RACTextFieldProps } from "react-aria-components";
import { FieldError, type FieldErrorProps } from "../Atoms/FieldError.js";
import { Input, type InputProps } from "../Atoms/Input.js";
import { Label } from "../Atoms/Label.js";
import { TextField } from "./TextField.js";

export interface FieldGroupProps extends Omit<RACTextFieldProps, "children"> {
  /** Field label content, rendered via Label. */
  label: ReactNode;
  /**
   * Error content rendered via FieldError. Accepts a static node or, like
   * RAC's own FieldError, a function of the current validation errors.
   */
  errorMessage?: FieldErrorProps["children"];
  /**
   * Props forwarded to the default Input. Ignored when `children` is
   * provided.
   */
  inputProps?: InputProps;
  /**
   * Overrides the default Input with custom field content (e.g. a Select
   * or a composed group of inputs). When omitted, a plain Input is
   * rendered with `inputProps`.
   */
  children?: ReactNode;
}

/**
 * Convenience molecule (SDF-40) that bundles the existing Label, Input, and
 * FieldError atoms behind one component. This is the opposite design
 * choice from TextField, which deliberately stays unbundled (see
 * TextField.tsx) — apps were composing the separate atoms by hand often
 * enough (e.g. apps/auth's login/signup forms) to warrant a bundling
 * wrapper. Internally this still renders TextField, so anything TextField
 * supports (name, isRequired, isInvalid, validate, ...) is supported here.
 */
export function FieldGroup({
  label,
  errorMessage,
  inputProps,
  children,
  ...textFieldProps
}: FieldGroupProps) {
  return (
    <TextField {...textFieldProps}>
      <Label>{label}</Label>
      {children ?? <Input {...inputProps} />}
      <FieldError>{errorMessage}</FieldError>
    </TextField>
  );
}
