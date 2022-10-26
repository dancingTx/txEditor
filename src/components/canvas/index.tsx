import { defineComponent, reactive, watch } from "vue";
import { calcNavWidth } from "@/hook";
import { useLayoutStore } from "@/store/layout";
import styles from "@/style/module/components.module.scss";
export default defineComponent({
  setup(props, { slots }) {
    const layout = useLayoutStore();
    const state = reactive({
      canvasWidth: layout.canvasWidth,
      canvasHeight: layout.canvasHeight,
    });
    watch(
      () => [layout.canvasWidth, layout.canvasHeight],
      ([width, height]) => {
        state.canvasWidth = width as number;
        state.canvasHeight = height as number;
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
