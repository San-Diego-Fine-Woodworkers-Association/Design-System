import {
  Text as RACText,
  type TextProps as RACTextProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { type FieldSize, useFieldSize } from "../utils/fieldSize.js";

export interface DescriptionProps extends RACTextProps {
  /**
   * `default` (`text-xs`) or `large` (`text-base`). Unset, it follows the
   * nearest FieldSizeProvider or sized field (e.g. `<TextField
   * size="large">`).
   */
  size?: FieldSize;
}

const base = "text-xs text-muted-foreground";

/** Size overrides applied after base, like Input's. */
const sizeStyles: Record<FieldSize, string> = {
  default: "",
  large: "text-base",
};

/**
 * Thin wrapper over react-aria-components' Text, defaulted to
 * `slot="description"` (SDF-17 — RAC has no dedicated Description
 * component, this is the documented convention). Plain string className,
 * same as Label.
 */
export function Description({
  slot = "description",
  size,
  ...props
}: DescriptionProps) {
  const resolvedSize = useFieldSize(size);
  return (
    <RACText
      {...props}
      slot={slot}
      className={twMerge(
        `${base} ${sizeStyles[resolvedSize]}`,
        props.className,
      )}
    />
  );
}
