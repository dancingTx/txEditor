import { defineComponent, reactive, withDirectives, type PropType } from "vue";
import Panel from "../panel";
import { dragDirective } from "@/directive/drag";
import {
  dirSettings,
  type SourceProps,
  type NodeDirOpProps,
} from "@/config/default";
import styles from "@/style/module/components.module.scss";
export default defineComponent({
  props: {
    item: {
      type: Object as PropType<SourceProps>,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    const state = reactive({
      isCollapse: false,
      showPanel: false,
      panelLeft: 0,
      panelTop: 0,
    });
    const clickShortcutMenu = (evt: MouseEvent) => {
      state.showPanel = false;
      state.panelLeft = evt.offsetX;
      state.panelTop = evt.offsetY;
      state.showPanel = true;
      evt.preventDefault();
      return false;
    };
    return () => (
      <div class={styles.tab_item}>
        <Panel
          items={dirSettings}
          showPanel={state.showPanel}
          left={state.panelLeft}
          top={state.panelTop}
          location="left top"
          onClickItem={(item: NodeDirOpProps) => {
            console.log(item, "item");
            state.showPanel = false;
          }}
          onClosePanel={() => (state.showPanel = false)}
        >
          {{
            handle() {
              return (
                <div
                  class={[
                    styles.tab_item__header,
                    state.isCollapse && styles.is_collapse,
                  ]}
                  onClick={() => (state.isCollapse = !state.isCollapse)}
                  onContextmenu={clickShortcutMenu}
                >
                  {props.item?.icon && (
                    <svg-icon
                      iconClass={props.item?.icon}
                      class={styles.tab_icon}
                    ></svg-icon>
                  )}
                  <span>{props.item?.label}</span>
                </div>
              );
            },
          }}
        </Panel>
        {withDirectives(
          <div
            class={[
              styles.tab_item__content,
              state.isCollapse && styles.is_collapse,
            ]}
          >
            {slots.default && slots.default()}
          </div>,
          [[dragDirective, "", "", { vertical: true }]]
        )}
      </div>
    );
  },
});
