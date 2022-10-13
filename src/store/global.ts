import { defineStore } from "pinia";
import type { Command, Setting, CommandInfo } from "@/config/default";
import { makeUUID } from "@/shared/variables";
export const useGlobalStore = defineStore("global", {
  state: () => {
    return {
      showCommand: false,
      command: "",
    };
  },
  actions: {
    invokeCommand(command: Command | Setting, whether: boolean = true) {
      if (whether) {
        this.showCommand = true;
      }
      const commandInfo: CommandInfo = {
        uid: makeUUID(),
        command,
        commandOptions: [],
      };
      this.command = command;
      console.log(command, " commn");
      return () => {
        this.showCommand = false;
      };
    },
  },
});
