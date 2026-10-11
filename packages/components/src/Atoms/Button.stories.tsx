import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Button, type ButtonSize, type ButtonVariant } from "./Button.js";

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    children: "Button",
    variant: "primary",
    size: "default",
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["default", "large"] satisfies ButtonSize[],
    },
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
type Story = StoryObj<typeof Button>;

/** Uses the Theme/Context toolbar controls (set up in SDF-23). */
export const Playground: Story = {};

/**
 * `size="large"`: at least 48 px tall with `text-lg`, for audiences that
 * need bigger touch targets. The default size is unchanged.
 */
export const Large: Story = {
  args: { size: "large", children: "Choose photos and videos" },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button.getBoundingClientRect().height).toBeGreaterThanOrEqual(
      48,
    );
  },
};

/** Both sizes side by side, in every variant. */
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
      {(["default", "large"] as const).map((size) => (
        <div key={size} style={{ display: "flex", gap: "0.5rem" }}>
          {(["primary", "secondary", "destructive", "quiet"] as const).map(
            (variant) => (
              <Button {...args} key={variant} size={size} variant={variant}>
                {variant} ({size})
              </Button>
            ),
          )}
        </div>
      ))}
    </div>
  ),
};

const combinations = [
  { theme: "light", context: "app" },
  { theme: "light", context: "content" },
  { theme: "dark", context: "app" },
  { theme: "dark", context: "content" },
] as const;

/**
 * All four data-theme x data-context combinations rendered at once,
 * independent of the toolbar globals — per this ticket's requirement.
 */
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
          <Button {...args} />
        </div>
      ))}
    </div>
  ),
};
