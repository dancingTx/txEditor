import { h, render } from "vue";
import svgIcon from "@/components/svgIcon";
import bus, { on, off, query, makeUUID } from "@/shared";
import type { NodeDirOpProps } from "@/config/default";
import { useContextMenuStore } from "@/store/global";
import styles from "@/style/module/components.module.scss";

export type Orientation =
  | "left top"
  | "left bottom"
  | "left center"
  | "right top"
  | "right bottom"
  | "right center";
interface ContextMenuOptions {
  items: NodeDirOpProps[];
  orientation: Orientation;
}
export default class ContextMenu {
  private uid: string;
  private options: ContextMenuOptions;
  private items: NodeDirOpProps[];
  private orientation: Orientation;
  static Target: HTMLElement & Record<string, any>;

  constructor(options: ContextMenuOptions = {} as ContextMenuOptions) {
    this.uid = makeUUID();
    this.options = options;
    this.items = options.items;
    this.orientation = options.orientation || "left top";
  }

  execute() {
    on(ContextMenu.Target, "contextmenu", this.contextMenuHandler(this));
  }

  private render(evt: Event, context: this) {
    if (ContextMenu.Target && !ContextMenu.Target.panelId) {
      const contextmenu = useContextMenuStore();
      ContextMenu.Target.style.position = "relative";
      const left = (evt as MouseEvent).offsetX;
      const top = (evt as MouseEvent).offsetY;
      const targetId = `context_${this.uid}`;

      const defaultStyle = `
        width: ${contextmenu.panelWidth}px;
        height: ${contextmenu.panelHeight}px;
        position: absolute;
        left: ${left}px;
        top: ${top}px;
      `;
      ContextMenu.Target.panelId = targetId;
      const panelDom = h(
        "div",
        {
          id: targetId,
          class: styles.panel_inner,
          style: defaultStyle,
        },
        this.items.map((item) =>
          h(
            "div",
            {
              onClick() {
                bus.emit("contextMenu:commandInfo", item);
                context.hidePanel();
              },
            },
            [
              item.icon &&
                h(svgIcon, {
                  iconClass: item.icon,
                  class: styles.panel_icon,
                }),
              h(
                "span",
                {
                  class: styles.panel_item,
                },
                item.label
              ),
            ]
          )
        )
      );
      render(panelDom, ContextMenu.Target);
    } else {
      this.showPanel();
    }
  }
  private controllPanel(status: string) {
    if (ContextMenu.Target && ContextMenu.Target.panelId) {
      const child = query(
        `[id="${ContextMenu.Target.panelId}"]`,
        ContextMenu.Target
      );
      (child as HTMLElement).style.display = status;
    }
  }
  showPanel() {
    this.controllPanel("block");
  }
  hidePanel() {
    this.controllPanel("none");
  }

  private contextMenuHandler(context: this) {
    return (evt: Event) => {
      context.render(evt, context);
    };
  }

  destroy() {
    if (ContextMenu.Target) {
      off(ContextMenu.Target, "contextmenu", this.contextMenuHandler(this));
      if (ContextMenu.Target.panelId) {
        const child = query(
          `[id="${ContextMenu.Target.panelId}"]`,
          ContextMenu.Target
        );
        ContextMenu.Target.removeChild(child as Node);
        Reflect.deleteProperty(ContextMenu.Target, "panelId");
        ContextMenu.Target.style.position = "static";
      }
    }
  }

  setInnerDomTarget(el: HTMLElement) {
    ContextMenu.Target = el;
  }
}
