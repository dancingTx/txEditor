import {
  defineComponent,
  h,
  ref,
  resolveComponent,
  watch,
  type Component,
} from "vue";
import Menu from "./menu";
import { pluginList, type PluginProps } from "@/config/default";
import { useLayoutStore } from "@/store/layout";
import styles from "@/style/module/layout.module.scss";
const compoundComponents = (list: PluginProps[]): Record<string, Component> => {
  return list.reduce((total, curr) => {
    total[curr.componentName] = curr.component;
    return total;
  }, {} as Record<string, Component>);
};
const components = compoundComponents(pluginList);
export default defineComponent({
  components,
  setup() {
    const pluginItem = ref<PluginProps>();
    const layout = useLayoutStore();
    watch(
      () => layout.pluginUid,
      (uid) => {
        for (const item of pluginList) {
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
        <Menu title={pluginItem?.value?.label}>
          {pluginItem.value?.component &&
            h(resolveComponent(pluginItem.value?.componentName))}
        </Menu>
        <router-view class={styles.layout_menu_main}></router-view>
      </div>
    );
  },
});
