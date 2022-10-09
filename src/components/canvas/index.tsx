import { defineComponent, onMounted, ref } from "vue";
import bus from "@/shared/bus";
import { __MENU_WIDTH__, __ASIDE_WIDTH__ } from "@/config/default";
import styles from "@/style/module/components.module.scss";
export default defineComponent({
  setup() {
    const menuWidth = ref(__MENU_WIDTH__);
    onMounted(() => {
      bus.on("menuWidth", (width) => {
        menuWidth.value = width as number;
      });
    });
    return () => (
      <div
        class={styles.canvas_wrapper}
        style={{
          width: `calc(100vw - ${__MENU_WIDTH__}px - ${__ASIDE_WIDTH__}px - ${menuWidth.value}px)`,
        }}
      >
        <div class={styles.canvas}>1</div>
      </div>
    );
  },
});
