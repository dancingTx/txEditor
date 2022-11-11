import { defineStore } from "pinia";
import { screen2BodyRatio } from "@/shared";
import { Vars, DarkModeVars, DefaultVars } from "@/config/default";
import type { Namespace } from "@/@types/var";
import type { LayoutProps, LayoutState, LayoutPayload } from "@/@types";

export const useLayoutStore = defineStore("layout", {
  state: (): LayoutState & LayoutProps => {
    return {
      isCollapse: false,
      isCollapseProp: false,
      hasMenu: true,
      hasPropsBar: true,
      hasLogo: false,
      // cache value
      pluginUid: "",
      namespace: "" as Namespace,
      menuWidth: 0,
      canvasSize: "",
      canvasWidth: Vars.__CANVAS_WIDTH__,
      canvasHeight: screen2BodyRatio(
        Vars.__CANVAS_WIDTH__,
        DefaultVars.__CANVAS_RATIO__
      ),
      mode: DarkModeVars.Dark,
    };
  },
  actions: {
    switchState(payload: LayoutPayload): void {
      this[payload.key] = payload.value;
    },
    switchCollapse(who: string): void {
      const props = (
        who === "props"
          ? { key: "isCollapseProp", value: !this.isCollapseProp }
          : { key: "isCollapse", value: !this.isCollapse }
      ) as LayoutPayload;
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
    storePluginUid(uid: string, namespace?: Namespace): void {
      this.pluginUid = uid;
      if (namespace) {
        this.namespace = namespace;
      }
    },
    storeMenuWidth(width: number) {
      this.menuWidth = width;
    },
    storeCanvasSize(size: string) {
      this.canvasSize = size;
    },
    manualControlCanvasSize(width?: number, height?: number) {
      if (width) {
        this.canvasWidth = width;
      }
      if (height) {
        this.canvasHeight = height;
      }
    },
    switchDarkMode() {
      this.mode =
        this.mode === DarkModeVars.Dark
          ? DarkModeVars.Light
          : DarkModeVars.Dark;
    },
  },
});
