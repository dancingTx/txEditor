import { defineComponent, Transition, withDirectives } from "vue";
import { useGlobalStore } from "@/store/global";
import clickoutside from "@/directive/clickoutside";
import styles from "@/style/module/components.module.scss";
export default defineComponent({
  setup() {
    const global = useGlobalStore();
    return () => (
      <Transition name="slide-down">
        {global.showCommand &&
          withDirectives(
            <div class={styles.commands}>
              <section class={styles.search}>
                <input class={styles.search_inner} type="text" />
              </section>
              <section class={styles.panel}>
                <section class={styles.panel_group}>
                  <span class={styles.panel_title}>主题</span>
                  <section>
                    <span class={styles.panel_item}>111</span>
                    <span class={styles.panel_item}>222</span>
                  </section>
                </section>
                <span class={styles.panel_item}>222</span>
              </section>
            </div>,
            [
              [
                clickoutside,
                {
                  handler() {
                    global.showCommand = false;
                  },
                },
              ],
            ]
          )}
      </Transition>
    );
  },
});
