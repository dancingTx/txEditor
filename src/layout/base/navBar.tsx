import { defineComponent, reactive } from "vue";
import {
  widgets,
  NodeStatusVars,
  DarkModeVars,
  fileList,
  type Widget,
} from "@/config/default";
import { calcNavWidth } from "@/hook";
import { useLayoutStore } from "@/store/layout";
import styles from "@/style/module/layout.module.scss";
import styleFile from "@/style/module/file.module.scss";
export default defineComponent({
  setup() {
    const state = reactive<{
      isActive: string;
      isHover: string;
    }>({
      isActive: fileList[0].uid,
      isHover: "",
    });
    const layout = useLayoutStore();
    const renderDarkLight = () => (
      <div class={styles.darkset}>
        <svg-icon
          iconClass={layout.mode === DarkModeVars.Dark ? "dark" : "light"}
          class={styles.nav_icon}
          onClick={() => {
            layout.switchDarkMode();
          }}
        ></svg-icon>
      </div>
    );
    const renderPushPropsBar = () => (
      <div class={styles.nav_icon_transition}>
        <svg-icon
          iconClass="push"
          class={[styles.nav_icon, layout.isCollapseProp && styles.is_collapse]}
          onClick={() => layout.switchCollapse("props")}
        ></svg-icon>
      </div>
    );
    const renderWidgets = (type: Widget) => {
      return (
        {
          DarkMode: renderDarkLight(),
          Collapse: renderPushPropsBar(),
        } as Record<Widget, JSX.Element>
      )[type];
    };
    return () => (
      <div
        class={styles.layout_nav_bar_wrapper}
        style={{
          width: calcNavWidth(),
        }}
      >
        <div class={styles.layout_nav_bar}>
          {/* {fileList.map((file) => (
            <div
              class={[
                styles.layout_nav_bar__item,
                state.isActive === file.uid && styles.is_active,
              ]}
              onClick={() => (state.isActive = file.uid)}
              onMouseenter={() => (state.isHover = file.uid)}
              onMouseleave={() => (state.isHover = "")}
            >
              {file.icon && (
                <svg-icon
                  iconClass={file.icon}
                  class={styles.item_icon}
                ></svg-icon>
              )}
              <span
                class={[styleFile.file, styleFile[FileStatusVars[file.kind]]]}
              >
                {file.label}
              </span>
              <div class={styles.icon_close_outer}>
                {(file.uid === state.isActive ||
                  state.isHover === file.uid) && (
                  <svg-icon
                    iconClass="close"
                    class={styles.icon_close}
                  ></svg-icon>
                )}
              </div>
            </div>
          ))} */}
        </div>
        <div class={styles.layout_nav_settings}>
          {widgets.map((item) => item.icon && renderWidgets(item.command))}
        </div>
      </div>
    );
  },
});
