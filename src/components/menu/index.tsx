import { defineComponent, reactive } from "vue";
import Tabs from "@/components/tab";
import TabItem from "@/components/tab/item";
import { definePropType } from "@/shared";
import type { ExtraPropsEn } from "@/@types/core";

export default defineComponent({
  props: {
    items: {
      type: definePropType<ExtraPropsEn[]>(Array),
      default: () => [],
    },
  },
  emits: ["clickContextMenu"],
  setup(props, { slots, emit }) {
    const state = reactive({
      isActive: "",
    });
    return () =>
      props.items.length ? (
        <Tabs v-model={state.isActive}>
          {props.items.map((item) => (
            <TabItem
              item={item}
              total={props.items.length}
              onHeaderClick={(info) => {
                state.isActive = state.isActive === info.uid ? "" : info.uid;
              }}
              onHeaderContextMenu={() => emit("clickContextMenu", item)}
              hasTitle
            >
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
