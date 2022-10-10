import { defineComponent } from "vue";
import PluginList from "./pluginList";
import Settings from "./settings";
import Account from "./account";
import { pluginList } from "@/config/default";
import { useLayoutStore } from "@/store/layout";
import styles from "@/style/module/layout.module.scss";
export default defineComponent({
  setup() {
    const layout = useLayoutStore();

    return () => (
      <div class={styles.layout_aside}>
        <div class={styles.layout_aside_top}>
          <svg-icon iconClass="logo" class={styles.aside_icon}></svg-icon>
          {layout.hasMenu && (
            <svg-icon
              iconClass="collapse"
              class={[
                styles.aside_icon,
                layout.isCollapse && styles.is_collapse,
              ]}
              onClick={() => layout.switchCollapse("menu")}
            ></svg-icon>
          )}
          <PluginList items={pluginList}></PluginList>
        </div>
        <div class={styles.layout_aside_bottom}>
          <Account></Account>
          <Settings></Settings>
        </div>
      </div>
    );
  },
});
