import { defineStore } from "pinia";
interface LayoutState {
  isCollapse: boolean;
  hasMenu: boolean;
  hasLogo: boolean;
}
export const useLayoutStore = defineStore("layout", {
  state: () => {
    return {
      isCollapse: false,
      hasMenu: true,
      hasLogo: false,
    } as LayoutState;
  },
  actions: {
    switchState(payload: { key: keyof LayoutState; value: boolean }): void {
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
  },
});
