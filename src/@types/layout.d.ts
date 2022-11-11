import { Namespace } from "./var";
import { DarkModeVars } from "@/config/var";

export interface LayoutState {
  isCollapse: boolean;
  isCollapseProp: boolean;
  hasMenu: boolean;
  hasPropsBar: boolean;
  hasLogo: boolean;
}
export interface LayoutProps {
  namespace?: Namespace;
  pluginUid: string;
  menuWidth: number;
  canvasSize: string;
  canvasWidth: number;
  canvasHeight: number;
  mode: DarkModeVars;
}

export interface LayoutPayload {
  key: keyof LayoutState;
  value: boolean;
}
