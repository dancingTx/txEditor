import { computed, defineComponent, type PropType } from "vue";
import type { SourceProps } from "@/config/default";
import styles from "@/style/module/components.module.scss";
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
