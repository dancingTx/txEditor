import { defineComponent, reactive, withDirectives, type PropType } from "vue";
import { dragDirective } from "@/directive/drag";
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
    const state = reactive({
      isCollapse: false,
    });
    return () => (
      <div class={styles.tab_item}>
        <div
          class={[
            styles.tab_item__header,
            state.isCollapse && styles.is_collapse,
          ]}
          onClick={() => (state.isCollapse = !state.isCollapse)}
        >
          {props.icon && (
            <svg-icon iconClass={props.icon} class={styles.tab_icon}></svg-icon>
          )}
          <span>{props.label}</span>
        </div>
        {withDirectives(
          <div
            class={[
              styles.tab_item__content,
              state.isCollapse && styles.is_collapse,
            ]}
          >
            {slots.default && slots.default()}
          </div>,
          [[dragDirective, "", "", { vertical: true }]]
        )}
      </div>
    );
  },
});
