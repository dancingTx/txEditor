export * from "./var";
export * from "./type";
export * from "./ratio";

import { defineAsyncComponent } from "vue";
import type { RouteRecordRaw } from "vue-router";
import type {
  PluginProps,
  SourceProps,
  ScreenProps,
  CanvasCommandProps,
  SettingProps,
  WidgetProps,
  CommandOptions,
  CommandGroupItem,
  NodeDirOpProps,
  ComponentInfo,
} from "./type";
import { makeUUID } from "@/shared/variables";

export const plugins: (RouteRecordRaw & {
  meta: PluginProps;
})[] = [
  {
    path: "sourceManage",
    name: "sourceManage",
    component: () => import("@/packages/sourceManage"),
    meta: {
      uid: makeUUID(),
      icon: "edit",
      label: "资源管理器",
      i18n: "sourceManage.menu.title",
      namespace: "sourceManage",
      menuComp: defineAsyncComponent(
        () => import("@/packages/sourceManage/menu")
      ),
    },
  },
  {
    path: "lowCode",
    name: "lowCode",
    component: () => import("@/packages/lowCode"),
    meta: {
      uid: makeUUID(),
      icon: "code",
      label: "低代码平台",
      i18n: "lowCode.menu.title",
      namespace: "lowCode",
      menuComp: defineAsyncComponent(() => import("@/packages/lowCode/menu")),
    },
  },
  {
    path: "flowProcess",
    name: "flowProcess",
    component: () => import("@/packages/flowProcess"),
    meta: {
      uid: makeUUID(),
      icon: "flow",
      label: "流程设计器",
      i18n: "flowProcess.menu.title",
      namespace: "flowProcess",
      menuComp: defineAsyncComponent(
        () => import("@/packages/flowProcess/menu")
      ),
    },
  },
];

export const sourceList: SourceProps[] = [
  {
    uid: makeUUID(),
    label: "工作区",
    icon: "arrow-right",
    enLabel: "workspace",
    i18n: "sourceManage.menu.workspace",
  },
  {
    uid: makeUUID(),
    label: "组件树",
    icon: "arrow-right",
    enLabel: "compTree",
    i18n: "sourceManage.menu.compTree",
  },
  {
    uid: makeUUID(),
    label: "属性",
    icon: "arrow-right",
    enLabel: "props",
    i18n: "sourceManage.menu.props",
  },
  {
    uid: makeUUID(),
    label: "代码片段",
    icon: "arrow-right",
    enLabel: "codeFragment",
    i18n: "sourceManage.menu.codeFrag",
  },
];

export const attrList: SourceProps[] = [
  {
    uid: makeUUID(),
    icon: "arrow-right",
    label: "属性",
    enLabel: "props",
    i18n: "sourceManage.menu.props",
  },
  {
    uid: makeUUID(),
    icon: "arrow-right",
    label: "事件",
    enLabel: "events",
    i18n: "sourceManage.menu.events",
  },
  {
    uid: makeUUID(),
    icon: "arrow-right",
    label: "动画",
    enLabel: "animates",
    i18n: "sourceManage.menu.animates",
  },
];

export const screenSize: ScreenProps[] = [
  {
    uid: makeUUID(),
    label: "SM",
    icon: "sm",
    gte: 568,
    i18n: "canvas.size.sm",
  },
  {
    uid: makeUUID(),
    label: "MD",
    icon: "md",
    gte: 768,
    i18n: "canvas.size.md",
  },
  {
    uid: makeUUID(),
    label: "LG",
    icon: "lg",
    gte: 1024,
    i18n: "canvas.size.lg",
  },
  {
    uid: makeUUID(),
    label: "XL",
    icon: "xl",
    gte: 1280,
    i18n: "canvas.size.xl",
  },
  {
    uid: makeUUID(),
    label: "XXL",
    icon: "xxl",
    gte: 1920,
    i18n: "canvas.size.xxl",
  },
  {
    uid: makeUUID(),
    label: "自定义",
    icon: "manual",
    i18n: "canvas.size.manual",
  },
];

export const canvasCommands: CanvasCommandProps[] = [
  {
    uid: makeUUID(),
    label: "网格",
    icon: "gird",
    command: "Gird",
    i18n: "canvas.gird",
  },
  {
    uid: makeUUID(),
    label: "撤销",
    icon: "undo",
    command: "Undo",
    i18n: "canvas.undo",
  },
  {
    uid: makeUUID(),
    label: "重做",
    icon: "redo",
    command: "Redo",
    i18n: "canvas.redo",
  },
  {
    uid: makeUUID(),
    label: "预览",
    icon: "preview",
    command: "Preview",
    i18n: "canvas.preview",
  },
  {
    uid: makeUUID(),
    label: "清空",
    icon: "clear",
    command: "Clear",
    i18n: "canvas.clear",
  },
  {
    uid: makeUUID(),
    label: "删除",
    icon: "delete",
    command: "Delete",
    i18n: "canvas.delete",
  },
];

