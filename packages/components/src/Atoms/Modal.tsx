import {
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
  type ModalOverlayProps as RACModalOverlayProps,
} from "react-aria-components";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps.js";
import { useThemeAttributes } from "../utils/useThemeAttributes.js";

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
 * Theming: overlays portal to document.body, outside a themed wrapper div.
 * Inside AppLayout (or @sdwa/tokens' ThemeProvider) this copies the
 * provider's `data-theme`/`data-context` onto the overlay, so the modal
 * keeps its tokens with no extra setup. Apps that theme with bare
 * attributes instead of a provider still need `UNSTABLE_portalContainer`
 * (or to theme `<body>`).
 */
export function ModalOverlay(props: ModalOverlayProps) {
  const themeAttributes = useThemeAttributes();
  return (
    <RACModalOverlay
      {...themeAttributes}
      {...props}
      className={composeTailwindRenderProps(props.className, overlayBase)}
    />
  );
}

export type ModalSize = "default" | "wide";

export interface ModalProps extends RACModalOverlayProps {
  /**
   * `default` (max 28rem, for dialogs and forms) or `wide` (max 56rem, for
   * a full-size photo or video viewer). Both fill the width on phones.
   */
  size?: ModalSize;
}

const modalBase =
  "w-full max-w-md rounded-lg border border-border bg-popover text-popover-foreground p-6 shadow-lg outline-none";

const modalSizeStyles: Record<ModalSize, string> = {
  default: "",
  wide: "max-w-4xl",
};

/**
 * Thin wrapper over react-aria-components' Modal (SDF-17): sizing/positioning
 * inside ModalOverlay's backdrop. Carries the same theme attributes as
 * ModalOverlay, for the case where Modal is used without one.
 */
export function Modal({ size = "default", ...props }: ModalProps) {
  const themeAttributes = useThemeAttributes();
  return (
    <RACModal
      {...themeAttributes}
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        `${modalBase} ${modalSizeStyles[size]}`,
      )}
    />
  );
}
