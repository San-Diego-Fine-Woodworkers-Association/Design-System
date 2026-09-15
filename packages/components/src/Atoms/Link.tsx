import {
  Link as RACLink,
  type LinkProps as RACLinkProps,
} from "react-aria-components";
import {
  type ButtonVariant,
  buttonBase,
  buttonVariantStyles,
} from "../utils/buttonStyles.js";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps.js";

export type LinkVariant = ButtonVariant | "inline";

export interface LinkProps extends RACLinkProps {
  variant?: LinkVariant;
}

const inlineStyles =
  "text-foreground underline underline-offset-4 data-[hovered]:opacity-80 " +
  "data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring";

/**
 * Thin wrapper over react-aria-components' Link: a real anchor with
 * button-look variants shared with Button (via buttonStyles.js) plus an
 * `inline` text-link variant, default (SDF-52). Router-agnostic — wrap the
 * app tree in react-aria-components' RouterProvider (configured with your
 * router's navigate function) to get client-side navigation for free,
 * without any changes here.
 */
export function Link({ variant = "inline", ...props }: LinkProps) {
  const variantClassName =
    variant === "inline"
      ? inlineStyles
      : `${buttonBase} ${buttonVariantStyles[variant]}`;

  return (
    <RACLink
      {...props}
      className={composeTailwindRenderProps(props.className, variantClassName)}
    />
  );
}
