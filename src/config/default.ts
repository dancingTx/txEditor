export * from "./var";
export * from "./type";
export * from "./ratio";

import { defineAsyncComponent } from "vue";
import type {
  PluginProps,
  SourceProps,
  ScreenProps,
  CommandProps,
  ComponentProps,
  SettingProps,
} from "./type";
import { makeUUID } from "@/shared/variables";

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

export const commands: CommandProps[] = [
  {
    uid: makeUUID(),
    label: "撤销",
    icon: "undo",
    command: "Undo",
  },
  {
    uid: makeUUID(),
    label: "重做",
    icon: "redo",
    command: "Redo",
  },
  {
    uid: makeUUID(),
    label: "预览",
    icon: "preview",
    command: "Preview",
  },
  {
    uid: makeUUID(),
    label: "清空",
    icon: "clear",
    command: "Clear",
  },
  {
    uid: makeUUID(),
    label: "删除",
    icon: "delete",
    command: "Delete",
  },
];

export const componentList: ComponentProps[] = [];

export const widgets: CommandProps[] = [
  {
    uid: makeUUID(),
    label: "dark Mode",
    icon: "mode",
    command: "DarkMode",
  },
  {
    uid: makeUUID(),
    label: "collapse props bar",
    icon: "push",
    command: "Collapse",
  },
];

export const settings: SettingProps[] = [
  {
    uid: makeUUID(),
    label: "颜色主题",
    icon: "theme",
    command: "Theme",
  },
  {
    uid: makeUUID(),
    label: "颜色主题",
    icon: "theme",
    command: "Theme",
  },
];
