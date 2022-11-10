import { defineComponent, reactive, watch } from "vue";
import { calcNavWidth } from "@/hook";
import { useLayoutStore } from "@/store/layout";
import styles from "@/style/module/components.module.scss";
import type { CanvasData } from "@/@types";

export default defineComponent({
  setup(_, { slots }) {
    const layout = useLayoutStore();
    const state = reactive<CanvasData>({
      canvasWidth: layout.canvasWidth,
      canvasHeight: layout.canvasHeight,
    });
    watch(
      () => [layout.canvasWidth, layout.canvasHeight],
      ([width, height]) => {
        state.canvasWidth = width;
        state.canvasHeight = height;
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
          {slots.default && slots.default()}
        </div>
      </div>
    );
  },
});
