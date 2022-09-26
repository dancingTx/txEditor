import { defineComponent } from "vue";
import styles from "@/style/module/layout.module.scss";
export default defineComponent({
  setup() {
    return () => (
      <svg-icon iconClass="setting" class={styles.aside_icon}></svg-icon>
    );
  },
});
