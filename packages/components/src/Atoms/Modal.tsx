import {
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
  type ModalOverlayProps as RACModalOverlayProps,
} from "react-aria-components";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps.js";

export interface ModalOverlayProps extends RACModalOverlayProps {}

const overlayBase =
  "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4";

/**
 * Thin wrapper over react-aria-components' ModalOverlay (SDF-17): the
 * backdrop + centering container for the blocking/modal Dialog
 * composition, distinct from Popover's non-modal path (SDF-25). Compose
 * as `<DialogTrigger><Button/><ModalOverlay><Modal><Dialog/></Modal>
 * </ModalOverlay></DialogTrigger>`.
 *
 * Same theming caveat as Popover (SDF-25): overlays portal to
 * document.body by default, outside a themed wrapper div — pass
 * `UNSTABLE_portalContainer` when demonstrating a specific theme/context.
 */
export function ModalOverlay(props: ModalOverlayProps) {
  return (
    <RACModalOverlay
      {...props}
      className={composeTailwindRenderProps(props.className, overlayBase)}
    />
  );
}

const modalBase =
  "w-full max-w-md rounded-lg border border-border bg-popover text-popover-foreground p-6 shadow-lg outline-none";

/** Thin wrapper over react-aria-components' Modal (SDF-17): sizing/positioning inside ModalOverlay's backdrop. */
export function Modal(props: ModalOverlayProps) {
  return (
    <RACModal
      {...props}
      className={composeTailwindRenderProps(props.className, modalBase)}
    />
  );
}
