import { defineComponent, reactive, type PropType } from "vue";
import Tabs from "@/components/tab";
import TabItem from "@/components/tab/item";
import type { SourceProps } from "@/config/default";

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<SourceProps[]>,
      default: () => [],
    },
  },
  setup(props, { slots }) {
    const state = reactive({
      isActive: props.items[0]?.uid,
    });
    return () =>
      props.items.length ? (
        <Tabs v-model={state.isActive}>
          {props.items.map((item) => (
            <TabItem item={item}>
              {item.enLabel
                ? slots[item.enLabel] && (slots[item.enLabel] as () => {})()
                : slots.default && slots.default()}
            </TabItem>
          ))}
        </Tabs>
      ) : (
        slots.default && slots.default()
      );
  },
});
