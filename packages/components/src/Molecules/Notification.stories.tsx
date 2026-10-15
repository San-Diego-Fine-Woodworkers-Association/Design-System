import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Button } from "../Atoms/Button.js";
import { FieldSizeProvider } from "../utils/fieldSize.js";
import {
  Notification,
  NotificationRegion,
  type NotificationVariant,
} from "./Notification.js";

const meta: Meta<typeof Notification> = {
  component: Notification,
  args: {
    variant: "error",
    title: "Couldn't sign you in. Check your details.",
    dismissible: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "error",
        "success",
        "info",
        "warning",
      ] satisfies NotificationVariant[],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Notification>;

/** Uses the Theme/Context toolbar controls (set up in SDF-23). */
export const Playground: Story = {};

/**
 * Mirrors `apps/auth/components/login-form.tsx`'s real usage: an error
 * notification shown after a failed login attempt, with a dismiss button
 * and follow-up help copy. `role="alert"` + `aria-live="assertive"` means
 * screen readers announce it immediately.
 */
export const ErrorVariant: Story = {
  args: {
    variant: "error",
    title: "Couldn't sign you in. Check your details.",
    dismissible: true,
    children: (
      <p>
        Still stuck? Email{" "}
        <a
          href="mailto:digital-services@sdfwa.org"
          className="font-medium underline underline-offset-4"
        >
          digital-services@sdfwa.org
        </a>{" "}
        for help.
      </p>
    ),
  },
};

/**
 * `role="status"` + `aria-live="polite"` means screen readers announce this
 * at the next opportunity instead of interrupting.
 */
export const Success: Story = {
  args: {
    variant: "success",
    title: "Signed in successfully.",
    dismissible: false,
    children: undefined,
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Check your email",
    dismissible: false,
    children: (
      <p>We sent a confirmation link — click it to finish signing in.</p>
    ),
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "That link expires in 5 minutes.",
    dismissible: true,
  },
};

/** Without a title: just message content in the live region. */
export const MessageOnly: Story = {
  args: {
    variant: "error",
    title: undefined,
    children: <p>Network error. Please try again.</p>,
  },
};

/**
 * Dismiss is wired to component state here to demonstrate the
 * onDismiss/dismissible contract end to end (matches login-form.tsx's
 * `onDismiss={() => setError(null)}` pattern).
 */
export const Dismissible: Story = {
  render: (args) => {
    function DismissibleDemo() {
      const [visible, setVisible] = useState(true);
      if (!visible) {
        return (
          <button
            type="button"
            className="text-sm underline"
            onClick={() => setVisible(true)}
          >
            Show notification again
          </button>
        );
      }
      return (
        <Notification
          {...args}
          dismissible
          onDismiss={() => setVisible(false)}
        />
      );
    }
    return <DismissibleDemo />;
  },
  args: {
    variant: "error",
    title: "Couldn't sign you in. Check your details.",
  },
};

const variants: NotificationVariant[] = ["error", "success", "info", "warning"];

/**
 * WCAG contrast of `text` drawn on `el`'s background, with a translucent
 * tint composited over the nearest opaque ancestor background, as the
 * browser draws it. Colours are resolved through a canvas, so oklch/oklab
 * and color-mix() values from the tokens work.
 */
function contrastOn(el: Element, text: Element): number {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("no 2d canvas");
  const layers: string[] = [];
  for (let node: Element | null = el; node; node = node.parentElement) {
    const bg = getComputedStyle(node).backgroundColor;
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1, 1);
    const alpha = ctx.getImageData(0, 0, 1, 1).data[3];
    if (alpha === 0) continue;
    layers.unshift(bg);
    if (alpha === 255) break;
  }
  const draw = (colors: string[]) => {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 1, 1);
    for (const c of colors) {
      ctx.fillStyle = c;
      ctx.fillRect(0, 0, 1, 1);
    }
    const [r = 0, g = 0, b = 0] = ctx.getImageData(0, 0, 1, 1).data;
    const lin = (v: number) => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  };
  const bg = draw(layers);
  const fg = draw([...layers, getComputedStyle(text).color]);
  return (Math.max(bg, fg) + 0.05) / (Math.min(bg, fg) + 0.05);
}

const themes = ["light", "dark"] as const;

