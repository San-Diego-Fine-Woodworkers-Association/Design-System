import type { ReactNode } from "react";
import {
  composeRenderProps,
  Button as RACButton,
  ListBox as RACListBox,
  ListBoxItem as RACListBoxItem,
  type ListBoxItemProps as RACListBoxItemProps,
  Select as RACSelect,
  type SelectProps as RACSelectProps,
  SelectValue as RACSelectValue,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { Description } from "../Atoms/Description.js";
import { FieldError, type FieldErrorProps } from "../Atoms/FieldError.js";
import { Label } from "../Atoms/Label.js";
import { Popover } from "../Atoms/Popover.js";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps.js";
import {
  type FieldSize,
  FieldSizeProvider,
  useFieldSize,
} from "../utils/fieldSize.js";

export interface SelectProps<T extends object>
  extends Omit<RACSelectProps<T>, "children"> {
  /** Field label, rendered via Label. */
  label?: ReactNode;
  /** Help text under the trigger, rendered via Description. */
  description?: ReactNode;
  /** Error content rendered via FieldError, like FieldGroup's. */
  errorMessage?: FieldErrorProps["children"];
  /** Options for a dynamic collection; render each with `children`. */
  items?: Iterable<T>;
  /** SelectItem elements, or a function rendering one per `items` entry. */
  children: ReactNode | ((item: T) => ReactNode);
  /**
   * `default` (the original `text-sm`; the trigger is about 38 px tall) or
   * `large` (trigger and options at least 48 px tall, `text-lg`). Applies
   * to the Label, Description, FieldError and SelectItems inside too.
   * Unset, it follows the nearest FieldSizeProvider.
   */
  size?: FieldSize;
}

const base = "group flex flex-col gap-1";

const trigger =
  "flex w-full items-center justify-between gap-2 rounded-md border border-input bg-background " +
  "px-3 py-2 text-start text-sm outline-none " +
  "data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring " +
  "group-data-[invalid]:border-destructive " +
  "group-data-[disabled]:pointer-events-none group-data-[disabled]:opacity-50";

/** Size overrides applied after trigger, like Input's. */
const triggerSizeStyles: Record<FieldSize, { trigger: string; icon: string }> =
  {
    default: { trigger: "", icon: "" },
    large: { trigger: "min-h-12 px-4 py-2 text-lg", icon: "size-5" },
  };

const chevron = "size-4 shrink-0 text-muted-foreground";

/**
 * Thin wrapper over react-aria-components' Select, bundled with Label,
 * Description and FieldError like FieldGroup. The trigger is a button that
 * opens a ListBox in the design system's Popover, sized to the trigger.
 * Options are at least 44 px tall so they are easy to tap on a phone (48 px
 * at `size="large"`).
 *
 * react-aria supplies the keyboard behaviour (arrows, typeahead, Enter,
 * Escape), focus management and ARIA, and renders a hidden native
 * `<select>` so `name` submits with a form and browser autofill works.
 */
export function Select<T extends object>({
  label,
  description,
  errorMessage,
  items,
  children,
  size,
  ...props
}: SelectProps<T>) {
  const resolvedSize = useFieldSize(size);
  const sizeStyles = triggerSizeStyles[resolvedSize];
  return (
    <FieldSizeProvider size={resolvedSize}>
      <RACSelect
        {...props}
        className={composeTailwindRenderProps(props.className, base)}
      >
        {label && <Label>{label}</Label>}
        <RACButton className={twMerge(trigger, sizeStyles.trigger)}>
          <RACSelectValue className="truncate data-[placeholder]:text-muted-foreground" />
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={twMerge(chevron, sizeStyles.icon)}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </RACButton>
        {description && <Description>{description}</Description>}
        <FieldError>{errorMessage}</FieldError>
        <Popover className="min-w-(--trigger-width) overflow-auto p-1">
          <RACListBox items={items} className="outline-none">
            {children}
          </RACListBox>
        </Popover>
      </RACSelect>
    </FieldSizeProvider>
  );
}

export interface SelectItemProps extends RACListBoxItemProps {
  /**
   * `default` (at least 44 px tall, `text-sm`) or `large` (at least 48 px
   * tall, `text-lg`). Unset, it follows its Select's size.
   */
  size?: FieldSize;
}

const itemBase =
  "flex min-h-11 cursor-default items-center gap-2 rounded-sm px-3 py-2 text-sm outline-none " +
  "data-[focused]:bg-accent data-[focused]:text-accent-foreground " +
  "data-[disabled]:opacity-50";

/** Size overrides applied after itemBase, like Input's. */
const itemSizeStyles: Record<FieldSize, { item: string; icon: string }> = {
  default: { item: "", icon: "size-4" },
  large: { item: "min-h-12 px-4 py-2 text-lg", icon: "size-5" },
};

/**
 * One option in a Select (a react-aria-components ListBoxItem). Pass
 * `textValue` when `children` isn't plain text, for typeahead and for the
 * value shown in the trigger.
 */
export function SelectItem({ size, ...props }: SelectItemProps) {
  const sizeStyles = itemSizeStyles[useFieldSize(size)];
  const textValue =
    props.textValue ??
    (typeof props.children === "string" ? props.children : undefined);
  return (
    <RACListBoxItem
      {...props}
      textValue={textValue}
      className={composeTailwindRenderProps(
        props.className,
        `${itemBase} ${sizeStyles.item}`,
      )}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          <span className="flex-1">{children}</span>
          {isSelected && (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${sizeStyles.icon} shrink-0`}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </>
      ))}
    </RACListBoxItem>
  );
}
