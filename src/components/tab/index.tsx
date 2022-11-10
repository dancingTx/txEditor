import { defineComponent } from "vue";
import { definePropType } from "@/shared";
import styles from "@/style/module/components.module.scss";

export default defineComponent({
  props: {
    modelValue: definePropType<string>(String),
  },
  setup(_, { slots }) {
    return () => (
      <div class={styles.tabs}>{slots.default && slots.default()}</div>
    );
  },
});
