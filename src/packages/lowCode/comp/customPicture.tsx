import { defineComponent, type PropType } from "vue";
import type { ComponentInfo } from "@/config/default";

export default defineComponent({
  props: {
    value: {
      type: String as PropType<ComponentInfo<string>>,
      required: true,
    },
  },
  setup(props) {
    return () => <img src={props.value} alt="" />;
  },
});
