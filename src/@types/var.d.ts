import type {
  NodeStatusVars,
  CanvasCommandVars,
  TagVars,
  SettingVars,
  ThemeVars,
  I18nVars,
  WidgetVars,
  NodeVars,
  NamespaceVars,
  CanvasItemVars,
} from "@/config/var";

export type NodeStatus = keyof typeof NodeStatusVars;

export type CanvasCommand = keyof typeof CanvasCommandVars;

export type Tag = keyof typeof TagVars;

export type Setting = keyof typeof SettingVars;

export type Theme = keyof typeof ThemeVars;

export type I18n = keyof typeof I18nVars;

export type Widget = keyof typeof WidgetVars;

export type NodeDirOp = keyof typeof NodeVars;

export type Namespace = keyof typeof NamespaceVars;

export type CanvasItem = keyof typeof CanvasItemVars;
