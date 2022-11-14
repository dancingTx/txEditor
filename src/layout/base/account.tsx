import { defineComponent, getCurrentInstance } from "vue";
import styles from "@/style/module/layout.module.scss";

export default defineComponent({
  setup() {
    const app = getCurrentInstance();
    return () => (
      <svg-icon
        iconClass="account"
        class={styles.aside_icon}
        {...{
          onClick: () => {
            app?.proxy?.$notify.warning("该功能正在开发中~");
          },
        }}
      ></svg-icon>
    );
  },
});
