import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { FilePickerButton } from "../Molecules/FilePickerButton.js";
import { TextField } from "../Molecules/TextField.js";
import { FieldSizeProvider } from "../utils/fieldSize.js";
import { Button, type ButtonSize, type ButtonVariant } from "./Button.js";
import { Input } from "./Input.js";
import { Label } from "./Label.js";
import { Link } from "./Link.js";

/** The root font size in px; `min-h-12` is 3rem (48 px at a 16 px root). */
function remOf(element: Element) {
  return Number.parseFloat(
    getComputedStyle(element.ownerDocument.documentElement).fontSize,
  );
}

const defaultPrimaryClassName =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium " +
  "transition-colors data-[hovered]:opacity-90 data-[pressed]:opacity-80 " +
  "data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring " +
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 " +
  "bg-primary text-primary-foreground";

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    children: "Button",
    variant: "primary",
    size: "default",
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["default", "large"] satisfies ButtonSize[],
    },
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "destructive",
        "quiet",
      ] satisfies ButtonVariant[],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/** Uses the Theme/Context toolbar controls (set up in SDF-23). */
export const Playground: Story = {};

/**
 * `size="large"`: exactly 48 px tall (the same as a large Input) with
 * `text-lg`, for audiences that need bigger touch targets. The default
 * size is unchanged.
 */
export const Large: Story = {
  args: { size: "large", children: "Choose photos and videos" },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button.getBoundingClientRect().height).toBe(3 * remOf(button));
  },
};

/** No `size` and no FieldSizeProvider: the original classes, unchanged. */
export const DefaultSizeUnchanged: Story = {
  args: { size: undefined },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("button").className).toBe(
      defaultPrimaryClassName,
    );
  },
};

/**
 * Inside `FieldSizeProvider size="large"` a Button with no `size` is
 * large, and so are button-look Links and FilePickerButtons; inline Links
 * are unaffected. `size="default"` opts a button out, and a button's own
 * `size` wins over a default provider.
 */
export const FollowsFieldSizeProvider: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
      <FieldSizeProvider size="large">
        <Button>Inherits large</Button>
        <Button size="default">Opts out</Button>
        <Link href="#renew" variant="primary">
          Large link
        </Link>
        <Link href="#help">Inline link</Link>
        <FilePickerButton>Large file picker</FilePickerButton>
      </FieldSizeProvider>
      <FieldSizeProvider size="default">
        <Button size="large">Own size wins</Button>
      </FieldSizeProvider>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rem = remOf(canvasElement);
    for (const element of [
      canvas.getByRole("button", { name: "Inherits large" }),
      canvas.getByRole("link", { name: "Large link" }),
      canvas.getByRole("button", { name: "Large file picker" }),
      canvas.getByRole("button", { name: "Own size wins" }),
    ]) {
      await expect(element).toHaveClass("min-h-12", "text-lg");
      await expect(element.getBoundingClientRect().height).toBe(3 * rem);
    }
    await expect(
      canvas.getByRole("button", { name: "Opts out" }).className,
    ).toBe(defaultPrimaryClassName);
    await expect(canvas.getByRole("link", { name: "Inline link" })).toHaveClass(
      "underline",
    );
    await expect(
      canvas.getByRole("link", { name: "Inline link" }),
    ).not.toHaveClass("min-h-12");
  },
};

/**
 * A large Input and a large Button side by side are the same height
 * (48 px at a 16 px root, 54 px at 18 px).
 */
export const MatchesLargeInput: Story = {
  render: () => (
    <FieldSizeProvider size="large">
      <div style={{ display: "flex", alignItems: "end", gap: "0.5rem" }}>
        <TextField name="code">
          <Label>Member ID</Label>
          <Input />
        </TextField>
        <Button>Look up</Button>
      </div>
    </FieldSizeProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Member ID" });
    const button = canvas.getByRole("button", { name: "Look up" });
    const height = 3 * remOf(input);
    await expect(input.getBoundingClientRect().height).toBe(height);
    await expect(button.getBoundingClientRect().height).toBe(height);
  },
};

/** Both sizes side by side, in every variant. */
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
      {(["default", "large"] as const).map((size) => (
        <div key={size} style={{ display: "flex", gap: "0.5rem" }}>
          {(["primary", "secondary", "destructive", "quiet"] as const).map(
            (variant) => (
              <Button {...args} key={variant} size={size} variant={variant}>
                {variant} ({size})
              </Button>
            ),
          )}
        </div>
      ))}
    </div>
  ),
};

const combinations = [
  { theme: "light", context: "app" },
  { theme: "light", context: "content" },
  { theme: "dark", context: "app" },
  { theme: "dark", context: "content" },
] as const;

/**
 * All four data-theme x data-context combinations rendered at once,
 * independent of the toolbar globals — per this ticket's requirement.
 */
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
          <Button {...args} />
        </div>
      ))}
    </div>
  ),
};
