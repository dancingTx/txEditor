import { defineComponent } from "vue";
import Aside from "./base/aside";
import SideMenu from "./sideMenu";
import PropsBar from "./base/propsBar";
import StatusBar from "./base/statusBar";
import { useLayoutStore } from "@/store/layout";
import styles from "@/style/module/layout.module.scss";

export default defineComponent({
  setup() {
    const layout = useLayoutStore();
    return () => (
      <div
        class={[styles.txeditor, styles[layout.mode]]}
        onContextmenu={(evt: MouseEvent) => evt.preventDefault()}
      >
        <div class={styles.txeditor_inner}>
          <Aside></Aside>
          <div class={styles.layout_main_view}>
            {layout.hasMenu ? (
              <SideMenu></SideMenu>
            ) : (
              <router-view></router-view>
            )}
          </div>
          {layout.hasPropsBar && <PropsBar></PropsBar>}
        </div>
        <StatusBar></StatusBar>
      </div>
    );
  },
});
