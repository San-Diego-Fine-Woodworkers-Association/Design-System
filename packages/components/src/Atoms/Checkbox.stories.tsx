import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Checkbox } from "./Checkbox.js";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  args: {
    children: "Email me when they're on the media site",
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/** Uses the Theme/Context toolbar controls (set up in SDF-23). */
export const Playground: Story = {};

export const Selected: Story = {
  args: { defaultSelected: true },
};

export const Indeterminate: Story = {
  args: { isIndeterminate: true, children: "Select all" },
};

/** A required consent box: the visible `*` is added for you. */
export const Required: Story = {
  args: {
    isRequired: true,
    name: "permission",
    children: "I took these, or I have permission to share them with SDFWA",
  },
};

/** Invalid state, e.g. after a failed submit of a required box. */
export const Invalid: Story = {
  args: { isInvalid: true, children: "I agree to the terms" },
};

export const Disabled: Story = {
  args: { isDisabled: true },
};

/**
 * Keyboard and ARIA: Tab focuses the native checkbox, Space toggles it, and
 * the label is its accessible name. The required box is announced as
 * required while the `*` stays hidden from screen readers.
 */
export const KeyboardAndAria: Story = {
  args: Required.args,
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole("checkbox", {
      name: "I took these, or I have permission to share them with SDFWA",
    });
    await expect(checkbox).toBeRequired();
    await userEvent.tab();
    await expect(checkbox).toHaveFocus();
    await expect(checkbox).not.toBeChecked();
    await userEvent.keyboard(" ");
    await expect(checkbox).toBeChecked();
    await userEvent.keyboard(" ");
    await expect(checkbox).not.toBeChecked();
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
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <p style={{ fontSize: "0.75rem" }}>
            {theme} / {context}
          </p>
          <Checkbox {...args} />
          <Checkbox defaultSelected>Selected</Checkbox>
          <Checkbox isInvalid>Invalid</Checkbox>
        </div>
      ))}
    </div>
  ),
};
