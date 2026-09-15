import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Notification, type NotificationVariant } from "./Notification.js";

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
