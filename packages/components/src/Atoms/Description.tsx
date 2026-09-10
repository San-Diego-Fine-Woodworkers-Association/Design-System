import {
  Text as RACText,
  type TextProps as RACTextProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export interface DescriptionProps extends RACTextProps {}

/**
 * Thin wrapper over react-aria-components' Text, defaulted to
 * `slot="description"` (SDF-17 — RAC has no dedicated Description
 * component, this is the documented convention). Plain string className,
 * same as Label.
 */
export function Description({
  slot = "description",
  ...props
}: DescriptionProps) {
  return (
    <RACText
      {...props}
      slot={slot}
      className={twMerge("text-xs text-muted-foreground", props.className)}
    />
  );
}
