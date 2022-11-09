import { defineComponent } from "vue";
import styles from "@/style/module/layout.module.scss";

export default defineComponent({
  setup() {
    return () => (
      <div class={styles.status_bar}>
        <span>-----------txeditor-----------</span>
      </div>
    );
  },
});
