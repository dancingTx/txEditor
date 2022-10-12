import { defineComponent, reactive } from "vue";
import Panel from "@/components/panel";
import { settings } from "@/config/default";
import styles from "@/style/module/layout.module.scss";
export default defineComponent({
  setup() {
    const state = reactive({
      showPanel: false,
    });
    return () => (
      <Panel
        items={settings}
        showPanel={state.showPanel}
        onClosePanel={() => (state.showPanel = false)}
      >
        {{
          handle: () => (
            <svg-icon
              iconClass="setting"
              class={styles.aside_icon}
              onClick={() => (state.showPanel = true)}
            ></svg-icon>
          ),
        }}
      </Panel>
    );
  },
});