export const widgets: WidgetProps[] = [
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
export const defaultTheme: CommandGroupItem = {
  uid: makeUUID(),
  kind: "DarkDefault",
  label: "经典黑",
  color: "",
  i18n: "theme.default.black",
};
const colorThemeOptions: CommandOptions[] = [
  {
    uid: makeUUID(),
    group: "默认主题",
    i18n: "theme.default.title",
    children: [
      defaultTheme,
      {
        uid: makeUUID(),
        kind: "LightDefault",
        label: "经典白",
        color: "",
        i18n: "theme.default.white",
      },
    ],
  },
  {
    uid: makeUUID(),
    group: "浅色主题",
    i18n: "theme.light.title",
    children: [
      {
        uid: makeUUID(),
        kind: "LightBlue",
        label: "浅蓝",
        color: "#B0E2FF",
        i18n: "theme.light.blue",
      },
      {
        uid: makeUUID(),
        kind: "LightRed",
        label: "浅红",
        color: "#FF6347",
        i18n: "theme.light.red",
      },
    ],
  },
  {
    uid: makeUUID(),
    group: "深色主题",
    i18n: "theme.dark.title",
    children: [
      {
        uid: makeUUID(),
        kind: "DarkBlue",
        label: "深蓝",
        color: "#00BFFF",
        i18n: "theme.dark.blue",
      },
      {
        uid: makeUUID(),
        kind: "DarkRed",
        label: "深红",
        color: "#FF0000",
        i18n: "theme.dark.blue",
      },
    ],
  },
];

export const defaultLanguage: CommandGroupItem = {
  uid: makeUUID(),
  kind: "Chinese",
  label: "简体中文",
  i18n: "language.default.chinese",
};
const i18nOptions: CommandOptions[] = [
  {
    uid: makeUUID(),
    group: "默认语言",
    i18n: "language.default.title",
    children: [defaultLanguage],
  },
  {
    uid: makeUUID(),
    group: "可选语言",
    i18n: "language.option.title",
    children: [
      {
        uid: makeUUID(),
        kind: "English",
        label: "英文",
        i18n: "language.option.english",
      },
      {
        uid: makeUUID(),
        kind: "HongKong",
        label: "繁体中文",
        i18n: "language.option.hongkong",
      },
    ],
  },
];

export const settings: SettingProps[] = [
  {
    uid: makeUUID(),
    label: "颜色主题",
    icon: "theme",
    command: "Theme",
    i18n: "global.settings.theme",
    commandOptions: colorThemeOptions,
  },
  {
    uid: makeUUID(),
    label: "国际化",
    icon: "i18n",
    command: "I18n",
    i18n: "global.settings.i18n",
    commandOptions: i18nOptions,
  },
];

export const workspaceSettings: NodeDirOpProps[] = [
  {
    uid: makeUUID(),
    label: "新建文件",
    command: "CreateNode",
    i18n: "workspace.node.create",
  },
  {
    uid: makeUUID(),
    label: "新建文件夹",
    command: "CreateDir",
    i18n: "workspace.dir.create",
  },
];

export const dirSettings: NodeDirOpProps[] = [
  ...workspaceSettings,
  {
    uid: makeUUID(),
    label: "重命名",
    command: "RenameDir",
    i18n: "workspace.dir.rename",
  },
  {
    uid: makeUUID(),
    label: "删除文件夹",
    command: "DeleteDir",
    i18n: "workspace.dir.delete",
  },
];

export const nodeSettings: NodeDirOpProps[] = [
  {
    uid: makeUUID(),
    label: "重命名",
    command: "RenameNode",
    i18n: "workspace.node.rename",
  },
  {
    uid: makeUUID(),
    label: "删除文件",
    command: "DeleteNode",
    i18n: "workspace.node.delete",
  },
];

export const componentList: ComponentInfo<SourceProps>[] = [
  {
    uid: makeUUID(),
    tag: "Text",
    icon: "text",
    label: "文本",
    // render
    value: "文字",
    component: defineAsyncComponent(
      () => import("@/packages/lowCode/comp/customText")
    ),
  },
  {
    uid: makeUUID(),
    tag: "Button",
    icon: "button",
    label: "按钮",
    // render
    value: "按钮",
    component: defineAsyncComponent(
      () => import("@/packages/lowCode/comp/customButton")
    ),
  },
  {
    uid: makeUUID(),
    tag: "Image",
    icon: "picture",
    label: "图片",
    // render
    value: "图片",
    component: defineAsyncComponent(
      () => import("@/packages/lowCode/comp/customPicture")
    ),
  },
];
