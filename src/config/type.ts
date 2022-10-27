import type { Component } from "vue";
import type {
  NodeStatusVars,
  CanvasCommandVars,
  TagVars,
  SettingVars,
  ThemeVars,
  I18nVars,
  WidgetVars,
  NodeVars,
} from "./var";

interface CommonProps {
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

export type CanvasCommandProps = SourceProps & { command: CanvasCommand };

export type Widget = keyof typeof WidgetVars;

export type WidgetProps = SourceProps & { command: Widget };

type Tag = keyof typeof TagVars;

export type ComponentProps = SourceProps & {
  tag: Tag;
  attributes?: object;
  props?: object;
  events?: () => {} | [];
  children?: [];
};
