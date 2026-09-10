import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Atoms/Button.js";
import { Description } from "../Atoms/Description.js";
import { FieldError } from "../Atoms/FieldError.js";
import { Input } from "../Atoms/Input.js";
import { Label } from "../Atoms/Label.js";
import { TextField } from "../Molecules/TextField.js";
import { Form } from "./Form.js";

const meta: Meta<typeof Form> = {
  component: Form,
};

export default meta;
type Story = StoryObj<typeof Form>;

function FormDemo() {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <TextField name="name" isRequired>
        <Label>Name</Label>
        <Input placeholder="Ada Lovelace" />
        <FieldError />
      </TextField>
      <TextField name="email" isRequired>
        <Label>Email</Label>
        <Input type="email" placeholder="you@example.com" />
        <Description>We'll never share it.</Description>
        <FieldError />
      </TextField>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

/** Uses the Theme/Context toolbar controls (set up in SDF-23). */
export const Playground: Story = {
  render: () => <FormDemo />,
};

const combinations = [
  { theme: "light", context: "app" },
  { theme: "light", context: "content" },
  { theme: "dark", context: "app" },
  { theme: "dark", context: "content" },
] as const;

/**
 * All four data-theme x data-context combinations rendered at once — no
 * portal/overlay content, same as TextField's story.
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
          <FormDemo />
        </div>
      ))}
    </div>
  ),
};
