import type { Component } from "vue";
import type { ExtraProps } from "./core";
import type { SvgIconsKind } from "./icons";
import type { Namespace } from "./var";

export interface PluginProps extends ExtraProps {
  path?: string;
  namespace?: Namespace;
  menuComp?: Component;
}
