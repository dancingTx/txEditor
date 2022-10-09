import { defineComponent } from "vue";
import { screenSize, commands } from "@/config/default";
import styles from "@/style/module/components.module.scss";
export default defineComponent({
  setup() {
    return () => (
      <div class={styles.toolkit}>
        <div class={styles.toolkit_canvas_size}>
          {screenSize.map((item) => (
            <div>
              <svg-icon
                iconClass={item.icon}
                class={styles.item_icon}
                tip={item.label}
              ></svg-icon>
            </div>
          ))}
        </div>
        <div class={styles.toolkit_command}>
          {commands.map((item) => (
            <div>
              <svg-icon
                iconClass={item.icon}
                class={styles.item_icon}
                tip={item.label}
              ></svg-icon>
            </div>
          ))}
        </div>
      </div>
    );
  },
});