/**
 * Body text is full-strength `text-foreground` (it was the muted grey,
 * 4.27:1 on the info tint). Checks the class, and the contrast as drawn
 * for every variant in both themes, with and without a title.
 */
export const BodyTextContrast: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem" }}>
      {themes.map((theme) => (
        <div
          key={theme}
          data-theme={theme}
          style={{
            display: "grid",
            gap: "0.5rem",
            padding: "1rem",
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        >
          {variants.map((variant) => (
            <div key={variant} style={{ display: "grid", gap: "0.5rem" }}>
              <Notification variant={variant} title={`${variant} (${theme})`}>
                <p>Body text under a title.</p>
              </Notification>
              <Notification variant={variant}>
                <p>Body text without a title ({theme}).</p>
              </Notification>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const notices = canvasElement.querySelectorAll(
      '[data-slot="notification"]',
    );
    await expect(notices).toHaveLength(16);
    for (const notice of notices) {
      const body = notice.querySelector('[data-slot="notification-body"]');
      await expect(body).not.toBeNull();
      if (!body) continue;
      await expect(body).toHaveClass("text-foreground");
      await expect(body).not.toHaveClass("text-muted-foreground");
      const ratio = contrastOn(notice, body);
      if (ratio < 4.5) {
        throw new Error(
          `${notice.getAttribute("data-variant")} body contrast ${ratio.toFixed(2)}:1 < 4.5:1`,
        );
      }
    }
  },
};

/**
 * Without a title, the variant's icon is drawn at the start of the body,
 * so status is an icon and words, never a tint alone.
 */
export const IconWithoutTitle: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "0.5rem" }}>
      {variants.map((variant) => (
        <Notification key={variant} variant={variant}>
          <p>A {variant} message with no title.</p>
        </Notification>
      ))}
      <Notification variant="info" dismissible>
        <p>Dismissible, no title.</p>
      </Notification>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const notices = canvasElement.querySelectorAll(
      '[data-slot="notification"]',
    );
    await expect(notices).toHaveLength(5);
    for (const notice of notices) {
      const icon = notice.querySelector('svg[aria-hidden="true"]');
      await expect(icon).not.toBeNull();
      if (!icon) continue;
      const body = notice.querySelector('[data-slot="notification-body"]');
      // The icon comes before the body, on the same row.
      await expect(icon.nextElementSibling).toBe(body);
      const iconBox = icon.getBoundingClientRect();
      await expect(iconBox.width).toBeGreaterThan(0);
      const bodyBox = body?.getBoundingClientRect();
      await expect(iconBox.right).toBeLessThanOrEqual(bodyBox?.left ?? 0);
      await expect(iconBox.top).toBeLessThan(bodyBox?.bottom ?? 0);
    }
  },
};

/**
 * The robust pattern for a notice that appears while the page is open:
 * the NotificationRegion (the live region) is on the page from the start,
 * empty; the Notification is added inside it later, and then changed.
 * The Notification inside carries no role of its own.
 */
export const InRegion: Story = {
  render: () => {
    function Demo() {
      const [state, setState] = useState<"none" | "offline" | "busy">("none");
      return (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Button variant="secondary" onPress={() => setState("offline")}>
              Go offline
            </Button>
            <Button variant="secondary" onPress={() => setState("busy")}>
              Server busy
            </Button>
            <Button variant="secondary" onPress={() => setState("none")}>
              Clear
            </Button>
          </div>
          <NotificationRegion data-testid="region">
            {state === "offline" && (
              <Notification variant="info">
                <p>You're offline. We'll send when you're back.</p>
              </Notification>
            )}
            {state === "busy" && (
              <Notification variant="warning">
                <p>We're busy right now. We'll keep trying.</p>
              </Notification>
            )}
          </NotificationRegion>
        </div>
      );
    }
    return <Demo />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const region = canvas.getByTestId("region");
    // Present before there is anything to say, and empty.
    await expect(region).toHaveAttribute("role", "status");
    await expect(region).toHaveAttribute("aria-live", "polite");
    await expect(region).toHaveAttribute("aria-atomic", "true");
    await expect(region).toBeEmptyDOMElement();
    await expect(canvas.getAllByRole("status")).toEqual([region]);

    await userEvent.click(canvas.getByRole("button", { name: "Go offline" }));
    await waitFor(() => expect(region).toHaveTextContent("You're offline"));
    // Same region element, now filled; the one live region on the page.
    await expect(canvas.getByTestId("region")).toBe(region);
    await expect(canvas.getAllByRole("status")).toEqual([region]);
    const notice = region.querySelector('[data-slot="notification"]');
    await expect(notice).not.toHaveAttribute("role");
    await expect(notice).not.toHaveAttribute("aria-live");

    await userEvent.click(canvas.getByRole("button", { name: "Server busy" }));
    await waitFor(() => expect(region).toHaveTextContent("We're busy"));
    await expect(region).not.toHaveTextContent("You're offline");
    await expect(canvas.getByTestId("region")).toBe(region);

    await userEvent.click(canvas.getByRole("button", { name: "Clear" }));
    await waitFor(() => expect(region).toBeEmptyDOMElement());
    await expect(canvas.getByTestId("region")).toBe(region);
  },
};

/** `politeness="assertive"`: `role="alert"`, for errors that must interrupt. */
export const InAssertiveRegion: Story = {
  render: () => (
    <NotificationRegion politeness="assertive" data-testid="region">
      <Notification variant="error" title="Couldn't save this one">
        <p>Try again, or remove it.</p>
      </Notification>
    </NotificationRegion>
  ),
  play: async ({ canvasElement }) => {
    const region = within(canvasElement).getByTestId("region");
    await expect(region).toHaveAttribute("role", "alert");
    await expect(region).toHaveAttribute("aria-live", "assertive");
    await expect(within(canvasElement).getAllByRole("alert")).toEqual([region]);
  },
};

/** A Notification on its own keeps its own live region, as before. */
export const StandaloneKeepsItsRole: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "0.5rem" }}>
      <Notification variant="error">Error</Notification>
      <Notification variant="info">Info</Notification>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole("alert");
    await expect(alert).toHaveAttribute("aria-live", "assertive");
    await expect(alert).toHaveAttribute("aria-atomic", "true");
    const status = canvas.getByRole("status");
    await expect(status).toHaveAttribute("aria-live", "polite");
  },
};

