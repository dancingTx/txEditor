import { defineComponent, onMounted, ref, getCurrentInstance } from "vue";
import bus from "@/shared";
import { useCommandStore, useContextMenuStore } from "@/store/global";
import { Vars, type SettingProps } from "@/config/default";
import styles from "@/style/module/layout.module.scss";

export default defineComponent({
  setup() {
    const app = getCurrentInstance();
    const ignoreElement = ref(null);
    const command = useCommandStore();
    const contextMenu = useContextMenuStore();

    const invokeContextMenu = () => {
      contextMenu.setPanelPos({
        left: Vars.__ASIDE_WIDTH__,
        bottom: Vars.__STATUS_BAR_HEIGHT__,
      });
      contextMenu.setPanelOrientation("left bottom");
      contextMenu.setPanelType("global:settings");
      if (app && app.uid) {
        contextMenu.setUniqueId(app.uid);
      }
      if (ignoreElement.value) {
        contextMenu.setIgnoreElement(ignoreElement.value);
      }
      contextMenu.show();
    };
    onMounted(() => {
      bus.on("contextMenu:clickItem", (info) => {
        if (contextMenu.uid === app?.uid) {
          command.invokeCommand(
            (info as SettingProps).command,
            (info as SettingProps).commandOptions
          );
          contextMenu.hide();
        }
      });
    });
    return () => (
      <svg-icon
        iconClass="setting"
        ref={ignoreElement}
        class={styles.aside_icon}
        onClick={invokeContextMenu}
      ></svg-icon>
    );
  },
});
