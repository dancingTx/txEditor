import { defineComponent, reactive, Transition, withDirectives } from "vue";
import { useGlobalStore } from "@/store/global";
import clickoutside from "@/directive/clickoutside";
import styles from "@/style/module/components.module.scss";
export default defineComponent({
  setup() {
    const state = reactive({
      searchMessage: "",
    });
    const global = useGlobalStore();
    const searchCommand = (evt: FocusEvent): void => {
      console.log("message", state.searchMessage);
    };
    return () => (
      <Transition name="slide-down">
        {global.showCommand &&
          withDirectives(
            <div class={styles.commands}>
              <section class={styles.search}>
                <input
                  v-model={state.searchMessage}
                  class={styles.search_inner}
                  type="text"
                  onBlur={searchCommand}
                />
              </section>
              <section class={styles.panel}>
                {global.commandOptions.map((options) => (
                  <section class={styles.panel_group}>
                    <span class={styles.panel_title}>{options.group}</span>
                    <section onClick={() => global.disposeCommand()}>
                      {options.children?.map((option) => (
                        <span
                          class={styles.panel_item}
                          style={{
                            color: option.color,
                          }}
                        >
                          {option.label}
                        </span>
                      ))}
                    </section>
                  </section>
                ))}
              </section>
            </div>,
            [
              [
                clickoutside,
                {
                  handler() {
                    global.disposeCommand();
                  },
                },
              ],
            ]
          )}
      </Transition>
    );
  },
});
