import { defineComponent, reactive, withDirectives, type PropType } from "vue";
import bus from "@/shared/bus";
import Panel from "../panel";
import TreeNode, {
  type PanelInfo,
  type NodeType,
} from "@/packages/core/tree/Node";
import { dragDirective } from "@/directive/drag";
import {
  workspaceSettings,
  type SourceProps,
  type NodeDirOpProps,
} from "@/config/default";
import { useNodeStore } from "@/store/node";
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
      place: props.item.enLabel,
      items: workspaceSettings,
    });
    const nodeStore = useNodeStore();
    const clickShortcutMenu = (evt: MouseEvent) => {
      if (props.item.enLabel !== "workspace") {
        return;
      }
      state.place = props.item.enLabel;
      state.showPanel = false;
      state.panelLeft = evt.offsetX;
      state.panelTop = evt.offsetY;
      state.showPanel = true;
      state.items = workspaceSettings;
    };

    const createDirOrNode = (type: NodeType) => {
      const treeNode = new TreeNode(type, {
        kind: "Created",
      });
      nodeStore.treeNodeList.add(treeNode);
    };
    const renameDirOrNode = (type: NodeType) => {};
    const deleteDirOrNode = (type: NodeType) => {};
    const processCommand = (item: NodeDirOpProps) => {
      const type = item.command.indexOf("Dir") !== -1 ? "dir" : "node";
      if (item.command === "CreateDir" || item.command === "CreateNode") {
        createDirOrNode(type);
      }

      if (item.command === "RenameDir" || item.command === "RenameNode") {
        renameDirOrNode(type);
      }
      if (item.command === "DeleteDir" || item.command === "DeleteNode") {
        deleteDirOrNode(type);
      }
      state.showPanel = false;
      bus.on("treeNode:panelInfo", (info) => {
        state.showPanel = (info as PanelInfo).showPanel;
        state.panelLeft = (info as PanelInfo).panelLeft;
        state.panelTop = (info as PanelInfo).panelTop;
        state.items = (info as PanelInfo).items;
      });
    };
    return () => (
      <div class={styles.tab_item}>
        <Panel
          items={state.items}
          showPanel={state.showPanel}
          left={state.panelLeft}
          top={state.panelTop}
          location="left top"
          onClickItem={processCommand}
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
                  <span style={{ "pointer-events": "none" }}>
                    {props.item?.label}
                  </span>
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
