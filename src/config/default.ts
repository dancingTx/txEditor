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
  ComponentProps,
  SettingProps,
  WidgetProps,
  CommandGroupItem,
  FileProps,
  NodeDirOpProps,
} from "./type";
import { makeUUID } from "@/shared/variables";

export const plugins: (RouteRecordRaw & { meta: PluginProps })[] = [
  {
    path: "sourceManage",
    name: "sourceManage",
    component: () => import("@/packages/sourceManage"),
    meta: {
      uid: makeUUID(),
      icon: "edit",
      label: "资源管理器",
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

export const canvasCommands: CanvasCommandProps[] = [
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
};
export const settings: SettingProps[] = [
  {
    uid: makeUUID(),
    label: "颜色主题",
    icon: "theme",
    command: "Theme",
    commandOptions: [
      {
        uid: makeUUID(),
        group: "默认主题",
        children: [
          defaultTheme,
          {
            uid: makeUUID(),
            kind: "LightDefault",
            label: "经典白",
            color: "",
          },
        ],
      },
      {
        uid: makeUUID(),
        group: "浅色主题",
        children: [
          {
            uid: makeUUID(),
            kind: "LightBlue",
            label: "浅蓝",
            color: "#B0E2FF",
          },
          {
            uid: makeUUID(),
            kind: "LightRed",
            label: "浅红",
            color: "#FF6347",
          },
        ],
      },
      {
        uid: makeUUID(),
        group: "深色主题",
        children: [
          {
            uid: makeUUID(),
            kind: "DarkBlue",
            label: "深蓝",
            color: "#00BFFF",
          },
          {
            uid: makeUUID(),
            kind: "DarkRed",
            label: "深红",
            color: "#FF0000",
          },
        ],
      },
    ],
  },
  {
    uid: makeUUID(),
    label: "国际化",
    icon: "i18n",
    command: "I18n",
    commandOptions: [],
  },
];

export const fileList: FileProps[] = [
  {
    uid: "1..dfafafa",
    label: "file.js",
    icon: "javascript",
    kind: "Modify",
  },
  {
    uid: "2..fdsaafas",
    label: "file2.js",
    icon: "html",
    kind: "Locked",
  },
  {
    uid: "3..ffafdsafs",
    label: "file3.js",
    icon: "css",
    kind: "Deleted",
  },
  {
    uid: "4..ffafdsafs",
    label: "file3.js",
    icon: "javascript",
    kind: "Created",
  },
];

export const dirSettings: NodeDirOpProps[] = [
  {
    uid: makeUUID(),
    label: "新建文件",
    command: "CreateNode",
  },
  {
    uid: makeUUID(),
    label: "新建文件夹",
    command: "CreateDir",
  },
  {
    uid: makeUUID(),
    label: "重命名",
    command: "RenameDir",
  },
  {
    uid: makeUUID(),
    label: "删除文件夹",
    command: "DeleteDir",
  },
];

export const nodeSettings: NodeDirOpProps[] = [
  {
    uid: makeUUID(),
    label: "重命名",
    command: "RenameNode",
  },
  {
    uid: makeUUID(),
    label: "删除文件",
    command: "DeleteNode",
  },
];
export const fileSettings: SourceProps[] = [];
