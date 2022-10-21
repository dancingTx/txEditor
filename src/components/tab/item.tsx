import { defineComponent, reactive, withDirectives, type PropType } from "vue";
import { dragDirective } from "@/directive/drag";
import type { SourceProps } from "@/config/default";
import styles from "@/style/module/components.module.scss";

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<SourceProps>,
      default: () => ({}),
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
          {props.item?.icon && (
            <svg-icon
              iconClass={props.item?.icon}
              class={styles.tab_icon}
            ></svg-icon>
          )}
          <span>{props.item?.label}</span>
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
