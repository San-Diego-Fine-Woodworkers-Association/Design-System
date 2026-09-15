import type { Meta, StoryObj } from "@storybook/react-vite";
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
