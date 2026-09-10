import {
  Form as RACForm,
  type FormProps as RACFormProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export interface FormProps extends RACFormProps {}

/**
 * Thin wrapper over react-aria-components' Form (SDF-17): just a `<form>`
 * with default layout spacing. Plain string className (no interactive
 * render states), same situation as Dialog/Label — merged with
 * tailwind-merge directly. Composes with TextField and its parts; no
 * validation/labels/errors baked in here.
 */
export function Form(props: FormProps) {
  return (
    <RACForm
      {...props}
      className={twMerge("flex flex-col gap-4", props.className)}
    />
  );
}
