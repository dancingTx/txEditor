import { defineComponent, type PropType } from "vue";
import styles from "@/style/module/components.module.scss";

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
