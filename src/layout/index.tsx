import { defineComponent } from "vue";
import Aside from "./base/aside";
import SideMenu from "./sideMenu";
import { useLayoutStore } from "@/store/layout";
import styles from "@/style/module/layout.module.scss";

export default defineComponent({
  setup() {
    const layout = useLayoutStore();
    return () => (
      <div class={styles.txeditor}>
        <Aside></Aside>
        <div class={styles.layout_main_view}>
          {layout.hasMenu ? <SideMenu></SideMenu> : <router-view></router-view>}
        </div>
      </div>
    );
  },
});