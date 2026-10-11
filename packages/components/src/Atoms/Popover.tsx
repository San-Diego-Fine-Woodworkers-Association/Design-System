import {
  Popover as RACPopover,
  type PopoverProps as RACPopoverProps,
} from "react-aria-components";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps.js";
import { useThemeAttributes } from "../utils/useThemeAttributes.js";

export interface PopoverProps extends RACPopoverProps {}

const base =
  "rounded-md border border-border bg-popover text-popover-foreground p-4 shadow-md outline-none";

/**
 * Thin wrapper over react-aria-components' Popover (SDF-17): positioning
 * (placement, offset, triggerRef, etc.) is entirely RACPopover's own job,
 * this only adds default styling. Independent of Dialog/Modal — call sites
 * compose `<DialogTrigger><Button/><Popover><Dialog/></Popover></DialogTrigger>`.
 *
 * Note on theming (SDF-12): the data-theme/data-context cascade only
 * reaches descendants in the DOM tree. RAC portals overlay content to
 * `document.body` by default, which sits outside a themed wrapper `<div>`.
 * Inside AppLayout (or @sdwa/tokens' ThemeProvider) the provider's
 * `data-theme`/`data-context` are copied onto the popover, so it keeps its
 * tokens. Consumers that theme with bare attributes instead of a provider
 * should pass `UNSTABLE_portalContainer` (inherited from RACPopoverProps)
 * pointing at their themed root, or theme `<body>` directly.
 */
export function Popover(props: PopoverProps) {
  const themeAttributes = useThemeAttributes();
  return (
    <RACPopover
      {...themeAttributes}
      {...props}
      className={composeTailwindRenderProps(props.className, base)}
    />
  );
}
