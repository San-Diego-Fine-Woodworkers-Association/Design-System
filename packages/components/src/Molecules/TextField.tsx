import {
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps,
} from "react-aria-components";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps.js";
import {
  type FieldSize,
  FieldSizeProvider,
  useFieldSize,
} from "../utils/fieldSize.js";

export interface TextFieldProps extends RACTextFieldProps {
  /**
   * `default` or `large`. TextField itself only lays out its parts; the
   * size is passed on to the Label, Input/TextArea, Description and
   * FieldError inside, unless one sets its own. Unset, it follows the
   * nearest FieldSizeProvider.
   */
  size?: FieldSize;
}

/**
 * Thin wrapper over react-aria-components' TextField (SDF-17): just the
 * layout container. Label, Input, Description, FieldError are separate
 * composable parts (not TextField-internal, per the research) — see
 * Label.tsx, Input.tsx, Description.tsx, FieldError.tsx.
 */
export function TextField({ size, ...props }: TextFieldProps) {
  return (
    <FieldSizeProvider size={useFieldSize(size)}>
      <RACTextField
        {...props}
        className={composeTailwindRenderProps(
          props.className,
          "flex flex-col gap-1",
        )}
      />
    </FieldSizeProvider>
  );
}
