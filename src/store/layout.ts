import { defineStore } from "pinia";
interface LayoutState {
  isCollapse: boolean;
  isCollapseProp: boolean;
  hasMenu: boolean;
  hasPropsBar: boolean;
  hasLogo: boolean;
}
interface LayoutProps {
  pluginUid: string;
  menuWidth: number;
  canvasSize: string;
}
export const useLayoutStore = defineStore("layout", {
  state: () => {
    return {
      isCollapse: false,
      isCollapseProp: false,
      hasMenu: true,
      hasPropsBar: true,
      hasLogo: false,
      // cache value
      pluginUid: "",
      menuWidth: 0,
      canvasSize: "",
    } as LayoutState & LayoutProps;
  },
  actions: {
    switchState(payload: { key: keyof LayoutState; value: boolean }): void {
      this[payload.key] = payload.value;
    },
    switchCollapse(who: string): void {
      const props = (
        who === "props"
          ? { key: "isCollapseProp", value: !this.isCollapseProp }
          : { key: "isCollapse", value: !this.isCollapse }
      ) as { key: keyof LayoutState; value: boolean };
      this.switchState(props);
    },
    switchMenu(): void {
      this.switchState({ key: "hasMenu", value: !this.hasMenu });
    },
    switchLogo(): void {
      this.switchState({ key: "hasLogo", value: !this.hasLogo });
    },
    switchPropsBar(): void {
      this.switchState({ key: "hasPropsBar", value: !this.hasPropsBar });
    },
    storePluginUid(uid: string): void {
      this.pluginUid = uid;
    },
    storeMenuWidth(width: number): void {
      this.menuWidth = width;
    },
    storeCanvasSize(size: string) {
      this.canvasSize = size;
    },
  },
});
