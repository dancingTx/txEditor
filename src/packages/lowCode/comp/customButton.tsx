import { defineComponent } from "vue";
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
  setup(props) {
    return () => <button class={[styles.custom_btn]}>{props.value}</button>;
  },
});
