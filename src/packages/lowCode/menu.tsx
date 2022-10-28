import { defineComponent } from "vue";
import Menu from "@/components/menu";
import { componentList } from "@/config/default";
import styles from "@/style/module/layout.module.scss";
export default defineComponent({
  setup() {
    return () => (
      <div class={styles.less_code}>
        <Menu>
          <div class={styles.comp_wrapper}>
            {componentList.map((comp) => (
              <div class={styles.comp_item}>{comp.label}</div>
            ))}
          </div>
        </Menu>
      </div>
    );
  },
});
