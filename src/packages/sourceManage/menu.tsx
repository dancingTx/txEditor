import { defineComponent, reactive } from "vue";
import Tabs from "@/components/tab";
import TabItem from "@/components/tab/item";

import { sourceList } from "@/config/default";

export default defineComponent({
  setup() {
    const state = reactive({
      isActive: sourceList[0]?.uid,
    });
    return () => (
      <Tabs v-model={state.isActive}>
        {sourceList.map((item) => (
          <TabItem icon={item.icon} label={item.label} value={item.uid}>
            <span>{item.enLabel}</span>
          </TabItem>
        ))}
      </Tabs>
    );
  },
});
