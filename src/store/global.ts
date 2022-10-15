import { defineStore } from "pinia";
import type { CanvasCommand, Setting, CommandOptions } from "@/config/default";
export const useGlobalStore = defineStore("global", {
  state: () => {
    return {
      showCommand: false,
      command: "" as Setting,
      commandOptions: [] as CommandOptions[],
      canvasCommand: "",
    };
  },
  actions: {
    invokeCommand(command: Setting, commandOptions?: CommandOptions[]) {
      this.showCommand = true;
      this.command = command;
      if (commandOptions) {
        this.commandOptions = commandOptions;
      }
    },
    disposeCommand() {
      this.showCommand = false;
      this.command = "" as Setting;
      this.commandOptions = [];
    },
    invokeCanvasCommand(command: CanvasCommand) {
      this.canvasCommand = command;
    },
  },
});
