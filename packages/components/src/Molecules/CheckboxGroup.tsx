import type { ReactNode } from "react";
import {
  CheckboxGroup as RACCheckboxGroup,
  type CheckboxGroupProps as RACCheckboxGroupProps,
} from "react-aria-components";
import { Description } from "../Atoms/Description.js";
import { FieldError, type FieldErrorProps } from "../Atoms/FieldError.js";
import { Label } from "../Atoms/Label.js";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps.js";

export interface CheckboxGroupProps
  extends Omit<RACCheckboxGroupProps, "children"> {
  /** Group label, rendered via Label and used as the group's accessible name. */
  label?: ReactNode;
  /** Help text under the options, rendered via Description. */
  description?: ReactNode;
  /** Error content rendered via FieldError, like FieldGroup's. */
  errorMessage?: FieldErrorProps["children"];
  /** The Checkbox options. */
  children?: ReactNode;
}

const base = "flex flex-col gap-2";

/**
 * Thin wrapper over react-aria-components' CheckboxGroup, bundled with
 * Label, Description and FieldError like FieldGroup: a `role="group"`
 * labelled by `label`, holding Checkbox children whose `value`s make up the
 * group's value. `isRequired` means at least one option must be chosen.
 */
export function CheckboxGroup({
  label,
  description,
  errorMessage,
  children,
  ...props
}: CheckboxGroupProps) {
  return (
    <RACCheckboxGroup
      {...props}
      className={composeTailwindRenderProps(props.className, base)}
    >
      {label && <Label>{label}</Label>}
      <div className="flex flex-col gap-3">{children}</div>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </RACCheckboxGroup>
  );
}
