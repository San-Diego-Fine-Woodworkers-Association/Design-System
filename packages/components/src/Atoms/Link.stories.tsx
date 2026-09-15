import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link, type LinkVariant } from "./Link.js";

const meta: Meta<typeof Link> = {
  component: Link,
  args: {
    children: "Link",
    href: "https://example.com",
    variant: "inline",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "inline",
        "primary",
        "secondary",
        "destructive",
        "quiet",
      ] satisfies LinkVariant[],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

/** Uses the Theme/Context toolbar controls (set up in SDF-23). */
export const Playground: Story = {};

/** Underlined body/content text link — the default variant. */
export const Inline: Story = {
  args: { variant: "inline" },
};

/** "Styled as a button, but navigates" — shares Button's styling (SDF-52). */
export const PrimaryButtonStyled: Story = {
  args: { variant: "primary", children: "Log in" },
};
