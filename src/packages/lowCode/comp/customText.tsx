import { defineComponent, ref, watch, type PropType } from "vue";
import type { ComponentInfo } from "@/config/default";
import styles from "@/style/module/components.module.scss";

export default defineComponent({
  props: {
    value: {
      type: String as PropType<ComponentInfo<string>>,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const modelValue = ref(props.value);
    watch(
      () => modelValue.value,
      (value) => {
        emit("update:modelValue", value);
      }
    );
    return () => (
      <textarea
        name=""
        id=""
        cols="10"
        rows="3"
        class={styles.custom_text}
        v-model={modelValue.value}
      ></textarea>
    );
  },
});
