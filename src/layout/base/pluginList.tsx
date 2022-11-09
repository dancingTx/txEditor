import { defineComponent, reactive, type PropType } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { useI18nTitle } from "@/hook";
import { useLayoutStore } from "@/store/layout";
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
    const route = useRoute();
    const layout = useLayoutStore();
    const state = reactive({
      isActive: route.name,
    });

    const item = props.items.find((item) => item.path === state.isActive);
    if (item) {
      layout.storePluginUid(item.uid, item.namespace);
    }

    const goto = (item: PluginProps) => {
      state.isActive = item.path;
      layout.storePluginUid(item.uid, item.namespace);
      return router.push({
        name: item.path,
      });
    };

    return () => (
      <div class={styles.plugin_box}>
        {props.items.map((item) => (
          <div
            data-label={useI18nTitle(item)}
            class={item.label && styles.aside_label}
          >
            <div
              class={[state.isActive === item.path && styles.is_active]}
              onClick={() => goto(item)}
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
