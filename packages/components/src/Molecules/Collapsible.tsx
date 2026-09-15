import type { ReactNode } from "react";
import {
  Disclosure as RACDisclosure,
  DisclosurePanel as RACDisclosurePanel,
  type DisclosurePanelProps as RACDisclosurePanelProps,
  type DisclosureProps as RACDisclosureProps,
} from "react-aria-components";
import { Button, type ButtonProps } from "../Atoms/Button.js";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps.js";

export interface CollapsibleProps extends RACDisclosureProps {}

const base = "group flex flex-col gap-1";

/**
 * Thin wrapper over react-aria-components' Disclosure (SDF-41). Named and
 * shaped (Collapsible/CollapsibleTrigger/CollapsibleContent) to match
 * @sdfwa/ui's Collapsible so call sites migrate with the same children
 * structure.
 *
 * `apps/auth/app/faq/page.tsx` (the one real call site at the time of
 * writing) uses each Collapsible independently — one per FAQ section, not
 * a coordinated accordion where opening one closes another — so this
 * doesn't wrap react-aria-components' DisclosureGroup. Reach for
 * DisclosureGroup directly (or ask for a CollapsibleGroup) if a future
 * call site needs coordinated expand/collapse across multiple items.
 */
export function Collapsible(props: CollapsibleProps) {
  return (
    <RACDisclosure
      {...props}
      className={composeTailwindRenderProps(props.className, base)}
    />
  );
}

export interface CollapsibleTriggerProps extends Omit<ButtonProps, "children"> {
  /**
   * Trigger label content, rendered after the chevron. Plain ReactNode
   * (unlike ButtonProps' children, this isn't a Button-state render prop) —
   * the trigger's visual state is conveyed by the chevron's rotation, not
   * by the label.
   */
  children?: ReactNode;
}

const triggerBase =
  "inline-flex w-fit items-center gap-1 text-sm font-medium " +
  "data-[hovered]:underline underline-offset-4";

/**
 * The trigger for a Collapsible's panel. Renders our Button with
 * `slot="trigger"`, which Disclosure wires up with aria-expanded/
 * aria-controls via react-aria-components' slot context — the same
 * mechanism Dialog's `slot="close"` Button relies on. The chevron rotates
 * on `data-[expanded]`, mirroring @sdfwa/ui's rotate-on-open chevron.
 */
export function CollapsibleTrigger({
  variant = "quiet",
  children,
  className,
  ...props
}: CollapsibleTriggerProps) {
  return (
    <Button
      {...props}
      slot="trigger"
      variant={variant}
      className={composeTailwindRenderProps(className, triggerBase)}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4 shrink-0 transition-transform duration-200 group-data-[expanded]:rotate-90"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
      {children}
    </Button>
  );
}

export interface CollapsibleContentProps extends RACDisclosurePanelProps {}

const contentBase = "text-sm";

/**
 * The collapsible panel content, shown while the Collapsible is expanded.
 */
export function CollapsibleContent(props: CollapsibleContentProps) {
  return (
    <RACDisclosurePanel
      {...props}
      className={composeTailwindRenderProps(props.className, contentBase)}
    />
  );
}
