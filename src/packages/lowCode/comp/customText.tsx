import { defineComponent, ref, watch } from "vue";
import { definePropType } from "@/shared";
import styles from "@/style/module/components.module.scss";
import type { ComponentInfo } from "@/@types";

export default defineComponent({
  props: {
    value: {
      type: definePropType<ComponentInfo<string>>(String),
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
