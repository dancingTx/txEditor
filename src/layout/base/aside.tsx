import { defineComponent, reactive } from "vue";
import PluginList from "./pluginList";
import Settings from "./settings";
import Account from "./account";
import type { PluginProps } from "./pluginList";
import { makeUUID } from "@/shared/variables";
import styles from "@/style/module/layout.module.scss";
const pluginItem: Array<PluginProps> = [
  {
    uid: makeUUID(),
    icon: "file",
  },
  {
    uid: makeUUID(),
    icon: "account",
  },
];
export default defineComponent({
  setup() {
    const state = reactive({
      isCollapse: false,
    });
    return () => (
      <div class={styles.layout_aside}>
        <div class={styles.layout_aside_others}>
          {/* LOGO */}
          <svg-icon
            iconClass="collapse"
            class={[styles.aside_icon, state.isCollapse && styles.is_collapse]}
            onClick={() => (state.isCollapse = !state.isCollapse)}
          ></svg-icon>
        </div>
        <div class={styles.layout_aside_inner}>
          <PluginList items={pluginItem}></PluginList>
          <div class={styles.layout_box}>
            <Account></Account>
            <Settings></Settings>
          </div>
        </div>
      </div>
    );
  },
});
