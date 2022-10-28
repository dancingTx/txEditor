import { defineComponent } from "vue";
import PluginList from "./pluginList";
import Settings from "./settings";
import Account from "./account";
import { plugins } from "@/config/default";
import { useLayoutStore } from "@/store/layout";
import styles from "@/style/module/layout.module.scss";
const collectPlugins = () => {
  return plugins.map((plugin) => ({ path: plugin.path, ...plugin.meta }));
};
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
          <PluginList items={collectPlugins()}></PluginList>
        </div>
        <div class={styles.layout_aside_bottom}>
          <Account></Account>
          <Settings></Settings>
        </div>
      </div>
    );
  },
});
