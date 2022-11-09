import { defineComponent, type PropType } from "vue";
import type { ComponentInfo } from "@/config/default";
import styles from "@/style/module/components.module.scss";

export default defineComponent({
  props: {
    value: {
      type: String as PropType<ComponentInfo<string>>,
      required: true,
    },
  },
  setup(props) {
    return () => <button class={[styles.custom_btn]}>{props.value}</button>;
  },
});
