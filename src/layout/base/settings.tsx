import { defineComponent, reactive } from "vue";
import Panel from "@/components/panel";
import { settings, type SettingProps } from "@/config/default";
import { useGlobalStore } from "@/store/global";
import styles from "@/style/module/layout.module.scss";
export default defineComponent({
  setup() {
    const state = reactive({
      showPanel: false,
    });
    const global = useGlobalStore();
    return () => (
      <Panel
        items={settings}
        showPanel={state.showPanel}
        onClosePanel={() => (state.showPanel = false)}
        onClickItem={(item: SettingProps) => {
          global.invokeCommand(item.command, item.commandOptions);
          state.showPanel = false;
        }}
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
