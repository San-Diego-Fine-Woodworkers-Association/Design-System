import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Button } from "../Atoms/Button.js";
import { Checkbox } from "../Atoms/Checkbox.js";
import { Description } from "../Atoms/Description.js";
import { FieldError } from "../Atoms/FieldError.js";
import { Input } from "../Atoms/Input.js";
import { Label } from "../Atoms/Label.js";
import { TextArea } from "../Atoms/TextArea.js";
import { Card, CardContent } from "../Molecules/Card.js";
import { CheckboxGroup } from "../Molecules/CheckboxGroup.js";
import { FieldGroup } from "../Molecules/FieldGroup.js";
import { Select, SelectItem } from "../Molecules/Select.js";
import { TextField } from "../Molecules/TextField.js";
import { FieldSizeProvider } from "../utils/fieldSize.js";
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

/**
 * Rehearsal composition (SDF-44): Card/CardContent, FieldGroup, and Button
 * arranged inside a Form to see how the organism and the newer molecules
 * fit together. Not a shipped `Login` component and not a pixel-for-pixel
 * replica of apps/auth's real login form — just proof the pieces compose.
 */
export const Login: Story = {
  render: () => (
    <Card style={{ maxWidth: "24rem" }}>
      <CardContent>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          style={{ gap: "1.5rem" }}
        >
          <h2 style={{ margin: 0, fontSize: "1.25rem" }}>Log in</h2>
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
          <Button type="submit">Log in</Button>
        </Form>
      </CardContent>
    </Card>
  ),
};

/**
 * One switch for a whole form: `FieldSizeProvider size="large"` makes every
 * field below it large with no `size` on the fields (wrap the app in it to
 * go large everywhere). A field's own `size` still wins, and passes on to
 * its parts: the "Member ID" field and the "Shop" group opt back out with
 * `size="default"`. The submit Button follows the provider too, at the
 * same 48 px as the fields.
 */
export const LargeFields: Story = {
  render: () => (
    <FieldSizeProvider size="large">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        style={{ maxWidth: "28rem" }}
      >
        <TextField name="title" isRequired>
          <Label>Title</Label>
          <Input />
          <Description>A few words people will search for.</Description>
          <FieldError />
        </TextField>
        <TextField name="taken">
          <Label>Date taken</Label>
          <Input type="date" />
        </TextField>
        <Select label="What was the occasion?" placeholder="Choose…">
          <SelectItem id="meeting">General meeting</SelectItem>
          <SelectItem id="fair">San Diego County Fair</SelectItem>
        </Select>
        <CheckboxGroup label="What's in them?">
          <Checkbox value="furniture">Furniture</Checkbox>
          <Checkbox value="turning">Turning</Checkbox>
        </CheckboxGroup>
        <TextField name="notes">
          <Label>Anything else we should know?</Label>
          <TextArea />
        </TextField>
        <FieldGroup label="Member ID" name="member" size="default" />
        <CheckboxGroup label="Shop" size="default">
          <Checkbox value="garage">Garage</Checkbox>
        </CheckboxGroup>
        <Checkbox isRequired name="permission">
          I have permission to share them
        </Checkbox>
        <Button type="submit">Upload</Button>
      </Form>
    </FieldSizeProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const atLeast48 = (el: Element | null | undefined) =>
      expect(el?.getBoundingClientRect().height).toBeGreaterThanOrEqual(48);

    const title = canvas.getByRole("textbox", { name: "Title" });
    await expect(title).toHaveClass("min-h-12", "text-lg");
    await atLeast48(title);
    await expect(canvas.getByText("Title")).toHaveClass("text-lg");
    await expect(
      canvas.getByText("A few words people will search for."),
    ).toHaveClass("text-base");
    const date = canvasElement.querySelector('input[type="date"]');
    await expect(date).toHaveClass("min-h-12", "text-lg");
    await atLeast48(date);
    const notes = canvas.getByRole("textbox", {
      name: "Anything else we should know?",
    });
    await expect(notes).toHaveClass("min-h-32", "text-lg");

    const trigger = canvas.getByRole("button", {
      name: /What was the occasion\?/,
    });
    await atLeast48(trigger);
    await userEvent.click(trigger);
    const listbox = await body.findByRole("listbox");
    for (const option of within(listbox).getAllByRole("option")) {
      await expect(option).toHaveClass("min-h-12", "text-lg");
      await atLeast48(option);
    }
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(body.queryByRole("listbox")).toBeNull());

    for (const name of ["Furniture", "Turning"]) {
      const label = canvas.getByRole("checkbox", { name }).closest("label");
      await expect(label).toHaveClass("min-h-12", "text-lg");
      await atLeast48(label);
    }
    const permission = canvas
      .getByRole("checkbox", { name: "I have permission to share them" })
      .closest("label");
    await expect(permission).toHaveClass("min-h-12", "text-lg");
    await atLeast48(permission);

    const upload = canvas.getByRole("button", { name: "Upload" });
    await expect(upload).toHaveClass("min-h-12", "text-lg");
    await expect(upload.getBoundingClientRect().height).toBe(
      title.getBoundingClientRect().height,
    );

    // Opted out with size="default": back to the original classes.
    const member = canvas.getByRole("textbox", { name: "Member ID" });
    await expect(member).toHaveClass("text-sm");
    await expect(member).not.toHaveClass("min-h-12");
    await expect(canvas.getByText("Member ID")).toHaveClass("text-sm");
    await expect(canvas.getByText("Shop")).not.toHaveClass("text-lg");
    await expect(
      canvas.getByRole("checkbox", { name: "Garage" }).closest("label"),
    ).not.toHaveClass("min-h-12");
  },
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
