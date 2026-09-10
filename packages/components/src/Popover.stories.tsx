import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DialogTrigger, Dialog as RACDialog } from "react-aria-components";
import { Button } from "./Button.js";
import { Popover } from "./Popover.js";

const meta: Meta<typeof Popover> = {
  title: "Popover",
  component: Popover,
};

export default meta;
type Story = StoryObj<typeof Popover>;

function PopoverDemo() {
  return (
    <DialogTrigger>
      <Button>Open popover</Button>
      <Popover>
        <RACDialog style={{ outline: "none" }}>Popover content</RACDialog>
      </Popover>
    </DialogTrigger>
  );
}

/** Uses the Theme/Context toolbar controls (set up in SDF-23). */
export const Playground: Story = {
  render: () => <PopoverDemo />,
};

const combinations = [
  { theme: "light", context: "app" },
  { theme: "light", context: "content" },
  { theme: "dark", context: "app" },
  { theme: "dark", context: "content" },
] as const;

function ThemedCell({
  theme,
  context,
}: {
  theme: "light" | "dark";
  context: "app" | "content";
}) {
  // Overlays portal to document.body by default, outside this themed div —
  // UNSTABLE_portalContainer keeps each demo's popover inside its own
  // themed subtree so the CSS variable cascade actually applies (see the
  // theming note on Popover.tsx).
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <div
      ref={setContainer}
      data-theme={theme}
      data-context={context}
      style={{
        padding: "1rem",
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <p style={{ fontSize: "0.75rem", marginBottom: "0.5rem" }}>
        {theme} / {context}
      </p>
      <DialogTrigger>
        <Button>Open</Button>
        <Popover UNSTABLE_portalContainer={container ?? undefined}>
          <RACDialog style={{ outline: "none" }}>Popover content</RACDialog>
        </Popover>
      </DialogTrigger>
    </div>
  );
}

/**
 * All four data-theme x data-context combinations, each with its own
 * portal container so the popover content picks up the right theme.
 */
export const AllContextsAndThemes: Story = {
  render: () => (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
    >
      {combinations.map(({ theme, context }) => (
        <ThemedCell
          key={`${theme}-${context}`}
          theme={theme}
          context={context}
        />
      ))}
    </div>
  ),
};
