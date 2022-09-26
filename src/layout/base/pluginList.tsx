import { defineComponent, reactive } from "vue";
import type { PropType } from "vue";
import styles from "@/style/module/layout.module.scss";
export interface PluginProps {
  uid: number | string;
  icon: string;
  label?: string;
}
export default defineComponent({
  props: {
    items: {
      type: Array as PropType<PluginProps[]>,
      default: () => [],
    },
  },
  setup(props) {
    const state = reactive({
      isActive: props.items[0]?.uid,
    });
    return () => (
      <div class={styles.plugin_box}>
        {props.items.map((item) => (
          <div
            class={state.isActive === item.uid && styles.is_active}
            onClick={() => (state.isActive = item.uid)}
          >
            <svg-icon
              iconClass={item.icon}
              class={styles.aside_icon}
            ></svg-icon>
            {item.label && <span>{item.label}</span>}
          </div>
        ))}
      </div>
    );
  },
});
