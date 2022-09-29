import { defineComponent, type PropType } from "vue";
import styles from "@/style/module/components.module.scss";
export default defineComponent({
  props: {
    label: {
      type: String as PropType<string>,
      default: "",
    },
    value: {
      type: [String, Number] as PropType<string | number>,
      default: "",
    },
    icon: {
      type: String as PropType<string>,
      default: null,
    },
  },
  setup(props, { slots }) {
    return () => (
      <div class={styles.tab_item}>
        <div class={styles.tab_item__header}>
          {props.icon && (
            <svg-icon iconClass={props.icon} class={styles.tab_icon}></svg-icon>
          )}
          <span>{props.label}</span>
        </div>
        <div class={styles.tab_item__content}>
          {slots.default && slots.default()}
        </div>
      </div>
    );
  },
});
