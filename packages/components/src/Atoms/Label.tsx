import {
  Label as RACLabel,
  type LabelProps as RACLabelProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { type FieldSize, useFieldSize } from "../utils/fieldSize.js";

export interface LabelProps extends RACLabelProps {
  /**
   * Whether to show the required indicator. Leave it unset inside a
   * react-aria field (TextField, FieldGroup, Select, CheckboxGroup, ...):
   * the indicator then follows the field's own `isRequired`. Set it for a
   * label outside such a field, or `false` to hide the indicator.
   */
  isRequired?: boolean;
  /**
   * `default` (`text-sm`) or `large` (`text-lg`, matching the large
   * controls). Unset, it follows the nearest FieldSizeProvider or sized
   * field (e.g. `<TextField size="large">`).
   */
  size?: FieldSize;
}

const base = "text-sm font-medium";

/** Size overrides applied after base, like Input's. */
const sizeStyles: Record<FieldSize, string> = {
  default: "",
  large: "text-lg",
};

const indicatorBase = "ms-0.5 text-destructive";

/**
 * Thin wrapper over react-aria-components' Label (SDF-17). Plain string
 * className (no interactive render states), same situation as Dialog —
 * merged with tailwind-merge directly, not composeTailwindRenderProps.
 *
 * Required indicator: react-aria fields put `data-required` on their root
 * when `isRequired` is set, so the `*` is always rendered and only shown
 * inside such a root (`in-data-required:`). It is `aria-hidden`: the input
 * itself is announced as required, so screen readers don't also hear
 * "star". Explain the `*` once on the page (e.g. "* means you need to fill
 * this in"); that legend stays app copy.
 */
export function Label({ isRequired, size, children, ...props }: LabelProps) {
  const resolvedSize = useFieldSize(size);
  const visibility =
    isRequired === undefined
      ? "hidden in-data-required:inline"
      : isRequired
        ? "inline"
        : "hidden";
  return (
    <RACLabel
      {...props}
      className={twMerge(
        `${base} ${sizeStyles[resolvedSize]}`,
        props.className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        data-slot="required-indicator"
        className={`${indicatorBase} ${visibility}`}
      >
        *
      </span>
    </RACLabel>
  );
}
