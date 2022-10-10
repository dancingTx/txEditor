import { defineComponent, withDirectives, type PropType } from "vue";
import { useLayoutStore } from "@/store/layout";
import { dragDirective } from "@/directive/drag";
import styles from "@/style/module/layout.module.scss";
export default defineComponent({
  props: {
    title: {
      type: String as PropType<string>,
      default: "",
    },
  },
  setup(props, { slots }) {
    const layout = useLayoutStore();
    return () =>
      withDirectives(
        <div
          class={[
            styles.layout_menu_inner,
            layout.isCollapse && styles.is_collapse,
          ]}
        >
          <header class={styles.layout_menu_title}>
            <span class={styles.layout_menu_label}>{props.title}</span>
            <svg-icon
              iconClass="option"
              class={styles.layout_menu_option}
            ></svg-icon>
          </header>
          {slots.default && slots.default()}
        </div>,
        [[dragDirective, { locked: true }, "", { horizontal: true }]]
      );
  },
});
