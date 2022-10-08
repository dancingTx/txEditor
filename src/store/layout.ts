import { defineStore } from "pinia";
type BoolOrStr = boolean | string;
interface LayoutState {
  isCollapse: BoolOrStr;
  hasMenu: BoolOrStr;
  hasLogo: BoolOrStr;
  hasPropsBar: BoolOrStr;
  pluginUid: BoolOrStr;
}
export const useLayoutStore = defineStore("layout", {
  state: () => {
    return {
      isCollapse: false,
      hasMenu: true,
      hasLogo: false,
      hasPropsBar: true,
      pluginUid: "",
    } as LayoutState;
  },
  actions: {
    switchState(payload: {
      key: keyof LayoutState;
      value: boolean | string;
    }): void {
      this[payload.key] = payload.value;
    },
    switchCollapse(): void {
      this.switchState({ key: "isCollapse", value: !this.isCollapse });
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
      this.switchState({ key: "pluginUid", value: uid });
    },
  },
});
