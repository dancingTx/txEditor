import type { CSSProperties } from "vue";
import type { ContextMenuType } from "./global";
import type { NodeDirOpProps } from "./node";
import type { SettingProps } from "./setting";
import type { CanvasItemProps } from "./canvas";

export type PanelMap = Record<
  ContextMenuType,
  (NodeDirOpProps | SettingProps | CanvasItemProps)[]
>;

export type PickCssProperties = Pick<
  CSSProperties,
  "width" | "height" | "top" | "bottom" | "left" | "right" | "transformOrigin"
>;
