import type { ExtraProps } from "./core";

export type SettingProps = ExtraProps & {
  command: Setting;
  commandOptions?: CommandOptions[];
};
