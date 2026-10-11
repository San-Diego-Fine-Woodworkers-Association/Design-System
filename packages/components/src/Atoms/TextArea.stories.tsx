import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { TextField } from "../Molecules/TextField.js";
import { Description } from "./Description.js";
import { FieldError } from "./FieldError.js";
import { Label } from "./Label.js";
import { TextArea } from "./TextArea.js";

const meta: Meta<typeof TextArea> = {
  component: TextArea,
};

export default meta;
type Story = StoryObj<typeof TextArea>;

function TextAreaDemo() {
  return (
    <TextField name="notes" style={{ maxWidth: 360 }}>
      <Label>Anything else we should know?</Label>
      <TextArea />
      <Description>Optional.</Description>
      <FieldError />
    </TextField>
  );
}

/** Uses the Theme/Context toolbar controls (set up in SDF-23). */
export const Playground: Story = {
  render: () => <TextAreaDemo />,
};

/** Shows FieldError rendering with a controlled validation error. */
export const Invalid: Story = {
  render: () => (
    <TextField name="notes" isInvalid style={{ maxWidth: 360 }}>
      <Label>Anything else we should know?</Label>
      <TextArea defaultValue="x" />
      <FieldError>Tell us a little more.</FieldError>
    </TextField>
  ),
};

/**
 * Keyboard and ARIA: Tab reaches the textarea, it is labelled and
 * described by TextField's parts, and Enter adds a new line.
 */
export const KeyboardAndAria: Story = {
  render: () => <TextAreaDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole("textbox", {
      name: "Anything else we should know?",
    });
    await expect(textarea).toHaveAccessibleDescription("Optional.");
    await userEvent.tab();
    await expect(textarea).toHaveFocus();
    await userEvent.keyboard("Line one{Enter}Line two");
    await expect(textarea).toHaveValue("Line one\nLine two");
  },
};

const combinations = [
  { theme: "light", context: "app" },
  { theme: "light", context: "content" },
  { theme: "dark", context: "app" },
  { theme: "dark", context: "content" },
] as const;

/** All four data-theme x data-context combinations rendered at once. */
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
          <TextAreaDemo />
        </div>
      ))}
    </div>
  ),
};
