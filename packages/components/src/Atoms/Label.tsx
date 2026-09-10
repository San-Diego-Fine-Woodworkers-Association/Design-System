import {
  Label as RACLabel,
  type LabelProps as RACLabelProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export interface LabelProps extends RACLabelProps {}

/**
 * Thin wrapper over react-aria-components' Label (SDF-17). Plain string
 * className (no interactive render states), same situation as Dialog —
 * merged with tailwind-merge directly, not composeTailwindRenderProps.
 */
export function Label(props: LabelProps) {
  return (
    <RACLabel
      {...props}
      className={twMerge("text-sm font-medium", props.className)}
    />
  );
}
