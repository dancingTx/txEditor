import { defineComponent } from "vue";
import styles from "@/style/module/layout.module.scss";

export default defineComponent({
  setup() {
    return () => <div class={styles.layout_aside}>aside</div>;
  },
});
