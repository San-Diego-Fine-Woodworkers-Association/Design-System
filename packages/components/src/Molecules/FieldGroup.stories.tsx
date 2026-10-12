import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { FieldGroup } from "./FieldGroup.js";

const meta: Meta<typeof FieldGroup> = {
  component: FieldGroup,
};

export default meta;
type Story = StoryObj<typeof FieldGroup>;

/** Uses the Theme/Context toolbar controls (set up in SDF-23). */
export const Playground: Story = {
  render: () => (
    <FieldGroup
      label="Email"
      name="email"
      isRequired
      inputProps={{ type: "email", placeholder: "you@example.com" }}
    />
  ),
};

/** Shows FieldError rendering with a controlled validation error. */
export const Invalid: Story = {
  render: () => (
    <FieldGroup
      label="Email"
      name="email"
      isInvalid
      errorMessage="Enter a valid email address."
      inputProps={{ type: "email", defaultValue: "not-an-email" }}
    />
  ),
};

/** A login-style form composing two FieldGroups. */
export const LoginForm: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <FieldGroup
        label="Email"
        name="email"
        isRequired
        inputProps={{ type: "email", placeholder: "you@example.com" }}
      />
      <FieldGroup
        label="Password"
        name="password"
        isRequired
        inputProps={{ type: "password" }}
      />
    </div>
  ),
};

/**
 * `size="large"`: the Input is at least 48 px tall with `text-lg`, the
 * Label `text-lg` and the error `text-base`.
 */
export const Large: Story = {
  render: () => (
    <FieldGroup
      label="Email"
      name="email"
      size="large"
      isInvalid
      errorMessage="Enter a valid email address."
      inputProps={{ type: "email", defaultValue: "not-an-email" }}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Email" });
    await expect(input.getBoundingClientRect().height).toBeGreaterThanOrEqual(
      48,
    );
    await expect(input).toHaveClass("min-h-12", "text-lg");
    await expect(canvas.getByText("Email")).toHaveClass("text-lg");
    await expect(canvas.getByText("Enter a valid email address.")).toHaveClass(
      "text-base",
    );
  },
};
