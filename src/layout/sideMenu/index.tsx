import {
  defineComponent,
  h,
  KeepAlive,
  ref,
  resolveComponent,
  watch,
} from "vue";
import Menu from "./menu";
import NavBar from "../base/navBar";
import { plugins, type PluginProps } from "@/config/default";
import { compoundComponents } from "@/shared/component";
import { useLayoutStore } from "@/store/layout";
import { useI18nTitle } from "@/hook";
import styles from "@/style/module/layout.module.scss";
const collectPlugins = () => plugins.map((plugin) => plugin.meta);
const components = compoundComponents(collectPlugins(), "menuComp");
export default defineComponent({
  components,
  setup() {
    const pluginItem = ref<PluginProps>();
    const layout = useLayoutStore();
    watch(
      () => layout.pluginUid,
      (uid) => {
        for (const item of collectPlugins()) {
          if (item.uid === uid) {
            pluginItem.value = item;
            break;
          }
        }
      },
      {
        immediate: true,
      }
    );
    return () => (
      <div class={styles.layout_menu}>
        <Menu title={useI18nTitle(pluginItem.value)}>
          {pluginItem.value?.menuComp && (
            <KeepAlive>{h(resolveComponent(pluginItem.value?.uid))}</KeepAlive>
          )}
        </Menu>
        <div class={styles.layout_menu_main}>
          <NavBar></NavBar>
          <router-view></router-view>
        </div>
      </div>
    );
  },
});
