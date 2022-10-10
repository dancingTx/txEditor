import { __MENU_WIDTH__, __ASIDE_WIDTH__ } from "@/config/default";
import { useLayoutStore } from "@/store/layout";

export const calcNavWidth = (): string => {
  const state = useLayoutStore();
  const baseWidth = __ASIDE_WIDTH__;
  const otherWidth =
    baseWidth +
    (state.isCollapse ? 0 : __MENU_WIDTH__) +
    (state.isCollapseProp ? 0 : __MENU_WIDTH__);
  return `calc(100vw - ${otherWidth}px)`;
};
