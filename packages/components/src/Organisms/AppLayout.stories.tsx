import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppLayout } from "./AppLayout.js";

const meta: Meta<typeof AppLayout> = {
  component: AppLayout,
  args: {
    theme: "light",
  },
  argTypes: {
    theme: {
      control: "radio",
      options: ["light", "dark"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AppLayout>;

function PlaceholderApp() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Placeholder app</h1>
      <p style={{ marginTop: "0.5rem" }}>
        AppLayout only supplies background/foreground styling and theme/token
        injection (via <code>@sdwa/tokens</code>'s <code>ThemeProvider</code>,
        fixed to <code>context=&quot;app&quot;</code>). Centering, nav chrome,
        and other app-specific composition stay local to the consuming app.
      </p>
    </div>
  );
}

export const Light: Story = {
  args: {
    theme: "light",
  },
  render: (args) => (
    <AppLayout {...args}>
      <PlaceholderApp />
    </AppLayout>
  ),
};

export const Dark: Story = {
  args: {
    theme: "dark",
  },
  render: (args) => (
    <AppLayout {...args}>
      <PlaceholderApp />
    </AppLayout>
  ),
};
