import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
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

/**
 * `size="large"` on TextField sizes every part inside it: the Input is at
 * least 48 px tall with `text-lg`, the Label `text-lg`, and the
 * Description and FieldError `text-base`.
 */
export const Large: Story = {
  render: () => (
    <TextField name="email" size="large" isRequired isInvalid>
      <Label>Email</Label>
      <Input type="email" defaultValue="not-an-email" />
      <Description>We'll never share it.</Description>
      <FieldError>Enter a valid email address.</FieldError>
    </TextField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Email" });
    await expect(input.getBoundingClientRect().height).toBeGreaterThanOrEqual(
      48,
    );
    await expect(input).toHaveClass("min-h-12", "px-4", "text-lg");
    await expect(canvas.getByText("Email")).toHaveClass("text-lg");
    await expect(canvas.getByText("We'll never share it.")).toHaveClass(
      "text-base",
    );
    await expect(canvas.getByText("Enter a valid email address.")).toHaveClass(
      "text-base",
    );
  },
};

/**
 * Without `size` (and outside a FieldSizeProvider) every part renders
 * exactly the classes it had before sizes existed.
 */
export const DefaultSizeUnchanged: Story = {
  render: () => (
    <TextField name="email" isRequired isInvalid>
      <Label>Email</Label>
      <Input type="email" defaultValue="not-an-email" />
      <Description>We'll never share it.</Description>
      <FieldError>Enter a valid email address.</FieldError>
    </TextField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("textbox", { name: "Email" }).className).toBe(
      "rounded-md border border-input bg-background px-3 py-2 text-sm outline-none " +
        "data-[focused]:ring-2 data-[focused]:ring-ring " +
        "data-[invalid]:border-destructive " +
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    );
    await expect(canvas.getByText("Email").className).toBe(
      "text-sm font-medium",
    );
    await expect(canvas.getByText("We'll never share it.").className).toBe(
      "text-xs text-muted-foreground",
    );
    await expect(
      canvas.getByText("Enter a valid email address.").className,
    ).toBe("text-xs text-destructive");
  },
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
