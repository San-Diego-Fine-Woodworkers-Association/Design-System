import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DialogTrigger, Heading, Text } from "react-aria-components";
import { Button } from "./Button.js";
import { Dialog } from "./Dialog.js";
import { Modal, ModalOverlay } from "./Modal.js";
import { Popover } from "./Popover.js";

const meta: Meta<typeof Dialog> = {
  title: "Dialog",
  component: Dialog,
};

export default meta;
type Story = StoryObj<typeof Dialog>;

function ConfirmDeleteContent() {
  return (
    <Dialog>
      <Heading slot="title" style={{ fontWeight: 600 }}>
        Delete file
      </Heading>
      <Text slot="description">This action can't be undone.</Text>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
        <Button slot="close" variant="destructive">
          Delete
        </Button>
        <Button slot="close" variant="quiet">
          Cancel
        </Button>
      </div>
    </Dialog>
  );
}

/**
 * Destructive confirmations belong in the centered, backdropped Modal
 * composition (SDF-29), not Popover — a positioned, backdrop-less overlay
 * is the wrong shell for an action this consequential. Uses the
 * Theme/Context toolbar controls (set up in SDF-23).
 */
export const Playground: Story = {
  render: () => (
    <DialogTrigger>
      <Button variant="destructive">Delete…</Button>
      <ModalOverlay>
        <Modal>
          <ConfirmDeleteContent />
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  ),
};

/**
 * Dialog is also independent of Popover vs. Modal (SDF-17) — the same
 * component composes into a non-modal, positioned overlay for lighter-
 * weight content that doesn't need to block the whole page.
 */
export const PopoverComposition: Story = {
  render: () => (
    <DialogTrigger>
      <Button>Rename…</Button>
      <Popover>
        <Dialog>
          <Heading slot="title" style={{ fontWeight: 600 }}>
            Rename file
          </Heading>
          <Button slot="close" variant="quiet">
            Done
          </Button>
        </Dialog>
      </Popover>
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
  // See the theming note on Popover.tsx/Modal.tsx: overlays portal outside
  // a themed div by default, so each demo needs its own portal container.
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
        <Button variant="destructive">Delete…</Button>
        <ModalOverlay UNSTABLE_portalContainer={container ?? undefined}>
          <Modal>
            <ConfirmDeleteContent />
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </div>
  );
}

/**
 * All four data-theme x data-context combinations, each with its own
 * portal container so the dialog content picks up the right theme.
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
