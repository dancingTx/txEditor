import { defineComponent } from "vue";
import type { SourceProps } from "@/config/default";
import styles from "@/style/module/layout.module.scss";
const fileList: SourceProps[] = [
  {
    uid: "1..dfafafa",
    label: "file.js",
    icon: "javascript",
  },
  {
    uid: "2..fdsaafas",
    label: "file2.js",
    icon: "html",
  },
  {
    uid: "3..ffafdsafs",
    label: "file3.js",
    icon: "css",
  },
];
export default defineComponent({
  setup() {
    return () => (
      <div class={styles.layout_nav_bar}>
        {fileList.map((file) => (
          <div class={styles.layout_nav_bar__item}>
            {file.icon && (
              <svg-icon
                iconClass={file.icon}
                class={styles.item_icon}
              ></svg-icon>
            )}
            <span>{file.label}</span>
          </div>
        ))}
      </div>
    );
  },
});
