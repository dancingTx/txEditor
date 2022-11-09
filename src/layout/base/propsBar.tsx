import { defineComponent, withDirectives, reactive } from "vue";
import Tabs from "@/components/tab";
import TabItem from "@/components/tab/item";
import { dragDirective } from "@/directive/drag";
import { useLayoutStore } from "@/store/layout";
import { attrList } from "@/config/default";
import styles from "@/style/module/layout.module.scss";

export default defineComponent({
  setup() {
    const state = reactive({
      isActive: "",
    });
    const layout = useLayoutStore();
    return () =>
      withDirectives(
        <div
          class={[
            styles.layout_props_bar,
            layout.isCollapseProp && styles.is_collapse,
          ]}
        >
          <Tabs v-model={state.isActive}>
            {attrList.map((item) => (
              <TabItem
                item={item}
                total={attrList.length}
                onHeaderClick={(info) => {
                  state.isActive = state.isActive === info.uid ? "" : info.uid;
                }}
              ></TabItem>
            ))}
          </Tabs>
        </div>,
        [
          [
            dragDirective,
            { locked: true, orientation: "right" },
            "",
            { horizontal: true },
          ],
        ]
      );
  },
});
