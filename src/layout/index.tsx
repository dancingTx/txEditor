import { defineComponent } from "vue";
import Aside from "./base/aside";
import ConfigToolBar from "./base/configToolBar";
import styles from "@/style/module/layout.module.scss";
export default defineComponent({
  setup() {
    return () => (
      <div class={styles.txeditor}>
        <Aside></Aside>
        <div class={styles.layout_main_view}>
          <ConfigToolBar></ConfigToolBar>
          <router-view></router-view>
        </div>
      </div>
    );
  },
});
