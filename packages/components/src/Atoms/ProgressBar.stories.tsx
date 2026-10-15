import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { FieldSizeProvider } from "../utils/fieldSize.js";
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

function fontSizeOf(el: Element | null | undefined): number {
  if (!el) throw new Error("element not found");
  return Number.parseFloat(getComputedStyle(el).fontSize);
}

/** The bar's visible label (react-aria renders it as a span). */
function labelOf(bar: Element): Element | null {
  return document.getElementById(bar.getAttribute("aria-labelledby") ?? "");
}

/** Default: label and percent at `text-sm`, as before. */
export const DefaultSize: Story = {
  play: async ({ canvasElement }) => {
    const rem = fontSizeOf(document.documentElement);
    const value = canvasElement.querySelector('[data-slot="progress-value"]');
    await expect(value).toHaveTextContent("40%");
    await expect(fontSizeOf(value)).toBe(0.875 * rem);
    const bar = within(canvasElement).getByRole("progressbar", {
      name: "Sending",
    });
    await expect(fontSizeOf(labelOf(bar))).toBe(0.875 * rem);
  },
};

/**
 * Large, from a FieldSizeProvider or its own `size`: label and percent at
 * `text-lg`, like a large field's label. `size="default"` opts out.
 */
export const Large: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1rem" }}>
      <FieldSizeProvider size="large">
        <ProgressBar {...args} label="From the provider" />
        <ProgressBar
          {...args}
          label="Opted out"
          size="default"
          data-testid="opt-out"
        />
      </FieldSizeProvider>
      <ProgressBar {...args} label="Own size" size="large" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rem = fontSizeOf(document.documentElement);
    for (const name of ["From the provider", "Own size"]) {
      const bar = canvas.getByRole("progressbar", { name });
      const value = bar.querySelector('[data-slot="progress-value"]');
      await expect(fontSizeOf(value)).toBe(1.125 * rem);
      await expect(fontSizeOf(labelOf(bar))).toBe(1.125 * rem);
    }
    const optOut = canvas.getByTestId("opt-out");
    await expect(
      fontSizeOf(optOut.querySelector('[data-slot="progress-value"]')),
    ).toBe(0.875 * rem);
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
