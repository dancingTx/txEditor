import type { Component, CSSProperties } from "vue";
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
} from "./var";

export interface CommonProps {
  uid: string;
}
/**
 *
 * 插件相关的属性 impl
 */
export interface PluginProps extends CommonProps {
  icon: string;
  label?: string;
  i18n?: string;
  path?: string;
  namespace?: Namespace;
  menuComp?: Component;
}

/**
 *  所有属性特性 impl
 */
export interface SourceProps extends CommonProps {
  icon?: string;
  label: string;
  subTitle?: string;
  enLabel?: string;
  enSubTitle?: string;
  i18n?: string;
}

export type Namespace = keyof typeof NamespaceVars;
/**
 * 文件所属状态 impl
 */
export type NodeStatus = keyof typeof NodeStatusVars;

/**
 * 文件所属特性 impl
 */
export type NodeProps = SourceProps & { kind: NodeStatus };

/**
 * 屏幕尺寸 impl
 */

export type ScreenProps = SourceProps & {
  gte?: number;
  lt?: number;
};

export type Theme = keyof typeof ThemeVars;
export type I18n = keyof typeof I18nVars;

export type GlobalCommandOption = Theme | I18n;
export type Setting = keyof typeof SettingVars;
export type NodeDirOp = keyof typeof NodeVars;
export type NodeDirOpProps = SourceProps & { command: NodeDirOp };
export type CanvasItem = keyof typeof CanvasItemVars;
export type CanvasItemProps = SourceProps & { command: CanvasItem };
export interface CommandGroupItem extends CommonProps {
  kind: GlobalCommandOption;
  label: string;
  icon?: string;
  color?: string;
  i18n?: string;
}

export interface CommandOptions extends CommonProps {
  group: string;
  i18n?: string;
  children: CommandGroupItem[];
}

export type SettingProps = SourceProps & {
  command: Setting;
  commandOptions?: CommandOptions[];
};

export type CanvasCommand = keyof typeof CanvasCommandVars;
export type SpecialCanvasCommand = "Preview" | "Gird";
export type NormalCanvasCommand = Exclude<CanvasCommand, SpecialCanvasCommand>;

export type CanvasCommandProps = SourceProps & { command: CanvasCommand };

export type Widget = keyof typeof WidgetVars;

export type WidgetProps = SourceProps & { command: Widget };

type Tag = keyof typeof TagVars;

export interface ComponentAttrs {}
export interface ComponentProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
}
export interface ComponentEvents {}
export interface ComponentAnimation {}
export type ComponentInfo<T> = T extends string
  ? string
  : T & {
      tag: Tag;
      attributes?: ComponentAttrs;
      props?: ComponentProps;
      events?: ComponentEvents;
      animates?: ComponentAnimation[];
      value?: string;
      children?: ComponentInfo<T>[];
      component?: Component;
      elId?: string;
    };
