import type { ReactNode } from "react";
import {
  CheckboxGroup as RACCheckboxGroup,
  type CheckboxGroupProps as RACCheckboxGroupProps,
} from "react-aria-components";
import { Description } from "../Atoms/Description.js";
import { FieldError, type FieldErrorProps } from "../Atoms/FieldError.js";
import { Label } from "../Atoms/Label.js";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps.js";
import {
  type FieldSize,
  FieldSizeProvider,
  useFieldSize,
} from "../utils/fieldSize.js";

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
  /**
   * `default` or `large` (each Checkbox row at least 48 px tall, with
   * `text-lg` options and label). Applies to the Label, Checkboxes,
   * Description and FieldError inside. Unset, it follows the nearest
   * FieldSizeProvider.
   */
  size?: FieldSize;
}

const base = "flex flex-col gap-2";

/**
 * Gap between the options. Large Checkbox rows carry their own vertical
 * padding (they are 48 px tap targets), so the gap between them shrinks
 * to keep the list from spreading out.
 */
const optionsSizeStyles: Record<FieldSize, string> = {
  default: "flex flex-col gap-3",
  large: "flex flex-col gap-1",
};

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
  size,
  ...props
}: CheckboxGroupProps) {
  const resolvedSize = useFieldSize(size);
  return (
    <FieldSizeProvider size={resolvedSize}>
      <RACCheckboxGroup
        {...props}
        className={composeTailwindRenderProps(props.className, base)}
      >
        {label && <Label>{label}</Label>}
        <div className={optionsSizeStyles[resolvedSize]}>{children}</div>
        {description && <Description>{description}</Description>}
        <FieldError>{errorMessage}</FieldError>
      </RACCheckboxGroup>
    </FieldSizeProvider>
  );
}
