import { defineComponent, type PropType } from "vue";
import type { ComponentInfo } from "@/config/default";

export default defineComponent({
  props: {
    componentInfo: {
      type: String as PropType<ComponentInfo<string>>,
      required: true,
    },
  },
  setup(props) {
    return () => <button>{props.componentInfo}</button>;
  },
});
