import { defineComponent, type PropType } from "vue";
import TreeNodeList from "@/packages/core/tree/NodeList";
import styles from "@/style/module/components.module.scss";

export const treeNodeList = new TreeNodeList();

export default defineComponent({
  props: {
    modelValue: String as PropType<string>,
  },
  setup(_, { slots }) {
    return () => (
      <div class={styles.tabs}>{slots.default && slots.default()}</div>
    );
  },
});
