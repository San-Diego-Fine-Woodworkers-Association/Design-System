import { createContext, type ReactNode, useContext } from "react";

/**
 * Form field size, named like ButtonSize. `default` is the original
 * look; `large` makes every field's tap target at least 48 px tall (WCAG
 * 2.5.5) with larger text, for audiences who need bigger controls.
 */
export type FieldSize = "default" | "large";

const FieldSizeContext = createContext<FieldSize>("default");

export interface FieldSizeProviderProps {
  size: FieldSize;
  children?: ReactNode;
}

/**
 * Sets the size of every form field below it (Input, TextArea, Select,
 * SelectItem, Checkbox, CheckboxGroup, TextField, FieldGroup, Label,
 * Description, FieldError), every Button, button-look Link and
 * FilePickerButton, and the text of Notification and ProgressBar, so a whole form or app can go large without a `size`
 * on each one. Renders no element. A field's own `size` prop
 * still wins, and a field with `size` passes it on to its parts (e.g.
 * `<TextField size="large">` makes its Label, Input, Description and
 * FieldError large).
 */
export function FieldSizeProvider({ size, children }: FieldSizeProviderProps) {
  return (
    <FieldSizeContext.Provider value={size}>
      {children}
    </FieldSizeContext.Provider>
  );
}

/**
 * The size a field should render at: its own `size` prop if set,
 * otherwise the nearest FieldSizeProvider's (or field's), otherwise
 * `default`. Exported for app-built fields that should follow the same
 * switch.
 */
export function useFieldSize(size?: FieldSize): FieldSize {
  const inherited = useContext(FieldSizeContext);
  return size ?? inherited;
}
