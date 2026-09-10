import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DialogTrigger, Dialog as RACDialog } from "react-aria-components";
import { Button } from "./Button.js";
import { Modal, ModalOverlay } from "./Modal.js";

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

/** Uses the Theme/Context toolbar controls (set up in SDF-23). */
export const Playground: Story = {
  render: () => (
    <DialogTrigger>
      <Button>Open modal</Button>
      <ModalOverlay>
        <Modal>
          <RACDialog style={{ outline: "none" }}>Modal content</RACDialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  ),
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
        <ModalOverlay UNSTABLE_portalContainer={container ?? undefined}>
          <Modal>
            <RACDialog style={{ outline: "none" }}>Modal content</RACDialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </div>
  );
}

/**
 * All four data-theme x data-context combinations, each with its own
 * portal container so the modal content picks up the right theme.
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
