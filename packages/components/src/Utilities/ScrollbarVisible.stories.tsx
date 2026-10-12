import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

/**
 * `scrollbar-visible` is a Tailwind utility from `@sdwa/tokens/theme.css`,
 * not a component: add the class to a scroll container to keep its
 * scrollbar on screen instead of an overlay one that hides until you
 * scroll. iOS Safari ignores it, so keep a non-scrollbar cue too (the
 * "Scroll to see all" line here). See the `@sdwa/tokens` README.
 */
const meta: Meta = {};

export default meta;
type Story = StoryObj;

/** The utility sets this width (and height) on ::-webkit-scrollbar. */
const SCROLLBAR_PX = 16;

const photos = Array.from({ length: 24 }, (_, i) => `Photo ${i + 1}`);

/** A stand-in for the upload page's gallery: a grid in a capped-height box. */
function Gallery({
  className = "",
  label,
}: {
  className?: string;
  label: string;
}) {
  return (
    <section style={{ width: 300 }}>
      <h3 style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{label}</h3>
      <p
        className="text-muted-foreground"
        style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}
      >
        {photos.length} photos. Scroll to see all.
      </p>
      <ul
        aria-label={label}
        className={`overflow-y-auto ${className}`}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0.5rem",
          maxHeight: 240,
        }}
      >
        {photos.map((photo) => (
          <li
            key={photo}
            className="bg-accent text-accent-foreground rounded-md"
            style={{
              aspectRatio: "1",
              display: "grid",
              placeItems: "center",
              fontSize: "0.75rem",
            }}
          >
            {photo}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Chromium/WebKit take ::-webkit-scrollbar; Firefox takes scrollbar-color. */
function supportsWebkitScrollbar() {
  return CSS.supports("selector(::-webkit-scrollbar)");
}

/**
 * Left: the browser default (an overlay scrollbar on macOS, phones and
 * some Linux desktops). Right: with `scrollbar-visible`, the scrollbar
 * stays on screen.
 */
export const WithAndWithout: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
      <Gallery label="Default" />
      <Gallery label="With scrollbar-visible" className="scrollbar-visible" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const box = canvas.getByRole("list", { name: "With scrollbar-visible" });
    await expect(box.scrollHeight).toBeGreaterThan(box.clientHeight);
    if (supportsWebkitScrollbar()) {
      // The explicit ::-webkit-scrollbar width takes up layout space: a
      // permanent scrollbar, not an overlay one (which takes none).
      await expect(box.offsetWidth - box.clientWidth).toBe(SCROLLBAR_PX);
      // Chromium 121+ drops ::-webkit-scrollbar if these aren't `auto`.
      await expect(getComputedStyle(box).scrollbarWidth).toBe("auto");
      await expect(getComputedStyle(box).scrollbarColor).toBe("auto");
    } else {
      await expect(getComputedStyle(box).scrollbarColor).not.toBe("auto");
    }
  },
};

/** One class covers both axes: a sideways strip gets a permanent bar too. */
export const Horizontal: Story = {
  render: () => (
    <ul
      aria-label="Horizontal strip"
      className="overflow-x-auto scrollbar-visible"
      style={{ display: "flex", gap: "0.5rem", width: 300 }}
    >
      {photos.map((photo) => (
        <li
          key={photo}
          className="bg-accent text-accent-foreground rounded-md"
          style={{
            flex: "0 0 80px",
            height: 80,
            display: "grid",
            placeItems: "center",
            fontSize: "0.75rem",
          }}
        >
          {photo}
        </li>
      ))}
    </ul>
  ),
  play: async ({ canvasElement }) => {
    const strip = within(canvasElement).getByRole("list", {
      name: "Horizontal strip",
    });
    await expect(strip.scrollWidth).toBeGreaterThan(strip.clientWidth);
    if (supportsWebkitScrollbar()) {
      await expect(strip.offsetHeight - strip.clientHeight).toBe(SCROLLBAR_PX);
    }
  },
};

/** Light and dark side by side: the thumb is --muted-foreground on --muted. */
export const LightAndDark: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {(["light", "dark"] as const).map((theme) => (
        <div
          key={theme}
          data-theme={theme}
          style={{
            padding: "1rem",
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        >
          <Gallery label={`${theme} theme`} className="scrollbar-visible" />
        </div>
      ))}
    </div>
  ),
};
