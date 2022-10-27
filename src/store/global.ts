import type { RendererNode } from "vue";
import { defineStore } from "pinia";
import {
  Vars,
  DefaultVars,
  type CanvasCommand,
  type SpecialCanvasCommand,
  type Setting,
  type CommandOptions,
} from "@/config/default";
import type { Orientation } from "@/directive/contextMenu/contextMenu";
import { screen2BodyRatio } from "@/shared/tool";

const selects: SpecialCanvasCommand[] = ["Gird", "Preview"];
export const useCommandStore = defineStore("command", {
  state: () => {
    return {
      showCommand: false,
      command: "" as Setting,
      commandOptions: [] as CommandOptions[],
      canvasCommand: "" as CanvasCommand,
      canSelected: [] as SpecialCanvasCommand[],
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
      if (selects.includes(command as SpecialCanvasCommand)) {
        this.toggleSpecialCommand(command as SpecialCanvasCommand);
      } else {
        this.canvasCommand = command;
      }
    },
    toggleSpecialCommand(command: SpecialCanvasCommand) {
      let i = 0;
      let len = this.canSelected.length;
      for (; i < len; i++) {
        const item = this.canSelected[i];
        if (item === command) {
          this.canSelected.splice(i, 1);
          break;
        }
      }
      if (i === len) {
        this.canSelected.push(command);
      }
    },
  },
});

export type ContextMenuType =
  | "global:settings"
  | "menu:workspace"
  | "workspace:tree"
  | "workspace:node";
type NumberOrString = number | string;
export interface Pos {
  left?: NumberOrString;
  top?: NumberOrString;
  right?: NumberOrString;
  bottom?: NumberOrString;
}
export const useContextMenuStore = defineStore("contextMenu", {
  state: () => {
    return {
      showPanel: false,
      uid: "" as NumberOrString,
      panelWidth: Vars.__PANEL_WIDTH__,
      panelHeight: screen2BodyRatio(
        Vars.__PANEL_WIDTH__,
        DefaultVars.__CONTEXTMENU_RATIO__
      ),
      kind: "global:settings" as ContextMenuType,
      orientation: "" as Orientation | string,
      location: null as Pos | null,
    };
  },
  actions: {
    show() {
      this.showPanel = true;
    },
    hide() {
      this.showPanel = false;
      this.kind = "global:settings";
      this.orientation = "";
      this.uid = "";
      this.location = null;
    },
    setUniqueId(uid: NumberOrString) {
      this.uid = uid;
    },
    setPanelPos(pos: Pos) {
      this.location = pos;
    },
    setPanelType(kind: ContextMenuType) {
      this.kind = kind;
    },
    setPanelOrientation(orientation: Orientation) {
      this.orientation = orientation;
    },
    setIgnoreElement(vnode: RendererNode) {
      this.$onAction(({ name }) => {
        if (vnode.$el) {
          vnode.$el.style.pointerEvents = name === "show" ? "none" : "auto";
        }
      });
    },
  },
});
