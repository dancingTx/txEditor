import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => {
    return {
      showCommand: false,
      directive: "",
    };
  },
  actions: {
    invokeDirective(directive: string) {
      this.showCommand = true;
      this.directive = directive;
      return () => {
        this.showCommand = false;
      };
    },
  },
});
