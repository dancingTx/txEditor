import {
  defineComponent,
  reactive,
  Transition,
  withDirectives,
  type PropType,
} from "vue";
import clickoutside from "@/directive/clickoutside";
import { screen2BodyRatio } from "@/shared/tool";
import { __PANEL_WIDTH__, type SourceProps } from "@/config/default";
import { useGlobalStore } from "@/store/global";
import styles from "@/style/module/components.module.scss";

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<SourceProps[]>,
      default: () => [],
    },
    showPanel: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ["closePanel"],
  setup(props, { slots, emit }) {
    const state = reactive({
      panelWidth: __PANEL_WIDTH__,
      panelHeight: screen2BodyRatio(__PANEL_WIDTH__, "3:4"),
    });
    const global = useGlobalStore();
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
                }}
              >
                {props.items.map((item) => (
                  <div onClick={() => emit("closePanel")}>
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
              clickoutside,
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
