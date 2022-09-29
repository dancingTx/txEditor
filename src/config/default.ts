import { makeUUID } from "@/shared/variables";
export interface PluginProps {
  uid: number | string;
  icon: string;
  label?: string;
}
export const pluginList: PluginProps[] = [
  {
    uid: makeUUID(),
    icon: "edit",
  },
  {
    uid: makeUUID(),
    icon: "code",
  },
];

export interface SourceProps {
  uid: number | string;
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
