import { defineComponent, Transition, withDirectives, computed } from "vue";
import bus from "@/shared/bus";
import { clickOutside } from "@/directive/clickoutside";
import { useContextMenuStore, type ContextMenuType } from "@/store/global";
import { traceMouseLocation } from "@/shared/tool";
import {
  settings,
  workspaceSettings,
  dirSettings,
  nodeSettings,
  type SettingProps,
  type NodeDirOpProps,
} from "@/config/default";
import styles from "@/style/module/components.module.scss";

const mapCommandPanel: Record<
  ContextMenuType,
  (NodeDirOpProps | SettingProps)[]
> = {
  "global:settings": settings,
  "menu:workspace": workspaceSettings,
  "workspace:tree": dirSettings,
  "workspace:node": nodeSettings,
};

export default defineComponent({
  setup() {
    const contextMenu = useContextMenuStore();
    const items = computed(() =>
      contextMenu.kind ? mapCommandPanel[contextMenu.kind] : []
    );
    const positionPlace = () => {
      const { x, y } = traceMouseLocation();
      if (!contextMenu.location) {
        return {
          left: x + "px",
          top: y + "px",
        };
      }
      return Object.keys(contextMenu.location).reduce((total, curr) => {
        (total as Record<string, number | string>)[curr] =
          (contextMenu.location as Record<string, number | string>)[curr] +
          "px";
        return total;
      }, {});
    };

    const makeStyles = (): {
      width: string;
      height: string;
      top?: string;
      right?: string;
      bottom?: string;
      left?: string;
      "transform-origin": string;
    } => {
      return {
        width: contextMenu.panelWidth + "px",
        height: contextMenu.panelHeight + "px",
        "transform-origin": contextMenu.orientation,
        ...positionPlace(),
      };
    };
    return () => (
      <div
        class={styles.panel_wrapper}
        onContextmenu={(evt: Event) => evt.preventDefault()}
      >
        {withDirectives(
          <Transition name="zoom-in-left">
            {contextMenu.showPanel && (
              <div class={styles.panel_inner} style={makeStyles()}>
                {items.value.map((item) => (
                  <div
                    onClick={() => {
                      bus.emit("contextMenu:clickItem", item);
                    }}
                  >
                    {item.icon && (
                      <svg-icon
                        iconClass={item.icon}
                        class={styles.panel_icon}
                      ></svg-icon>
                    )}
                    <span class={styles.panel_item}>{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </Transition>,
          [
            [
              clickOutside,
              {
                handler() {
                  contextMenu.hide();
                },
              },
            ],
          ]
        )}
      </div>
    );
  },
});
