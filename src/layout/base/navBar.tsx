import { computed, defineComponent, reactive, watchEffect } from "vue";
import {
  widgets,
  NodeStatusVars,
  DarkModeVars,
  type Widget,
} from "@/config/default";
import { calcNavWidth } from "@/hook";
import { useLayoutStore } from "@/store/layout";
import { useNodeStore } from "@/store/node";
import styles from "@/style/module/layout.module.scss";
import styleFile from "@/style/module/file.module.scss";
export default defineComponent({
  setup() {
    const state = reactive<{
      isActive: string;
      isHover: string;
    }>({
      isActive: "",
      isHover: "",
    });
    const layout = useLayoutStore();
    const node = useNodeStore();
    const keepAliveNodeList = computed(() =>
      node.treeNodeList.getKeepAliveItems()
    );
    const renderDarkLight = () => (
      <div class={styles.darkset}>
        <svg-icon
          iconClass={layout.mode === DarkModeVars.Dark ? "dark" : "light"}
          class={styles.nav_icon}
          onClick={() => {
            layout.switchDarkMode();
          }}
        ></svg-icon>
      </div>
    );
    const renderPushPropsBar = () => (
      <div class={styles.nav_icon_transition}>
        <svg-icon
          iconClass="push"
          class={[styles.nav_icon, layout.isCollapseProp && styles.is_collapse]}
          onClick={() => layout.switchCollapse("props")}
        ></svg-icon>
      </div>
    );
    const renderWidgets = (type: Widget) => {
      return (
        {
          DarkMode: renderDarkLight(),
          Collapse: renderPushPropsBar(),
        } as Record<Widget, JSX.Element>
      )[type];
    };
    watchEffect(() => {
      state.isActive = node.treeNodeList.activate;
    });
    return () => (
      <div
        class={styles.layout_nav_bar_wrapper}
        style={{
          width: calcNavWidth(),
        }}
      >
        <div class={styles.layout_nav_bar}>
          {keepAliveNodeList.value.map(
            (node) =>
              (node.value.label || node.value.rawLabel) && (
                <div
                  class={[
                    styles.layout_nav_bar__item,
                    state.isActive === node.uid && styles.is_active,
                  ]}
                  onClick={() => (state.isActive = node.uid)}
                  onMouseenter={() => (state.isHover = node.uid)}
                  onMouseleave={() => (state.isHover = "")}
                >
                  {node.value.icon && (
                    <svg-icon
                      iconClass={node.value.icon}
                      class={styles.item_icon}
                    ></svg-icon>
                  )}
                  <span
                    class={[
                      styleFile.file,
                      styleFile[NodeStatusVars[node.value.kind]],
                    ]}
                  >
                    {node.value.label || node.value.rawLabel}
                  </span>
                  <div class={styles.icon_close_outer}>
                    {(node.uid === state.isActive ||
                      state.isHover === node.uid) && (
                      <svg-icon
                        iconClass="close"
                        class={styles.icon_close}
                        onClick={() => node.unlive()}
                      ></svg-icon>
                    )}
                  </div>
                </div>
              )
          )}
        </div>
        <div class={styles.layout_nav_settings}>
          {widgets.map((item) => item.icon && renderWidgets(item.command))}
        </div>
      </div>
    );
  },
});
