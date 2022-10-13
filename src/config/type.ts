import type { Component } from "vue";
import type {
  FileStatusVars,
  CommandVars,
  TagVars,
  SettingVars,
  DarkModeVars,
  ThemeVars,
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

export type Setting = keyof typeof SettingVars;

export type SettingProps = SourceProps & { command: Setting };

export type Command = keyof typeof CommandVars;

export type CommandProps = SourceProps & { command: Command };

type DarkMode = keyof typeof DarkModeVars;
type Theme = keyof typeof ThemeVars;

type CommandOptions = DarkMode | Theme;

export interface CommandInfo extends CommonProps {
  command: Command | Setting;
  commandOptions?: CommandOptions[];
}

type Tag = keyof typeof TagVars;

export type ComponentProps = SourceProps & {
  tag: Tag;
  attributes?: object;
  props?: object;
  events?: () => {} | [];
  children?: [];
};
