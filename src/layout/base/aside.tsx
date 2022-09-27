import { defineComponent } from "vue";
import PluginList from "./pluginList";
import Settings from "./settings";
import Account from "./account";
import type { PluginProps } from "./pluginList";
import { useLayoutStore } from "@/store/layout";
import { makeUUID } from "@/shared/variables";
import styles from "@/style/module/layout.module.scss";
const pluginItem: Array<PluginProps> = [
  {
    uid: makeUUID(),
    icon: "edit",
  },
  {
    uid: makeUUID(),
    icon: "code",
  },
];
export default defineComponent({
  setup() {
    const layout = useLayoutStore();

    return () => (
      <div class={styles.layout_aside}>
        <div class={styles.layout_aside_top}>
          {/* LOGO */}
          {layout.hasMenu && (
            <svg-icon
              iconClass="collapse"
              class={[
                styles.aside_icon,
                layout.isCollapse && styles.is_collapse,
              ]}
              onClick={() => layout.switchCollapse()}
            ></svg-icon>
          )}
          <PluginList items={pluginItem}></PluginList>
        </div>
        <div class={styles.layout_aside_bottom}>
          <Account></Account>
          <Settings></Settings>
        </div>
      </div>
    );
  },
});
