import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { TextField } from "../Molecules/TextField.js";
import { Input } from "./Input.js";
import { Label } from "./Label.js";

const meta: Meta<typeof Label> = {
  component: Label,
};

export default meta;
type Story = StoryObj<typeof Label>;

/**
 * Inside a required react-aria field the `*` appears on its own; an
 * optional field shows none. The `*` is hidden from screen readers (the
 * input is announced as required instead), so the accessible name stays
 * "Email".
 */
export const RequiredIndicator: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p className="text-sm text-muted-foreground">
        <span className="text-destructive">*</span> means you need to fill this
        in
      </p>
      <TextField name="email" isRequired>
        <Label>Email</Label>
        <Input type="email" />
      </TextField>
      <TextField name="phone">
        <Label>Phone</Label>
        <Input type="tel" />
      </TextField>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const email = canvas.getByRole("textbox", { name: "Email" });
    await expect(email).toBeRequired();
    const indicators = canvasElement.querySelectorAll<HTMLElement>(
      '[data-slot="required-indicator"]',
    );
    await expect(indicators).toHaveLength(2);
    await expect(indicators[0]).toBeVisible();
    await expect(indicators[0]).toHaveAttribute("aria-hidden", "true");
    await expect(indicators[1]).not.toBeVisible();
    await expect(
      canvas.getByRole("textbox", { name: "Phone" }),
    ).not.toBeRequired();
  },
};

/**
 * `isRequired` on Label itself, for a label outside a react-aria field,
 * or `isRequired={false}` to hide the indicator in a required field.
 */
export const ExplicitOverride: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Label isRequired>Shown without a field</Label>
      <TextField name="code" isRequired>
        <Label isRequired={false}>Hidden in a required field</Label>
        <Input />
      </TextField>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const indicators = canvasElement.querySelectorAll<HTMLElement>(
      '[data-slot="required-indicator"]',
    );
    await expect(indicators[0]).toBeVisible();
    await expect(indicators[1]).not.toBeVisible();
  },
};
