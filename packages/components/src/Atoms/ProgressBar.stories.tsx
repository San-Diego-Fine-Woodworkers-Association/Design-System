import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { ProgressBar } from "./ProgressBar.js";

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  args: {
    label: "Sending",
    value: 40,
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

/** Uses the Theme/Context toolbar controls (set up in SDF-23). */
export const Playground: Story = {};

/** No end value known yet (e.g. "Finishing up…"): pulses instead of filling. */
export const Indeterminate: Story = {
  args: { label: "Finishing up…", isIndeterminate: true },
};

/**
 * Without a visible label, name the bar with `aria-label` (here: one bar
 * per file in a list that already shows the file name).
 */
export const WithoutVisibleLabel: Story = {
  args: { label: undefined, "aria-label": "IMG_0042.HEIC", value: 75 },
};

/** ARIA comes from react-aria: role, accessible name and current value. */
export const Aria: Story = {
  play: async ({ canvasElement }) => {
    const bar = within(canvasElement).getByRole("progressbar", {
      name: "Sending",
    });
    await expect(bar).toHaveAttribute("aria-valuenow", "40");
    await expect(bar).toHaveAttribute("aria-valuemin", "0");
    await expect(bar).toHaveAttribute("aria-valuemax", "100");
    await expect(bar).toHaveAttribute("aria-valuetext", "40%");
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
  decorators: [(Story) => <Story />],
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
          <ProgressBar {...args} label={`Sending (${theme}/${context})`} />
        </div>
      ))}
    </div>
  ),
};
