import { defineComponent } from "vue";
import { useLayoutStore } from "@/store/layout";
import styles from "@/style/module/layout.module.scss";
export default defineComponent({
  setup() {
    const layout = useLayoutStore();
    return () => (
      <div
        class={[
          styles.layout_menu_inner,
          layout.isCollapse && styles.is_collapse,
        ]}
      >
        111
      </div>
    );
  },
});
