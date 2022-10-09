import { defineComponent, reactive, type PropType } from "vue";
import type { PluginProps } from "@/config/default";
import { useLayoutStore } from "@/store/layout";
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
    const storePluginUid = (uid: string) => {
      state.isActive = uid;
      const layout = useLayoutStore();
      layout.storePluginUid(uid);
    };
    storePluginUid(state.isActive);
    return () => (
      <div class={styles.plugin_box}>
        {props.items.map((item) => (
          <div data-label={item.label} class={item.label && styles.aside_label}>
            <div
              class={[state.isActive === item.uid && styles.is_active]}
              onClick={() => storePluginUid(item.uid)}
            >
              <svg-icon
                iconClass={item.icon}
                class={styles.aside_icon}
              ></svg-icon>
            </div>
          </div>
        ))}
      </div>
    );
  },
});
