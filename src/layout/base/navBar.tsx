import { computed, defineComponent, reactive } from "vue";
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
    const state = reactive({
      isHover: "",
    });
    const layout = useLayoutStore();
    const nodeStore = useNodeStore();
    const keepAliveNodeList = computed(() =>
      nodeStore.treeNodeList.getKeepAliveItems()
    );
    const activateNode = computed(() => nodeStore.treeNodeList.activate);
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
                    activateNode.value?.uid === node.uid && styles.is_active,
                  ]}
                  onClick={() => {
                    nodeStore.treeNodeList.activateNode(node);
                  }}
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
                    {(node.uid === activateNode.value?.uid ||
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
