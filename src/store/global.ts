import type { RendererNode } from "vue";
import { defineStore } from "pinia";
import type { Orientation } from "@/directive/contextMenu/contextMenu";
import { screen2BodyRatio } from "@/shared";
import { Vars, DefaultVars } from "@/config/default";
import type {
  Setting,
  GlobalCommandGroup,
  GlobalState,
  Pos,
  ContextMenuType,
  ContextMenuState,
} from "@/@types";

export const useCommandStore = defineStore("command", {
  state: (): GlobalState => {
    return {
      showCommand: false,
      command: "" as Setting,
      commandOptions: [],
    };
  },
  actions: {
    invokeCommand(command: Setting, commandOptions?: GlobalCommandGroup[]) {
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
  },
});

export const useContextMenuStore = defineStore("contextMenu", {
  state: (): ContextMenuState => {
    return {
      showPanel: false,
      uid: "",
      panelWidth: Vars.__PANEL_WIDTH__,
      panelHeight: screen2BodyRatio(
        Vars.__PANEL_WIDTH__,
        DefaultVars.__CONTEXTMENU_RATIO__
      ),
      kind: "global:settings",
      orientation: "" as Orientation | string,
      location: {},
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
      this.location = {};
    },
    setUniqueId(uid: string | number) {
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
