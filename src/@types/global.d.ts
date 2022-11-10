import type { CSSProperties } from "vue";
import type { Setting } from "./var";
import type { GlobalCommandGroup } from "./command";

export type ContextMenuType =
  | "global:settings"
  | "menu:workspace"
  | "workspace:tree"
  | "workspace:node"
  | "canvas:item";

export interface GlobalState {
  showCommand: boolean;
  command: Setting;
  commandOptions: GlobalCommandGroup[];
}

export type Pos = Pick<CSSProperties, "left" | "right" | "top" | "bottom">;

export interface ContextMenuState {
  showPanel: boolean;
  uid: string | number;
  panelWidth: number;
  panelHeight: number;
  kind: ContextMenuType;
  orientation: Orientation;
  location: Pos;
}
