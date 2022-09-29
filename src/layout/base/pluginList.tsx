import { defineComponent, reactive, type PropType } from "vue";
import type { PluginProps } from "@/config/default";
import styles from "@/style/module/layout.module.scss";

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
