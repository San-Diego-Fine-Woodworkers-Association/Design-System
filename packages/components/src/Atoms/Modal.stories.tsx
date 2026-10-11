import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DialogTrigger, Dialog as RACDialog } from "react-aria-components";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { AppLayout } from "../Organisms/AppLayout.js";
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

/**
 * `size="wide"` (max 56rem) for a full-size photo or video viewer; it still
 * fills the width on a phone.
 */
export const Wide: Story = {
  render: () => (
    <DialogTrigger>
      <Button>Open wide modal</Button>
      <ModalOverlay isDismissable>
        <Modal size="wide" className="p-3">
          <RACDialog
            aria-label="Bigger view of IMG_0042.jpg"
            className="flex flex-col gap-3 outline-none"
          >
            <div className="flex aspect-video w-full items-center justify-center rounded bg-muted text-muted-foreground">
              Photo
            </div>
            <Button slot="close" size="large">
              Close
            </Button>
          </RACDialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  ),
};

/**
 * Inside AppLayout (here dark, inside the light toolbar theme) the modal
 * portals to document.body, outside AppLayout's themed div, yet keeps the
 * dark tokens: ModalOverlay copies the provider's data-theme/data-context
 * onto itself. No UNSTABLE_portalContainer needed.
 */
export const KeepsTokensWhenPortalled: Story = {
  render: () => (
    <AppLayout theme="dark" className="min-h-0 p-4">
      <span data-testid="reference" className="bg-popover p-1">
        Popover colour in this theme
      </span>
      <DialogTrigger>
        <Button>Open modal</Button>
        <ModalOverlay>
          <Modal>
            <RACDialog aria-label="Themed modal" className="outline-none">
              <p>Dark tokens, rendered outside the themed container.</p>
              <Button slot="close">Close</Button>
            </RACDialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </AppLayout>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Open modal" }));
    const body = within(canvasElement.ownerDocument.body);
    const dialog = await body.findByRole("dialog", { name: "Themed modal" });
    await expect(canvasElement.contains(dialog)).toBe(false);
    const modal = dialog.parentElement as HTMLElement;
    const reference = canvas.getByTestId("reference");
    await waitFor(() =>
      expect(getComputedStyle(modal).backgroundColor).toBe(
        getComputedStyle(reference).backgroundColor,
      ),
    );
    await expect(dialog.closest('[data-theme="dark"]')).not.toBeNull();
    await userEvent.keyboard("{Escape}");
  },
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
