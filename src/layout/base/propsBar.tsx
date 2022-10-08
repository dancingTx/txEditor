import { defineComponent, withDirectives, reactive } from "vue";
import Tabs from "@/components/tab";
import TabItem from "@/components/tab/item";
import { dragDirective } from "@/directive/drag";
import { attrList } from "@/config/default";
import styles from "@/style/module/layout.module.scss";
export default defineComponent({
  setup() {
    const state = reactive({
      isActive: attrList[0]?.uid,
    });
    return () =>
      withDirectives(
        <div class={styles.layout_props_bar}>
          <Tabs v-model={state.isActive}>
            {attrList.map((item) => (
              <TabItem icon={item.icon} label={item.label} value={item.uid}>
                <span>{item.enLabel}</span>
              </TabItem>
            ))}
          </Tabs>
        </div>,
        [[dragDirective, { orientation: "right" }, "", { horizontal: true }]]
      );
  },
});
