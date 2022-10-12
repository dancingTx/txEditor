import { makeUUID } from "@/shared/variables";
import { defineAsyncComponent, type Component } from "vue";

export const __MENU_WIDTH__ = 240;
export const __ASIDE_WIDTH__ = 48;
export const __CANVAS_WIDTH__ = 800;
export const __PANEL_WIDTH__ = 180;

export interface PluginProps {
  uid: string;
  icon: string;
  componentName: string;
  component: Component;
  label?: string;
}
export const pluginList: PluginProps[] = [
  {
    uid: makeUUID(),
    icon: "edit",
    label: "资源管理器",
    componentName: "sourceManage",
    component: defineAsyncComponent(
      () => import("@/packages/sourceManage/menu")
    ),
  },
  {
    uid: makeUUID(),
    icon: "code",
    label: "低代码平台",
    componentName: "lowCode",
    component: defineAsyncComponent(() => import("@/packages/lowCode/menu")),
  },
  {
    uid: makeUUID(),
    icon: "flow",
    label: "流程设计器",
    componentName: "flowProcess",
    component: defineAsyncComponent(
      () => import("@/packages/flowProcess/menu")
    ),
  },
];

export interface SourceProps {
  uid: string;
  icon?: string;
  label: string;
  subTitle?: string;
  enLabel?: string;
  enSubTitle?: string;
}

export const sourceList: SourceProps[] = [
  {
    uid: makeUUID(),
    label: "工作区",
    icon: "arrow-right",
    enLabel: "workspace",
  },
  {
    uid: makeUUID(),
    label: "组件树",
    icon: "arrow-right",
    enLabel: "compTree",
  },
  {
    uid: makeUUID(),
    label: "属性",
    icon: "arrow-right",
    enLabel: "props",
  },
  {
    uid: makeUUID(),
    label: "代码片段",
    icon: "arrow-right",
    enLabel: "codeFragment",
  },
];

export const attrList: SourceProps[] = [
  {
    uid: makeUUID(),
    icon: "arrow-right",
    label: "属性",
    enLabel: "props",
  },
  {
    uid: makeUUID(),
    icon: "arrow-right",
    label: "事件",
    enLabel: "events",
  },
  {
    uid: makeUUID(),
    icon: "arrow-right",
    label: "动画",
    enLabel: "animates",
  },
];

export interface FileStatus {
  locked?: boolean;
  edited?: boolean;
  readonly?: boolean;
  modify?: boolean;
  deleted?: boolean;
  created?: boolean;
}

export const fileStatus: string[] = [
  "locked",
  "edited",
  "readonly",
  "modify",
  "deleted",
  "created",
];

export interface ScreenSize {
  gte?: number;
  lt?: number;
}
export type ScreenProps = SourceProps & ScreenSize;

export const screenSize: ScreenProps[] = [
  {
    uid: makeUUID(),
    label: "SM",
    icon: "sm",
    gte: 568,
  },
  {
    uid: makeUUID(),
    label: "MD",
    icon: "md",
    gte: 768,
  },
  {
    uid: makeUUID(),
    label: "LG",
    icon: "lg",
    gte: 1024,
  },
  {
    uid: makeUUID(),
    label: "XL",
    icon: "xl",
    gte: 1280,
  },
  {
    uid: makeUUID(),
    label: "XXL",
    icon: "xxl",
    gte: 1920,
  },
  {
    uid: makeUUID(),
    label: "自定义",
    icon: "manual",
  },
];

export const commands: SourceProps[] = [
  {
    uid: makeUUID(),
    label: "撤销",
    icon: "undo",
  },
  {
    uid: makeUUID(),
    label: "重做",
    icon: "redo",
  },
  {
    uid: makeUUID(),
    label: "预览",
    icon: "preview",
  },
  {
    uid: makeUUID(),
    label: "清空",
    icon: "clear",
  },
  {
    uid: makeUUID(),
    label: "删除",
    icon: "delete",
  },
];
export interface ComponentProps {
  tag: string;
}

export const componentList: ComponentProps[] = [];

export const TransverseMobile: string[] = [
  "2:1",
  "21:9",
  "20:9",
  "19.5:9",
  "19:9",
  "18.5:9",
  "16:9",
];
export const TransversePad: string[] = [];
export const TransverseLaptop: string[] = [];
export const TransverseDesktop: string[] = [];

export const widgets: SourceProps[] = [
  {
    uid: makeUUID(),
    label: "dark Mode",
    icon: "mode",
  },
  {
    uid: makeUUID(),
    label: "collapse props bar",
    icon: "push",
  },
];

export const settings: SourceProps[] = [
  {
    uid: makeUUID(),
    label: "颜色主题",
    icon: "theme",
  },
  {
    uid: makeUUID(),
    label: "颜色主题",
    icon: "theme",
  },
];
