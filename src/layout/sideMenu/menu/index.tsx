import { defineComponent, reactive, withDirectives } from "vue";
import Tabs from "@/components/tab";
import TabItem from "@/components/tab/item";
import { sourceList } from "@/config/default";
import { useLayoutStore } from "@/store/layout";
import { dragDirective } from "@/directive/drag";
import styles from "@/style/module/layout.module.scss";

export default defineComponent({
  setup(props) {
    const state = reactive({
      isActive: sourceList[0]?.uid,
    });
    const layout = useLayoutStore();
    return () =>
      withDirectives(
        <div
          class={[
            styles.layout_menu_inner,
            layout.isCollapse && styles.is_collapse,
          ]}
        >
          <header class={styles.layout_menu_title}>
            <span class={styles.layout_menu_label}>资源管理器</span>
            <svg-icon
              iconClass="option"
              class={styles.layout_menu_option}
            ></svg-icon>
          </header>
          <Tabs v-model={state.isActive}>
            {sourceList.map((item) => (
              <TabItem icon={item.icon} label={item.label} value={item.uid}>
                <span>{item.enLabel}</span>
              </TabItem>
            ))}
          </Tabs>
        </div>,
        [[dragDirective, "", "", { horizontal: true }]]
      );
  },
});
