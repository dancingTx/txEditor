import { ExtraProps } from "./core";

export type NotifySetting = Pick<ExtraProps, "icon" | "uid"> & {
  kind: string;
};
