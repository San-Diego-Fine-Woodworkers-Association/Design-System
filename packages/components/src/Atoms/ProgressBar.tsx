import type { ReactNode } from "react";
import {
  ProgressBar as RACProgressBar,
  type ProgressBarProps as RACProgressBarProps,
} from "react-aria-components";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps.js";
import { Label } from "./Label.js";

export interface ProgressBarProps extends RACProgressBarProps {
  /**
   * Visible label, also used as the bar's accessible name. Without one,
   * pass `aria-label` (or `aria-labelledby`) instead.
   */
  label?: ReactNode;
  /** Show the value text (e.g. "40%") next to the label. Defaults to true. */
  showValueText?: boolean;
}

const base = "flex w-full flex-col gap-1";

/**
 * Thin wrapper over react-aria-components' ProgressBar: role="progressbar"
 * with aria-valuenow/min/max/valuetext from react-aria, styled as a label
 * row plus a track. `isIndeterminate` shows a pulsing partial bar
 * (no pulse under prefers-reduced-motion).
 *
 * Screen readers read the value when they reach the bar; they are not told
 * about every change. Announce meaningful milestones ("Sent") separately.
 */
export function ProgressBar({
  label,
  showValueText = true,
  ...props
}: ProgressBarProps) {
  return (
    <RACProgressBar
      {...props}
      className={composeTailwindRenderProps(props.className, base)}
    >
      {({ percentage, valueText, isIndeterminate }) => (
        <>
          {(label || (showValueText && !isIndeterminate)) && (
            <div className="flex justify-between gap-2 text-sm">
              {label ? <Label>{label}</Label> : <span />}
              {showValueText && !isIndeterminate && (
                <span className="text-muted-foreground tabular-nums">
                  {valueText}
                </span>
              )}
            </div>
          )}
          <div className="h-3 w-full overflow-hidden rounded-full border border-input bg-muted">
            <div
              className={
                isIndeterminate
                  ? "h-full w-1/3 rounded-full bg-primary animate-pulse motion-reduce:animate-none"
                  : "h-full rounded-full bg-primary transition-[width] motion-reduce:transition-none"
              }
              style={isIndeterminate ? undefined : { width: `${percentage}%` }}
            />
          </div>
        </>
      )}
    </RACProgressBar>
  );
}
