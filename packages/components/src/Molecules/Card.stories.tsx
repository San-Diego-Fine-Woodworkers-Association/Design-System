import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardContent } from "./Card.js";

const meta: Meta<typeof Card> = {
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

/** Uses the Theme/Context toolbar controls (set up in SDF-23). */
export const Playground: Story = {
  render: () => (
    <Card>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
    </Card>
  ),
};
