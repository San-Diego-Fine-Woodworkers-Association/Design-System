import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Checkbox } from "../Atoms/Checkbox.js";
import { CheckboxGroup } from "./CheckboxGroup.js";

const meta: Meta<typeof CheckboxGroup> = {
  component: CheckboxGroup,
  args: {
    label: "What's in them?",
    description: "Pick all that apply.",
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

function Options() {
  return (
    <>
      <Checkbox value="furniture">Furniture</Checkbox>
      <Checkbox value="turning">Turning</Checkbox>
      <Checkbox value="carving">Carving</Checkbox>
      <Checkbox value="people">People at work</Checkbox>
    </>
  );
}

/** Uses the Theme/Context toolbar controls (set up in SDF-23). */
export const Playground: Story = {
  render: (args) => (
    <CheckboxGroup {...args}>
      <Options />
    </CheckboxGroup>
  ),
};

/** Shows FieldError rendering with a controlled validation error. */
export const Invalid: Story = {
  render: (args) => (
    <CheckboxGroup
      {...args}
      isRequired
      isInvalid
      errorMessage="Pick at least one."
    >
      <Options />
    </CheckboxGroup>
  ),
};

/**
 * Keyboard and ARIA: the group is a labelled `role="group"`; each option
 * is its own tab stop and toggles with Space; the group's value follows.
 */
export const KeyboardAndAria: Story = {
  render: (args) => (
    <CheckboxGroup {...args}>
      <Options />
    </CheckboxGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole("group", { name: "What's in them?" });
    await expect(group).toHaveAccessibleDescription("Pick all that apply.");
    await userEvent.tab();
    await expect(
      canvas.getByRole("checkbox", { name: "Furniture" }),
    ).toHaveFocus();
    await userEvent.keyboard(" ");
    await userEvent.tab();
    await expect(
      canvas.getByRole("checkbox", { name: "Turning" }),
    ).toHaveFocus();
    await userEvent.keyboard(" ");
    await expect(
      canvas.getByRole("checkbox", { name: "Furniture" }),
    ).toBeChecked();
    await expect(
      canvas.getByRole("checkbox", { name: "Turning" }),
    ).toBeChecked();
    await expect(
      canvas.getByRole("checkbox", { name: "Carving" }),
    ).not.toBeChecked();
  },
};

/**
 * `size="large"` on the group sizes its label (`text-lg`), every Checkbox
 * (each row at least 48 px tall), and the description and error
 * (`text-base`).
 */
export const Large: Story = {
  render: (args) => (
    <CheckboxGroup
      {...args}
      size="large"
      isRequired
      isInvalid
      errorMessage="Pick at least one."
    >
      <Options />
    </CheckboxGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("What's in them?")).toHaveClass("text-lg");
    await expect(canvas.getByText("Pick all that apply.")).toHaveClass(
      "text-base",
    );
    await expect(canvas.getByText("Pick at least one.")).toHaveClass(
      "text-base",
    );
    for (const checkbox of canvas.getAllByRole("checkbox")) {
      const label = checkbox.closest("label");
      await expect(label).toHaveClass("min-h-12", "text-lg");
      await expect(
        label?.getBoundingClientRect().height,
      ).toBeGreaterThanOrEqual(48);
    }
    await userEvent.click(canvas.getByText("Turning"));
    await expect(
      canvas.getByRole("checkbox", { name: "Turning" }),
    ).toBeChecked();
  },
};

/** No `size`: the options keep their original classes and spacing. */
export const DefaultSizeUnchanged: Story = {
  render: (args) => (
    <CheckboxGroup {...args}>
      <Options />
    </CheckboxGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("What's in them?").className).toBe(
      "text-sm font-medium",
    );
    const label = canvas
      .getByRole("checkbox", { name: "Furniture" })
      .closest("label");
    await expect(label?.className).toBe(
      "group flex items-start gap-2 text-sm " +
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    );
    await expect(label?.parentElement?.className).toBe("flex flex-col gap-3");
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
  render: (args) => (
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
          <CheckboxGroup {...args} defaultValue={["turning"]}>
            <Options />
          </CheckboxGroup>
        </div>
      ))}
    </div>
  ),
};
