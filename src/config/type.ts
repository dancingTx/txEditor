import type { Component } from "vue";
import type {
  FileStatusVars,
  CanvasCommandVars,
  TagVars,
  SettingVars,
  ThemeVars,
  I18nVars,
  WidgetVars,
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
  componentName: string;
  component: Component;
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
}

/**
 * 文件所属状态 impl
 */
type FileStatus = keyof typeof FileStatusVars;

/**
 * 文件所属特性 impl
 */
export type FileProps = SourceProps & { kind: FileStatus };

/**
 * 屏幕尺寸 impl
 */

export type ScreenProps = SourceProps & {
  gte?: number;
  lt?: number;
};

type Theme = keyof typeof ThemeVars;
type I18n = keyof typeof I18nVars;

export type CommandOption = Theme | I18n;
export type Setting = keyof typeof SettingVars;

export interface CommandOptions extends CommonProps {
  group: string;
  children?: {
    kind: CommandOption;
    label: string;
    icon?: string;
    color?: string;
  }[];
}

export type SettingProps = SourceProps & {
  command: Setting;
  commandOptions?: CommandOptions[];
};

export type CanvasCommand = keyof typeof CanvasCommandVars;

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
