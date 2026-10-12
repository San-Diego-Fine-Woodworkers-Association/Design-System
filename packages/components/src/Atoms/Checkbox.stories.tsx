import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Checkbox } from "./Checkbox.js";

/** The visible box: the label's direct child span that isn't the hidden input's wrapper. */
function boxOf(label: HTMLElement | null) {
  return Array.from(
    label?.querySelectorAll<HTMLElement>(":scope > span") ?? [],
  ).find((span) => !span.querySelector("input"));
}

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

/**
 * `size="large"`: the whole label (the tap target) is at least 48 px tall,
 * with `text-lg` and a 24 px box. Clicking the text toggles the box.
 */
export const Large: Story = {
  args: { size: "large" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox", {
      name: "Email me when they're on the media site",
    });
    const label = checkbox.closest("label");
    await expect(label).toHaveClass("min-h-12", "text-lg");
    await expect(label?.getBoundingClientRect().height).toBeGreaterThanOrEqual(
      48,
    );
    // size-6 is 1.5rem: 24 px at a 16 px root.
    const rem = Number.parseFloat(
      getComputedStyle(canvasElement.ownerDocument.documentElement).fontSize,
    );
    const box = boxOf(label);
    await expect(box?.getBoundingClientRect().width).toBe(1.5 * rem);
    await expect(box?.getBoundingClientRect().height).toBe(1.5 * rem);
    await userEvent.click(
      canvas.getByText("Email me when they're on the media site"),
    );
    await expect(checkbox).toBeChecked();
  },
};

/** No `size`: the label and box keep their original classes. */
export const DefaultSizeUnchanged: Story = {
  play: async ({ canvasElement }) => {
    const label = within(canvasElement).getByRole("checkbox").closest("label");
    await expect(label?.className).toBe(
      "group flex items-start gap-2 text-sm " +
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    );
    await expect(boxOf(label)?.className).toBe(
      "flex size-5 shrink-0 items-center justify-center rounded-sm border-2 border-input bg-background " +
        "text-primary-foreground transition-colors " +
        "group-data-[selected]:border-primary group-data-[selected]:bg-primary " +
        "group-data-[indeterminate]:border-primary group-data-[indeterminate]:bg-primary " +
        "group-data-[invalid]:border-destructive " +
        "group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-ring " +
        "group-data-[focus-visible]:ring-offset-2 group-data-[focus-visible]:ring-offset-background",
    );
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
