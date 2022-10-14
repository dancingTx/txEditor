import { defineStore } from "pinia";
import type { CanvasCommand, Setting, CommandOptions } from "@/config/default";
export const useGlobalStore = defineStore("global", {
  state: () => {
    return {
      showCommand: false,
      command: "",
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
      console.log("global command", command, commandOptions);
    },
    disposeCommand() {
      this.showCommand = false;
      this.command = "";
      this.commandOptions = [];
    },
    invokeCanvasCommand(command: CanvasCommand) {
      this.canvasCommand = command;
      console.log("canvas command", command);
    },
  },
});
