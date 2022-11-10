import { defineComponent, type PropType } from "vue";
import styles from "@/style/module/components.module.scss";
import type { ComponentInfo } from "@/@types";

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
