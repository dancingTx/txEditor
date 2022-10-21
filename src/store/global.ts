import type { RendererNode } from "vue";
import { defineStore } from "pinia";
import {
  Vars,
  type CanvasCommand,
  type Setting,
  type CommandOptions,
} from "@/config/default";
import type { Orientation } from "@/directive/contextMenu/contextMenu";
import { screen2BodyRatio } from "@/shared/tool";

export const useCommandStore = defineStore("command", {
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
      panelHeight: screen2BodyRatio(Vars.__PANEL_WIDTH__, "3:4"),
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