/**
 * Follows FieldSizeProvider: `text-lg`, a larger icon and a 48 px dismiss
 * button at `large`. Its own `size="default"` opts out.
 */
export const Large: Story = {
  render: () => (
    <FieldSizeProvider size="large">
      <div style={{ display: "grid", gap: "0.5rem" }}>
        <Notification variant="info" dismissible data-testid="untitled">
          <p>You're offline. We'll send when you're back.</p>
        </Notification>
        <Notification
          variant="warning"
          title="Most of your photos are in"
          dismissible
          data-testid="titled"
        >
          <p>Two couldn't be saved.</p>
        </Notification>
        <Notification variant="info" size="default" data-testid="opt-out">
          <p>Default size inside a large provider.</p>
        </Notification>
      </div>
    </FieldSizeProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rem = Number.parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    for (const id of ["untitled", "titled"]) {
      const notice = canvas.getByTestId(id);
      await expect(notice).toHaveAttribute("data-size", "large");
      const body = notice.querySelector('[data-slot="notification-body"]');
      if (!body) throw new Error("no body");
      await expect(Number.parseFloat(getComputedStyle(body).fontSize)).toBe(
        1.125 * rem,
      );
      const icon = notice.querySelector("svg");
      await expect(icon?.getBoundingClientRect().width).toBe(1.25 * rem);
      const dismiss = within(notice).getByRole("button", {
        name: "Dismiss notification",
      });
      const box = dismiss.getBoundingClientRect();
      await expect(box.width).toBeGreaterThanOrEqual(48);
      await expect(box.height).toBeGreaterThanOrEqual(48);
    }
    const optOut = canvas.getByTestId("opt-out");
    await expect(optOut).toHaveAttribute("data-size", "default");
    await expect(Number.parseFloat(getComputedStyle(optOut).fontSize)).toBe(
      0.875 * rem,
    );
  },
};

/** Outside a provider, the root's classes are what they were. */
export const DefaultSizeUnchanged: Story = {
  args: { variant: "info", title: "Check your email", children: "Body" },
  play: async ({ canvasElement }) => {
    const notice = canvasElement.querySelector('[data-slot="notification"]');
    await expect(notice).toHaveAttribute("data-size", "default");
    await expect(notice?.className).toBe(
      "relative flex flex-col gap-2 rounded-md border p-3 text-sm border-info/40 bg-info/15 text-foreground",
    );
  },
};
