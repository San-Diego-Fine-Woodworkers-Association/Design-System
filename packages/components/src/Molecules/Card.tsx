import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Plain Tailwind-styled container (SDF-39): react-aria-components has no
 * Card primitive, so there's nothing to wrap here, unlike Button/TextField.
 */
export function Card({ className, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={twMerge(
        "rounded-md border border-border bg-card text-card-foreground",
        className,
      )}
    />
  );
}

/**
 * Padded content region inside a Card (SDF-39), matching the shadcn
 * Card/CardContent split this replaces.
 */
export function CardContent({ className, ...props }: CardContentProps) {
  return <div {...props} className={twMerge("p-6", className)} />;
}
