import { defineComponent } from "vue";
import Menu from "@/components/menu";
import { componentList } from "@/config/default";
import styles from "@/style/module/layout.module.scss";
export default defineComponent({
  setup() {
    const handleDropStart = (evt: DragEvent) => {
      evt.dataTransfer?.setData(
        "compIndex",
        (evt.target as HTMLElement).dataset.index || ""
      );
    };
    return () => (
      <div class={styles.less_code}>
        <Menu>
          <div class={styles.comp_wrapper} onDragstart={handleDropStart}>
            {componentList.map((comp, index) => (
              <div class={styles.comp_item} data-index={index} draggable>
                <svg-icon
                  iconClass={comp.icon}
                  class={styles.comp_icon}
                ></svg-icon>
                <span class={styles.comp_label}>{comp.label}</span>
              </div>
            ))}
          </div>
        </Menu>
      </div>
    );
  },
});
