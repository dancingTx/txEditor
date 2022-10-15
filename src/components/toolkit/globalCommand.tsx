import {
  defineComponent,
  reactive,
  Transition,
  withDirectives,
  getCurrentInstance,
  computed,
} from "vue";
import type { CommandGroupItem } from "@/config/default";
import type { GlobalCommand } from "./command/command";
import { useGlobalStore } from "@/store/global";
import clickoutside from "@/directive/clickoutside";
import styles from "@/style/module/components.module.scss";

export default defineComponent({
  setup() {
    const app = getCurrentInstance();
    const state = reactive({
      searchMessage: "",
    });
    const globalCommand = computed(
      () => app?.appContext.config.globalProperties.globalCommand
    ).value as GlobalCommand;
    const global = useGlobalStore();
    const searchCommand = (evt: FocusEvent): void => {
      console.log("message", state.searchMessage);
    };
    const executeCommand = (option: CommandGroupItem) => {
      globalCommand.invokeCommand(global.command, option);
      globalCommand.execute();
      global.disposeCommand();
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
                    <section>
                      {options.children?.map((option) => (
                        <span
                          class={styles.panel_item}
                          style={{
                            color: option.color,
                          }}
                          onClick={() => executeCommand(option)}
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
