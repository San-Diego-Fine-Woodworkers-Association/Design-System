import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./Collapsible.js";

const meta: Meta<typeof Collapsible> = {
  component: Collapsible,
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

/**
 * Mirrors the real call site (apps/auth/app/faq/page.tsx): a single,
 * independently-expandable Collapsible revealing supplementary content
 * next to a FAQ answer.
 */
export const Playground: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
        Your Member ID is the number printed under the barcode on your
        membership card.
      </p>
      <Collapsible>
        <CollapsibleTrigger>Example Member Card</CollapsibleTrigger>
        <CollapsibleContent>
          <div
            style={{
              marginTop: "0.5rem",
              padding: "1rem",
              border: "1px solid var(--border, #ccc)",
              borderRadius: "0.5rem",
              fontSize: "0.75rem",
            }}
          >
            [Sample membership card image]
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

/** Starts open via `defaultExpanded`, rather than the default collapsed state. */
export const DefaultExpanded: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Collapsible defaultExpanded>
        <CollapsibleTrigger>Shipping details</CollapsibleTrigger>
        <CollapsibleContent>
          <p style={{ marginTop: "0.5rem" }}>
            Orders ship within 3-5 business days.
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

/** `isDisabled` prevents the trigger from expanding the panel. */
export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Collapsible isDisabled>
        <CollapsibleTrigger>Unavailable section</CollapsibleTrigger>
        <CollapsibleContent>
          <p style={{ marginTop: "0.5rem" }}>This content is unreachable.</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

/**
 * Multiple independent Collapsibles, as on the FAQ page — each expands and
 * collapses on its own; opening one has no effect on the others.
 */
export const MultipleIndependent: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: 320,
      }}
    >
      <Collapsible>
        <CollapsibleTrigger>Forgot Member ID</CollapsibleTrigger>
        <CollapsibleContent>
          <p style={{ marginTop: "0.5rem" }}>
            Check the barcode on your membership card.
          </p>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger>Forgot email</CollapsibleTrigger>
        <CollapsibleContent>
          <p style={{ marginTop: "0.5rem" }}>
            Use the same email you use to log into ProClass.
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};
