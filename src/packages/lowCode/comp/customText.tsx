import { computed, defineComponent, type PropType } from "vue";
import type { ComponentInfo } from "@/config/default";

export default defineComponent({
  props: {
    componentInfo: {
      type: String as PropType<ComponentInfo<string>>,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const modelValue = computed(() => ({
      get() {
        return props.componentInfo;
      },
      set(value: string) {
        emit("update:modelValue", value);
      },
    }));
    return () => (
      <textarea
        name=""
        id=""
        cols="10"
        rows="3"
        v-model={modelValue}
      ></textarea>
    );
  },
});
