import { defineComponent, ref, watch, type PropType } from "vue";
import styles from "@/style/module/components.module.scss";
import type { ComponentInfo } from "@/@types";

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
