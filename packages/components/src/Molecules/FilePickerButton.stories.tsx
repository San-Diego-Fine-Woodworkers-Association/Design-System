import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import type { ButtonVariant } from "../Atoms/Button.js";
import { FilePickerButton } from "./FilePickerButton.js";

const meta: Meta<typeof FilePickerButton> = {
  component: FilePickerButton,
  args: {
    children: "Choose photos and videos",
    variant: "primary",
    acceptedFileTypes: ["image/*", "video/*"],
    allowsMultiple: true,
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "destructive",
        "quiet",
      ] satisfies ButtonVariant[],
    },
  },
};

export default meta;
type Story = StoryObj<typeof FilePickerButton>;

/** Uses the Theme/Context toolbar controls (set up in SDF-23). */
export const Playground: Story = {};

/**
 * Lists the chosen files' names under the button, the way an upload form
 * shows what was picked.
 */
export const ShowsChosenFiles: Story = {
  render: (args) => {
    function Demo() {
      const [names, setNames] = useState<string[]>([]);
      return (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <FilePickerButton
            {...args}
            onSelect={(files) =>
              setNames(files ? Array.from(files, (f) => f.name) : [])
            }
          />
          <p className="text-sm text-muted-foreground">
            {names.length ? names.join(", ") : "Nothing chosen yet."}
          </p>
        </div>
      );
    }
    return <Demo />;
  },
};

/**
 * Keyboard and ARIA: the Button is reachable with Tab and keeps its button
 * role and name; the hidden file input carries `accept` and `multiple`
 * and is never a tab stop of its own.
 */
export const KeyboardAndAttributes: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", {
      name: "Choose photos and videos",
    });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    const input =
      canvasElement.querySelector<HTMLInputElement>('input[type="file"]');
    await expect(input).not.toBeNull();
    await expect(input?.accept).toBe("image/*,video/*");
    await expect(input?.multiple).toBe(true);
    await userEvent.tab();
    await expect(input).not.toHaveFocus();
  },
};

const combinations = [
  { theme: "light", context: "app" },
  { theme: "light", context: "content" },
  { theme: "dark", context: "app" },
  { theme: "dark", context: "content" },
] as const;

/** All four data-theme x data-context combinations rendered at once. */
export const AllContextsAndThemes: Story = {
  render: (args) => (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
    >
      {combinations.map(({ theme, context }) => (
        <div
          key={`${theme}-${context}`}
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
          <FilePickerButton {...args} />
        </div>
      ))}
    </div>
  ),
};
