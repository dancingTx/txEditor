import { defineComponent, reactive } from "vue";
import {
  fileStatus,
  type SourceProps,
  type FileStatus,
} from "@/config/default";
import { calcNavWidth } from "@/hook";
import { useLayoutStore } from "@/store/layout";
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
    icon: "javascript",
    created: true,
  },
  {
    uid: "4..ffafdsafs",
    label: "file3.js",
    icon: "javascript",
    created: true,
  },
  {
    uid: "4..ffafdsafs",
    label: "file3.js",
    icon: "javascript",
    created: true,
  },
  {
    uid: "4..ffafdsafs",
    label: "file3.js",
    icon: "javascript",
    created: true,
  },
  {
    uid: "4..ffafdsafs",
    label: "file3.js",
    icon: "javascript",
    created: true,
  },
  {
    uid: "4..ffafdsafs",
    label: "file3.js",
    icon: "javascript",
    created: true,
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
    }>({
      isActive: fileList[0].uid,
      isHover: "",
    });
    const makeStatusClass = (item: SourceProps & FileStatus): string => {
      for (const key of Object.keys(item)) {
        if (fileStatus.includes(key)) {
          return `is_${key}`;
        }
      }
      return "";
    };
    const layout = useLayoutStore();
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
        <div class={styles.layout_nav_settings}>
          <div class={styles.nav_icon_transition}>
            <svg-icon
              iconClass="push"
              class={[
                styles.nav_icon,
                layout.isCollapseProp && styles.is_collapse,
              ]}
              onClick={() => layout.switchCollapse("props")}
            ></svg-icon>
          </div>
        </div>
      </div>
    );
  },
});
