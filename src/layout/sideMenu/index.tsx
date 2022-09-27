import { defineComponent } from "vue";
import Menu from "./menu";
import styles from "@/style/module/layout.module.scss";
export default defineComponent({
  setup() {
    return () => (
      <div class={styles.layout_menu}>
        <Menu></Menu>
        <router-view class={styles.layout_menu_main}></router-view>
      </div>
    );
  },
});
