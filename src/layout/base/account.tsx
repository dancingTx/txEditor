import { defineComponent } from "vue";
import styles from "@/style/module/layout.module.scss";

export default defineComponent({
  setup() {
    return () => (
      <svg-icon iconClass="account" class={styles.aside_icon}></svg-icon>
    );
  },
});
