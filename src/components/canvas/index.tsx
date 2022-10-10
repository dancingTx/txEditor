import { defineComponent, reactive, watch } from "vue";
import { calcNavWidth } from "@/hook";
import { useLayoutStore } from "@/store/layout";
import { screen2BodyRatio } from "@/shared/tool";
import { __CANVAS_WIDTH__, screenSize } from "@/config/default";
import styles from "@/style/module/components.module.scss";
export default defineComponent({
  setup() {
    const state = reactive<{
      canvasWidth: number;
      canvasHeight: number;
    }>({
      canvasWidth: __CANVAS_WIDTH__,
      canvasHeight: screen2BodyRatio(__CANVAS_WIDTH__, "4:3"),
    });
    const layout = useLayoutStore();
    watch(
      () => layout.canvasSize,
      (size: string) => {
        const screenItem = screenSize.find((item) => item.icon === size);
        if (screenItem && screenItem.gte) {
          state.canvasWidth = screenItem.gte;
          state.canvasHeight = screen2BodyRatio(screenItem.gte, "4:3");
        }
      }
    );

    return () => (
      <div class={styles.canvas_wrapper} style={{ width: calcNavWidth() }}>
        <div
          class={styles.canvas}
          style={{
            width: state.canvasWidth + "px",
            height: state.canvasHeight + "px",
          }}
        >
          1
        </div>
      </div>
    );
  },
});
