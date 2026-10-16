import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useContext,
} from "react";
import { twMerge } from "tailwind-merge";
import { type FieldSize, useFieldSize } from "../utils/fieldSize.js";

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
  /**
   * `default` (`text-sm`, the original size) or `large` (`text-lg`, a
   * larger icon and a 48 px dismiss button, matching the large form
   * fields). Unset, it follows the nearest FieldSizeProvider or sized
   * field; outside one it is `default`.
   */
  size?: FieldSize;
}

const base = "relative flex flex-col gap-2 rounded-md border p-3 text-sm";

/** Size overrides applied after base, like the form fields'. */
const sizeStyles: Record<FieldSize, string> = {
  default: "",
  large: "gap-3 p-4 text-lg",
};

/**
 * The icon is sized to the text and nudged down so it sits centred on the
 * first line (line heights: `text-sm` 1.25rem, `text-lg` 1.75rem).
 */
const iconSize: Record<FieldSize, string> = {
  default: "size-4",
  large: "size-5",
};
const iconOffset: Record<FieldSize, string> = {
  default: "mt-0.5",
  large: "mt-1",
};

const dismissBase =
  "shrink-0 rounded-md text-muted-foreground hover:bg-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const dismissSize: Record<FieldSize, string> = {
  default: "-mr-1 -mt-1 p-1",
  large: "-my-2 -mr-2 inline-flex size-12 items-center justify-center",
};

/** Body text: full strength (`text-foreground`) at every variant and size. */
const bodyClass = "min-w-0 text-foreground";

/**
 * Set by NotificationRegion: a Notification inside one leaves the live
 * region to it, so the page has one region that is always there and only
 * its content changes.
 */
const InsideLiveRegionContext = createContext(false);

export type NotificationPoliteness = "polite" | "assertive";

export interface NotificationRegionProps extends ComponentProps<"div"> {
  /**
   * `polite` (the default: `role="status"`, read at the next pause) or
   * `assertive` (`role="alert"`, read at once, interrupting). Fixed for the
   * region's life: changing a live region's politeness after it is
   * mounted is not reliably picked up by screen readers.
   */
  politeness?: NotificationPoliteness;
}

/**
 * An always-present live region for Notifications. Mount it with the page
 * (empty), then render a Notification inside it when there is something to
 * say; swap or remove the Notification as things change.
 *
 * Why: a Notification on its own puts `role="status"`/`role="alert"` on
 * the page together with its message. Screen readers announce *changes* to
 * a live region they already know about, and a region inserted with its
 * content already inside is often missed (react-aria's own announcer keeps
 * its regions on the page for this reason, and waits 100 ms after first
 * adding them because Safari/VoiceOver otherwise misses the message).
 * Here the region exists before the message, so adding the Notification is
 * a change to a known region.
 *
 * Notifications inside drop their own `role`/`aria-live` (one live region,
 * not nested ones). The region renders a plain `div` with no styles of its
 * own (empty, it takes no space); pass `className` to lay out several
 * notices. `aria-atomic` is `true` (the whole region is read on a change),
 * so keep one notice in a region, or override it.
 *
 * ```tsx
 * <NotificationRegion>
 *   {offline && <Notification variant="info">You're offline…</Notification>}
 * </NotificationRegion>
 * ```
 */
export function NotificationRegion({
  politeness = "polite",
  children,
  ...props
}: NotificationRegionProps) {
  return (
    <div
      data-slot="notification-region"
      role={politeness === "assertive" ? "alert" : "status"}
      aria-live={politeness}
      aria-atomic="true"
      {...props}
    >
      <InsideLiveRegionContext.Provider value={true}>
        {children}
      </InsideLiveRegionContext.Provider>
    </div>
  );
}

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

function VariantIcon({
  variant,
  className: extra,
}: {
  variant: NotificationVariant;
  className: string;
}) {
  const className = `shrink-0 ${extra} ${iconColor[variant]}`;
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
 * Those roles arrive on the page together with the message, which some
 * screen readers don't announce. For a notice that appears while the page
 * is open (offline, busy, an error after an action), render it inside a
 * NotificationRegion that is mounted first; it then carries no role of its
 * own. A Notification that is on the page from the start (rendered with
 * the page) is found by reading the page, as today.
 *
 * The variant's icon is always drawn: beside the title, or beside the body
 * when there is no title, so status is never colour alone. The body text
 * is full-strength `text-foreground` (the muted grey measured 4.27:1 on the
 * info tint, under 4.5:1).
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
  size,
  children,
  ...props
}: NotificationProps) {
  const resolvedSize = useFieldSize(size);
  const insideRegion = useContext(InsideLiveRegionContext);
  const live = insideRegion
    ? {}
    : ({
        role: variant === "error" ? "alert" : "status",
        "aria-live": variant === "error" ? "assertive" : "polite",
        "aria-atomic": "true",
      } as const);

  const icon = (
    <VariantIcon
      variant={variant}
      className={
        title
          ? iconSize[resolvedSize]
          : `${iconSize[resolvedSize]} ${iconOffset[resolvedSize]}`
      }
    />
  );

  const dismissButton = dismissible && (
    <button
      type="button"
      aria-label="Dismiss notification"
      onClick={onDismiss}
      className={`${dismissBase} ${dismissSize[resolvedSize]}`}
    >
      <svg
        className={iconSize[resolvedSize]}
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
  );

  return (
    <div
      {...props}
      {...live}
      data-slot="notification"
      data-variant={variant}
      data-size={resolvedSize}
      className={twMerge(
        `${base} ${sizeStyles[resolvedSize]}`,
        variantStyles[variant],
        props.className,
      )}
    >
      {title ? (
        <>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-medium">
              {icon}
              {title}
            </div>
            {dismissButton}
          </div>
          {children && (
            <div data-slot="notification-body" className={bodyClass}>
              {children}
            </div>
          )}
        </>
      ) : (
        (children || dismissible) && (
          <div className="flex items-start gap-2">
            {icon}
            <div
              data-slot="notification-body"
              className={`${bodyClass} flex-1`}
            >
              {children}
            </div>
            {dismissButton}
          </div>
        )
      )}
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
