import type { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type NotificationVariant = "error" | "success" | "info" | "warning";

export interface NotificationProps
  extends Omit<ComponentProps<"div">, "title"> {
  /** Determines icon, color, and the ARIA role/live-region politeness used. */
  variant?: NotificationVariant;
  /** Heading shown on the same row as the dismiss button. */
  title?: ReactNode;
  /** Body content, e.g. the status/error message and any follow-up copy. */
  children?: ReactNode;
  /** Show the dismiss button. Defaults to false (not dismissible). */
  dismissible?: boolean;
  /** Called when the user activates the dismiss button. */
  onDismiss?: () => void;
  /** Optional action buttons rendered below the message. */
  actions?: ReactNode;
}

const base = "relative flex flex-col gap-2 rounded-md border p-3 text-sm";

const variantStyles: Record<NotificationVariant, string> = {
  error: "border-destructive/30 bg-destructive/10 text-foreground",
  success: "border-success/40 bg-success/15 text-foreground",
  info: "border-info/40 bg-info/15 text-foreground",
  warning: "border-warning/40 bg-warning/15 text-foreground",
};

const iconColor: Record<NotificationVariant, string> = {
  error: "text-destructive",
  success: "text-success",
  info: "text-info",
  warning: "text-warning",
};

function VariantIcon({ variant }: { variant: NotificationVariant }) {
  const className = `size-4 shrink-0 ${iconColor[variant]}`;
  switch (variant) {
    case "error":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      );
    case "success":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    case "warning":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    default:
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
  }
}

/**
 * Hand-rolled status/error banner (SDF-43), not built on
 * react-aria-components' UNSTABLE_Toast/UNSTABLE_ToastRegion per
 * docs/research/react-aria-toast-stability.md: those primitives have been
 * alpha (`UNSTABLE_`-prefixed) for ~19 months with a missed stabilization
 * target and no new commitment, which is too much unbounded-duration risk
 * for a published package to depend on.
 *
 * A11y is wired by hand instead: `role="alert"` + `aria-live="assertive"`
 * for the error variant (announced immediately, interrupting), and
 * `role="status"` + `aria-live="polite"` for success/info/warning (announced
 * at the next opportunity, non-interrupting) — matching the WAI-ARIA APG
 * live region guidance react-aria's own Toast would otherwise provide.
 *
 * API mirrors @sdfwa/ui's Notification (title/children/dismissible/
 * onDismiss/actions), which is what `apps/auth/components/login-form.tsx`
 * uses to show a status message after a failed login attempt — functional/
 * behavioral/a11y parity, not pixel parity (ADR 0001).
 */
export function Notification({
  variant = "error",
  title,
  dismissible = false,
  onDismiss,
  actions,
  children,
  ...props
}: NotificationProps) {
  const role = variant === "error" ? "alert" : "status";
  const ariaLive = variant === "error" ? "assertive" : "polite";

  return (
    <div
      {...props}
      data-slot="notification"
      data-variant={variant}
      role={role}
      aria-live={ariaLive}
      aria-atomic="true"
      className={twMerge(base, variantStyles[variant], props.className)}
    >
      {(title || dismissible) && (
        <div className="flex items-center justify-between gap-2">
          {title ? (
            <div className="flex items-center gap-2 font-medium">
              <VariantIcon variant={variant} />
              {title}
            </div>
          ) : (
            <span />
          )}
          {dismissible && (
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={onDismiss}
              className="-mr-1 -mt-1 shrink-0 rounded-md p-1 text-muted-foreground hover:bg-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      )}
      {children && <div className="text-muted-foreground">{children}</div>}
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
