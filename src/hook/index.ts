import { Vars } from "@/config/default";
import { useLayoutStore } from "@/store/layout";

export const calcNavWidth = (): string => {
  const state = useLayoutStore();
  const baseWidth = Vars.__ASIDE_WIDTH__;
  const otherWidth =
    baseWidth +
    (state.isCollapse ? 0 : Vars.__MENU_WIDTH__) +
    (state.isCollapseProp ? 0 : Vars.__MENU_WIDTH__);
  return `calc(100vw - ${otherWidth}px)`;
};
