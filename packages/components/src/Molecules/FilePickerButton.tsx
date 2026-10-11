import {
  FileTrigger as RACFileTrigger,
  type FileTriggerProps as RACFileTriggerProps,
} from "react-aria-components";
import { Button, type ButtonProps } from "../Atoms/Button.js";

export interface FilePickerButtonProps
  extends Omit<ButtonProps, "onPress">,
    Pick<
      RACFileTriggerProps,
      | "acceptedFileTypes"
      | "allowsMultiple"
      | "defaultCamera"
      | "acceptDirectory"
    > {
  /** Called with the chosen files, or `null` if the picker was cancelled. */
  onSelect?: RACFileTriggerProps["onSelect"];
}

/**
 * A Button that opens the device's file picker: react-aria-components'
 * FileTrigger composed with our Button. FileTrigger renders a hidden
 * `<input type="file">` and forwards the Button's press to it, so keyboard,
 * screen reader and touch behaviour are the Button's own. On phones the
 * picker is the system one (photo library, camera, files).
 *
 * `acceptedFileTypes` takes MIME types or extensions (e.g. `"image/*"`,
 * `".heic"`) and only filters what the picker offers; validate the chosen
 * files yourself.
 */
export function FilePickerButton({
  acceptedFileTypes,
  allowsMultiple,
  defaultCamera,
  acceptDirectory,
  onSelect,
  ...buttonProps
}: FilePickerButtonProps) {
  return (
    <RACFileTrigger
      acceptedFileTypes={acceptedFileTypes}
      allowsMultiple={allowsMultiple}
      defaultCamera={defaultCamera}
      acceptDirectory={acceptDirectory}
      onSelect={onSelect}
    >
      <Button {...buttonProps} />
    </RACFileTrigger>
  );
}
