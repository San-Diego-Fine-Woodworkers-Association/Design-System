import type { Meta, StoryObj } from "@storybook/react-vite";
import { Description } from "../Atoms/Description.js";
import { FieldError } from "../Atoms/FieldError.js";
import { Input } from "../Atoms/Input.js";
import { Label } from "../Atoms/Label.js";
import { TextField } from "./TextField.js";

const meta: Meta<typeof TextField> = {
  component: TextField,
};

export default meta;
type Story = StoryObj<typeof TextField>;

function TextFieldDemo() {
  return (
    <TextField name="email" isRequired>
      <Label>Email</Label>
      <Input type="email" placeholder="you@example.com" />
      <Description>We'll never share it.</Description>
      <FieldError />
    </TextField>
  );
}

/** Uses the Theme/Context toolbar controls (set up in SDF-23). */
export const Playground: Story = {
  render: () => <TextFieldDemo />,
};

/** Shows FieldError rendering with a controlled validation error. */
export const Invalid: Story = {
  render: () => (
    <TextField name="email" isInvalid>
      <Label>Email</Label>
      <Input type="email" defaultValue="not-an-email" />
      <FieldError>Enter a valid email address.</FieldError>
    </TextField>
  ),
};

const combinations = [
  { theme: "light", context: "app" },
  { theme: "light", context: "content" },
  { theme: "dark", context: "app" },
  { theme: "dark", context: "content" },
] as const;

/**
 * All four data-theme x data-context combinations rendered at once —
 * TextField has no portal/overlay content, so this needs no portal
 * container wiring (unlike Popover/Dialog).
 */
export const AllContextsAndThemes: Story = {
  render: () => (
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
          <TextFieldDemo />
        </div>
      ))}
    </div>
  ),
};
