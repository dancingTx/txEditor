import { computed, defineComponent, reactive, Transition, watch } from "vue";
import { notifySetting } from "@/config/default";
import { useNotifyStore } from "@/store/notify";
import styles from "@/style/module/layout.module.scss";

export default defineComponent({
  setup() {
    const state = reactive({
      showNotify: false,
      isRead: false,
      disabled: false,
      isActive: "",
      showCloseIcon: "",
    });
    const notifyStore = useNotifyStore();
    const notifies = computed(() =>
      Object.values(notifyStore.bucket).reduce((total, curr) => {
        total = total.concat(curr);
        return total;
      }, [])
    );
    const unRead = computed(
      () => !!notifies.value.length && !state.isRead && !state.disabled
    );
    watch(
      () => notifies.value.length,
      (value, oldValue) => {
        if (value > oldValue && !state.showNotify) {
          state.isRead = false;
        }
      }
    );
    const viewNotifyInfo = (type: string) => {
      if (type === "collapse") {
        state.isRead = true;
        state.showNotify = !state.showNotify;
        if (!state.isActive) {
          state.showCloseIcon = state.isActive = notifies.value[0]?.id;
        } else {
          state.showCloseIcon = state.isActive = "";
        }
      } else if (type === "clear") {
        notifyStore.removeNotify();
        state.showNotify = false;
      } else if (type === "disabled") {
        state.disabled = !state.disabled;
      }
    };
    const closeNotifyInfo = (id: string) => {
      notifyStore.removeNotify(id);
    };
    const clickNotifyItem = (id: string) => {
      state.showCloseIcon = state.isActive = id;
    };
    return () => (
      <div class={styles.status_bar}>
        <div class={styles.notify_wrapper}>
          <Transition name="notify-fade">
            {state.showNotify && (
              <div class={styles.notify_container}>
                <div class={styles.notify_header}>
                  <div class={styles.notify_header_title}>通知</div>
                  <div class={styles.notify_header_setting}>
                    {notifySetting.map((item) => (
                      <div
                        class={styles.setting_item}
                        onClick={() => viewNotifyInfo(item.kind)}
                      >
                        <svg-icon iconClass={item.icon}></svg-icon>
                      </div>
                    ))}
                  </div>
                </div>
                <div class={styles.notify_content}>
                  {notifies.value.map((item) => (
                    <div
                      class={[
                        styles.notify_content_item,
                        state.isActive === item.id && styles.is_active,
                      ]}
                      onClick={() => clickNotifyItem(item.id)}
                      onMouseenter={() => (state.showCloseIcon = item.id)}
                      onMouseleave={() => (state.showCloseIcon = "")}
                    >
                      <div class={styles.wrapper_top}>
                        <svg-icon
                          iconClass={item.type}
                          class={[
                            styles.notify_type,
                            styles[`is_${item.type}`],
                          ]}
                        ></svg-icon>
                        <span class={styles.notify_message}>
                          {item.message}
                        </span>
                        <div class={styles.notify_close_outer}>
                          {state.showCloseIcon === item.id && (
                            <div
                              class={styles.notify_close}
                              onClick={() => closeNotifyInfo(item.id)}
                            >
                              <svg-icon iconClass="close"></svg-icon>
                            </div>
                          )}
                        </div>
                      </div>
                      <div class={styles.wrapper_bottom}>
                        <div>
                          <span>来源：{item.from}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Transition>
          <div
            class={[styles.notify, state.showNotify && styles.is_active]}
            onClick={() => viewNotifyInfo("collapse")}
          >
            {unRead.value && (
              <svg-icon iconClass="tip" class={styles.tip}></svg-icon>
            )}
            <svg-icon iconClass="notify"></svg-icon>
          </div>
        </div>
      </div>
    );
  },
});
