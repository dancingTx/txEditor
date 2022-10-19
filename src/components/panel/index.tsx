import {
  defineComponent,
  reactive,
  Transition,
  withDirectives,
  type PropType,
} from "vue";
import { clickOutside } from "@/directive/clickoutside";
import { screen2BodyRatio } from "@/shared/tool";
import { Vars, type SettingProps, type NodeDirOpProps } from "@/config/default";
import styles from "@/style/module/components.module.scss";

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<(SettingProps | NodeDirOpProps)[]>,
      default: () => [],
    },
    showPanel: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    left: {
      type: Number as PropType<number>,
      default: 0,
    },
    top: {
      type: Number as PropType<number>,
      default: 0,
    },
    location: {
      type: String as PropType<string>,
      default: "left bottom",
    },
  },
  emits: ["clickItem", "closePanel"],
  setup(props, { slots, emit }) {
    const state = reactive({
      panelWidth: Vars.__PANEL_WIDTH__,
      panelHeight: screen2BodyRatio(Vars.__PANEL_WIDTH__, "3:4"),
      panelTop: 0,
      panelLeft: 0,
    });
    const positionPlace = () => {
      const styles = {} as {
        left: string;
        top: string;
        "transform-origin": string;
      };
      if (props.left) {
        styles.left = props.left + "px";
      }
      if (props.top) {
        styles.top = props.top + "px";
      }
      if (props.location) {
        styles["transform-origin"] = props.location;
      }
      return styles;
    };
    return () => (
      <div class={styles.panel_wrapper}>
        <div class={[styles.panel_handle, props.showPanel && styles.is_active]}>
          {slots.handle && slots.handle()}
        </div>

        {withDirectives(
          <Transition name="zoom-in-left">
            {props.showPanel && (
              <div
                class={styles.panel_inner}
                style={{
                  width: state.panelWidth + "px",
                  height: state.panelHeight + "px",
                  ...positionPlace(),
                }}
              >
                {props.items.map((item) => (
                  <div
                    onClick={() => {
                      emit("clickItem", item);
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
                  emit("closePanel");
                },
              },
            ],
          ]
        )}
      </div>
    );
  },
});
