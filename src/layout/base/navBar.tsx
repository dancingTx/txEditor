import { defineComponent, onMounted, reactive, watch } from "vue";
import bus from "@/shared/bus";
import {
  fileStatus,
  __MENU_WIDTH__,
  __ASIDE_WIDTH__,
  type SourceProps,
  type FileStatus,
} from "@/config/default";
import styles from "@/style/module/layout.module.scss";
import styleFile from "@/style/module/file.module.scss";
const fileList: (SourceProps & FileStatus)[] = [
  {
    uid: "1..dfafafa",
    label: "file.js",
    icon: "javascript",
    modify: true,
  },
  {
    uid: "2..fdsaafas",
    label: "file2.js",
    icon: "html",
    locked: true,
  },
  {
    uid: "3..ffafdsafs",
    label: "file3.js",
    icon: "css",
    deleted: true,
  },
  {
    uid: "4..ffafdsafs",
    label: "file3.js",
    icon: "css",
    created: true,
  },
];
export default defineComponent({
  setup() {
    const state = reactive<{
      isActive: string;
      isHover: string;
      menuWidth: number;
    }>({
      isActive: fileList[0].uid,
      isHover: "",
      menuWidth: __MENU_WIDTH__,
    });
    const makeStatusClass = (item: SourceProps & FileStatus): string => {
      for (const key of Object.keys(item)) {
        if (fileStatus.includes(key)) {
          return `is_${key}`;
        }
      }
      return "";
    };
    onMounted(() => {
      bus.on("menuWidth", (width) => {
        state.menuWidth = width as number;
      });
    });
    return () => (
      <div class={styles.layout_nav_bar_wrapper}>
        <div
          class={styles.layout_nav_bar}
          style={{
            width: `calc(100vw - ${__MENU_WIDTH__}px - ${__ASIDE_WIDTH__}px - ${state.menuWidth}px)`,
          }}
        >
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
              <span class={[styleFile.file, styleFile[makeStatusClass(file)]]}>
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
      </div>
    );
  },
});
