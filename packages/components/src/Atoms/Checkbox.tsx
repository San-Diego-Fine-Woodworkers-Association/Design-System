import type { ReactNode } from "react";
import {
  Checkbox as RACCheckbox,
  type CheckboxProps as RACCheckboxProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps.js";
import { type FieldSize, useFieldSize } from "../utils/fieldSize.js";

export interface CheckboxProps extends Omit<RACCheckboxProps, "children"> {
  /** The checkbox's label. Plain content (not a render prop). */
  children?: ReactNode;
  /**
   * `default` (the original `text-sm`, 20 px box) or `large` (each row at
   * least 48 px tall, `text-lg`, 24 px box). Unset, it follows the nearest
   * FieldSizeProvider or sized field (e.g. `<CheckboxGroup size="large">`).
   */
  size?: FieldSize;
}

const base =
  "group flex items-start gap-2 text-sm " +
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

const box =
  "flex size-5 shrink-0 items-center justify-center rounded-sm border-2 border-input bg-background " +
  "text-primary-foreground transition-colors " +
  "group-data-[selected]:border-primary group-data-[selected]:bg-primary " +
  "group-data-[indeterminate]:border-primary group-data-[indeterminate]:bg-primary " +
  "group-data-[invalid]:border-destructive " +
  "group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-ring " +
  "group-data-[focus-visible]:ring-offset-2 group-data-[focus-visible]:ring-offset-background";

/**
 * Size overrides applied after base/box, like Input's. Large pads the
 * whole label to at least 48 px tall, so the tap target (the entire
 * `<label>`) meets WCAG 2.5.5 even for a one-line label, and nudges the
 * 24 px box down to sit centred on the first 28 px line.
 */
const sizeStyles: Record<
  FieldSize,
  { base: string; box: string; icon: string }
> = {
  default: { base: "", box: "", icon: "size-3.5" },
  large: {
    base: "min-h-12 gap-3 py-2.5 text-lg",
    box: "mt-0.5 size-6",
    icon: "size-4",
  },
};

/**
 * Thin wrapper over react-aria-components' Checkbox: a `<label>` around a
 * visually hidden native checkbox, so the whole label is the tap target and
 * keyboard (Space), form submission and ARIA come from react-aria. Use alone
 * (e.g. a consent box) or inside CheckboxGroup.
 *
 * When `isRequired` is set on a standalone checkbox, a visible `*` is added
 * after the label (hidden from screen readers, which already hear
 * "required").
 */
export function Checkbox({ children, size, ...props }: CheckboxProps) {
  const styles = sizeStyles[useFieldSize(size)];
  return (
    <RACCheckbox
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        `${base} ${styles.base}`,
      )}
    >
      {({ isSelected, isIndeterminate }) => (
        <>
          <span className={twMerge(box, styles.box)}>
            {isIndeterminate ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                className={styles.icon}
              >
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            ) : isSelected ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.icon}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : null}
          </span>
          <span>
            {children}
            {props.isRequired && (
              <span aria-hidden="true" className="ms-0.5 text-destructive">
                *
              </span>
            )}
          </span>
        </>
      )}
    </RACCheckbox>
  );
}
