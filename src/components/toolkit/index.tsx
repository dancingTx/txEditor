import { defineComponent, reactive } from "vue";
import {
  screenSize,
  commands,
  __CANVAS_WIDTH__,
  type ScreenProps,
} from "@/config/default";
import { useLayoutStore } from "@/store/layout";
import { screen2BodyRatio } from "@/shared/tool";
import styles from "@/style/module/components.module.scss";
export default defineComponent({
  setup() {
    const state = reactive({
      isActiveScreenSize: "",
      isManual: true,
      canvasWidth: 0,
      canvasHeight: 0,
    });
    const resizeScreen = (item: ScreenProps): void => {
      state.isManual = false;
      state.isActiveScreenSize = item.uid;
      if (item.gte) {
        state.canvasWidth = item.gte;
      }
      const layout = useLayoutStore();
      layout.storeCanvasSize(item.icon || "");
      if (item.icon === "manual") {
        state.canvasWidth = state.canvasWidth || __CANVAS_WIDTH__;
        state.canvasHeight = screen2BodyRatio(state.canvasWidth, "4:3");
        state.isManual = true;
      }
    };
    return () => (
      <div class={styles.toolkit}>
        <div class={styles.toolkit_canvas_size}>
          {screenSize.map((item) => (
            <div
              class={[
                styles.canvas_size_wrapper,
                state.isActiveScreenSize === item.uid && styles.is_active,
              ]}
              onClick={() => resizeScreen(item)}
            >
              <svg-icon
                iconClass={item.icon}
                class={styles.item_icon}
                tip={item.label}
              ></svg-icon>
            </div>
          ))}
          {state.isManual && (
            <div class={styles.is_manual}>
              <input
                v-model={state.canvasWidth}
                type="text"
                class={styles.manual_width}
              />
              <svg-icon iconClass="close"></svg-icon>
              <input
                v-model={state.canvasHeight}
                type="text"
                class={styles.manual_height}
              />
            </div>
          )}
        </div>
        <div class={styles.toolkit_command}>
          {commands.map((item) => (
            <div class={[styles.canvas_size_wrapper]}>
              <svg-icon
                iconClass={item.icon}
                class={styles.item_icon}
                tip={item.label}
              ></svg-icon>
            </div>
          ))}
        </div>
      </div>
    );
  },
});
