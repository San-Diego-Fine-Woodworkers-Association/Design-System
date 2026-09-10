import {
  Dialog as RACDialog,
  type DialogProps as RACDialogProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export interface DialogProps extends RACDialogProps {}

const base = "flex flex-col gap-2 outline-none";

/**
 * Thin wrapper over react-aria-components' Dialog (SDF-17). Dialog itself
 * has no positioning or chrome (background, border) — that belongs to
 * whichever overlay shell wraps it (Popover, or Modal once built). This
 * scaffold only composes Dialog with Popover, per SDF-15's scope.
 *
 * Unlike Button/Popover, RACDialogProps' className is a plain string, not
 * a render-prop function — Dialog has no interactive visual states — so
 * this merges with tailwind-merge directly rather than composeRenderProps.
 *
 * Conventional slotted children, matching the RAC starter kits:
 * `<Heading slot="title">`, `<Text slot="description">`,
 * `<Button slot="close">`.
 */
export function Dialog(props: DialogProps) {
  return <RACDialog {...props} className={twMerge(base, props.className)} />;
}
