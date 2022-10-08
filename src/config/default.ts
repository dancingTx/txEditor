import { makeUUID } from "@/shared/variables";
import { defineAsyncComponent, type Component } from "vue";

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
      () => import("@/layout/sideMenu/menu/store/sourceManage")
    ),
  },
  {
    uid: makeUUID(),
    icon: "code",
    label: "低代码平台",
    componentName: "lowCode",
    component: defineAsyncComponent(
      () => import("@/layout/sideMenu/menu/store/lowCode")
    ),
  },
  {
    uid: makeUUID(),
    icon: "flow",
    label: "流程设计器",
    componentName: "flowProcess",
    component: defineAsyncComponent(
      () => import("@/layout/sideMenu/menu/store/flowProcess")
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
