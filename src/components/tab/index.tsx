import { computed, defineComponent, type PropType } from "vue";
import TreeNodeList from "@/packages/core/tree/NodeList";
import type { SourceProps } from "@/config/default";
import styles from "@/style/module/components.module.scss";

export const treeNodeList = new TreeNodeList();

export default defineComponent({
  props: {
    modelValue: String,
  },
  emits: ["update:modelValue"],
  setup(props, { slots, emit }) {
    const modelValue = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      },
    });
    return () => (
      <div class={styles.tabs}>{slots.default && slots.default()}</div>
    );
  },
});
