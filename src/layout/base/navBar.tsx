import { defineComponent, reactive } from "vue";
import {
  widgets,
  FileStatusVars,
  type FileProps,
  type Command,
} from "@/config/default";
import { calcNavWidth } from "@/hook";
import { useLayoutStore } from "@/store/layout";
import { useGlobalStore } from "@/store/global";
import styles from "@/style/module/layout.module.scss";
import styleFile from "@/style/module/file.module.scss";
const fileList: FileProps[] = [
  {
    uid: "1..dfafafa",
    label: "file.js",
    icon: "javascript",
    kind: "Modify",
  },
  {
    uid: "2..fdsaafas",
    label: "file2.js",
    icon: "html",
    kind: "Locked",
  },
  {
    uid: "3..ffafdsafs",
    label: "file3.js",
    icon: "css",
    kind: "Deleted",
  },
  {
    uid: "4..ffafdsafs",
    label: "file3.js",
    icon: "javascript",
    kind: "Created",
  },
];
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
    const global = useGlobalStore();
    const renderDarkLight = () => (
      <div class={styles.darkset}>
        <svg-icon
          iconClass={layout.mode}
          class={styles.nav_icon}
          onClick={() => {
            global.invokeCommand("DarkMode", false);
            // layout.switchDarkMode(layout.mode === "dark" ? "light" : "dark");
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
    const renderWidgets = (type: Command) => {
      return (
        {
          DarkMode: renderDarkLight(),
          Collapse: renderPushPropsBar(),
        } as Record<Command, JSX.Element>
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
          {fileList.map((file) => (
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
          ))}
        </div>
        <div class={styles.layout_nav_settings}>
          {widgets.map((item) => item.icon && renderWidgets(item.command))}
        </div>
      </div>
    );
  },
});
