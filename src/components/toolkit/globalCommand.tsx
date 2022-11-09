import {
  defineComponent,
  reactive,
  Transition,
  withDirectives,
  getCurrentInstance,
  computed,
} from "vue";
import type { GlobalCommand } from "./command/command";
import { useCommandStore } from "@/store/global";
import { clickOutside } from "@/directive/clickoutside";
import { useI18nTitle } from "@/hook";
import type { CommandGroupItem } from "@/config/default";
import styles from "@/style/module/components.module.scss";

export default defineComponent({
  setup() {
    const app = getCurrentInstance();
    const state = reactive({
      searchMessage: "",
    });

    const globalCommand = computed(() => app?.proxy?.$globalCommand)
      .value as GlobalCommand;
    const global = useCommandStore();
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
                    <span class={styles.panel_title}>
                      {useI18nTitle(options, "group")}
                    </span>
                    <section>
                      {options.children?.map((option) => (
                        <span
                          class={styles.panel_item}
                          style={{
                            color: option.color,
                          }}
                          onClick={() => executeCommand(option)}
                        >
                          {useI18nTitle(option)}
                        </span>
                      ))}
                    </section>
                  </section>
                ))}
              </section>
            </div>,
            [
              [
                clickOutside,
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
