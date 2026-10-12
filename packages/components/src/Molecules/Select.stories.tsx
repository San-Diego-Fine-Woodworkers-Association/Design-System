import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Select, SelectItem } from "./Select.js";

const meta: Meta<typeof Select> = {
  component: Select,
  args: {
    label: "What was the occasion?",
    placeholder: "Choose…",
    name: "occasion",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

function Options() {
  return (
    <>
      <SelectItem id="meeting">General meeting</SelectItem>
      <SelectItem id="class">Class or workshop</SelectItem>
      <SelectItem id="fair">San Diego County Fair</SelectItem>
      <SelectItem id="toys">Toy program</SelectItem>
      <SelectItem id="other">Something else</SelectItem>
    </>
  );
}

/** Uses the Theme/Context toolbar controls (set up in SDF-23). */
export const Playground: Story = {
  render: (args) => (
    <Select {...args}>
      <Options />
    </Select>
  ),
};

/** Items from data, rendered with a function child. */
export const DynamicItems: Story = {
  render: (args) => (
    <Select
      {...args}
      items={[
        { id: "2024", name: "2024" },
        { id: "2025", name: "2025" },
        { id: "2026", name: "2026" },
      ]}
      label="Year"
    >
      {(item: { id: string; name: string }) => (
        <SelectItem id={item.id}>{item.name}</SelectItem>
      )}
    </Select>
  ),
};

export const WithDescription: Story = {
  render: (args) => (
    <Select {...args} description="Pick the closest one.">
      <Options />
    </Select>
  ),
};

/** Shows FieldError rendering with a controlled validation error. */
export const Invalid: Story = {
  render: (args) => (
    <Select {...args} isRequired isInvalid errorMessage="Choose an occasion.">
      <Options />
    </Select>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Select {...args} isDisabled>
      <Options />
    </Select>
  ),
};

/**
 * Keyboard and ARIA: Tab focuses the trigger, ArrowDown opens the listbox
 * with focus inside it, arrows move, Enter chooses and closes, focus
 * returns to the trigger, and the hidden native select carries the value
 * for form submission.
 */
export const KeyboardAndAria: Story = {
  render: (args) => (
    <Select {...args}>
      <Options />
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole("button", {
      name: /What was the occasion\?/,
    });
    await userEvent.tab();
    await expect(trigger).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    const listbox = await body.findByRole("listbox");
    await waitFor(() =>
      expect(
        within(listbox).getByRole("option", { name: "General meeting" }),
      ).toHaveFocus(),
    );
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await waitFor(() => expect(body.queryByRole("listbox")).toBeNull());
    await expect(trigger).toHaveFocus();
    await expect(trigger).toHaveTextContent("Class or workshop");
    const native = canvasElement.querySelector<HTMLSelectElement>(
      'select[name="occasion"]',
    );
    await expect(native?.value).toBe("class");
  },
};

/**
 * `size="large"`: the trigger and every option are at least 48 px tall
 * with `text-lg`; the label is `text-lg`, and the description and error
 * `text-base`. The SelectItems take the Select's size on their own.
 */
export const Large: Story = {
  render: (args) => (
    <Select
      {...args}
      size="large"
      isRequired
      isInvalid
      description="Pick the closest one."
      errorMessage="Choose an occasion."
    >
      <Options />
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole("button", {
      name: /What was the occasion\?/,
    });
    await expect(trigger.getBoundingClientRect().height).toBeGreaterThanOrEqual(
      48,
    );
    await expect(trigger).toHaveClass("min-h-12", "px-4", "text-lg");
    await expect(canvas.getByText("What was the occasion?")).toHaveClass(
      "text-lg",
    );
    await expect(canvas.getByText("Pick the closest one.")).toHaveClass(
      "text-base",
    );
    await expect(canvas.getByText("Choose an occasion.")).toHaveClass(
      "text-base",
    );
    await userEvent.click(trigger);
    const listbox = await body.findByRole("listbox");
    const options = within(listbox).getAllByRole("option");
    await expect(options).toHaveLength(5);
    for (const option of options) {
      await expect(option).toHaveClass("min-h-12", "text-lg");
      await expect(
        option.getBoundingClientRect().height,
      ).toBeGreaterThanOrEqual(48);
    }
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(body.queryByRole("listbox")).toBeNull());
  },
};

/** No `size`: the trigger and options keep their original classes. */
export const DefaultSizeUnchanged: Story = {
  render: (args) => (
    <Select {...args}>
      <Options />
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole("button", {
      name: /What was the occasion\?/,
    });
    await expect(trigger.className).toBe(
      "flex w-full items-center justify-between gap-2 rounded-md border border-input bg-background " +
        "px-3 py-2 text-start text-sm outline-none " +
        "data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring " +
        "group-data-[invalid]:border-destructive " +
        "group-data-[disabled]:pointer-events-none group-data-[disabled]:opacity-50",
    );
    await userEvent.click(trigger);
    const listbox = await body.findByRole("listbox");
    for (const option of within(listbox).getAllByRole("option")) {
      await expect(option.className).toBe(
        "flex min-h-11 cursor-default items-center gap-2 rounded-sm px-3 py-2 text-sm outline-none " +
          "data-[focused]:bg-accent data-[focused]:text-accent-foreground " +
          "data-[disabled]:opacity-50",
      );
    }
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(body.queryByRole("listbox")).toBeNull());
  },
};

const combinations = [
  { theme: "light", context: "app" },
  { theme: "light", context: "content" },
  { theme: "dark", context: "app" },
  { theme: "dark", context: "content" },
] as const;

/**
 * All four data-theme x data-context combinations (closed state). The
 * open listbox portals to document.body, so it shows the page's theme.
 */
export const AllContextsAndThemes: Story = {
  decorators: [(Story) => <Story />],
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
          <Select {...args} defaultValue="class">
            <Options />
          </Select>
        </div>
      ))}
    </div>
  ),
};
