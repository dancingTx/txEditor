import { h, reactive } from "vue";
import { makeUUID } from "@/shared/variables";
import { getExtName } from "@/shared/tool";
import {
  dirSettings,
  nodeSettings,
  NodeStatusVars,
  FileIconVars,
  type NodeStatus,
  type NodeDirOpProps,
} from "@/config/default";
import bus from "@/shared/bus";
import styles from "@/style/module/file.module.scss";
import svgIcon from "@/components/svgIcon";

interface TreeNodeOptions {
  readonly?: boolean;
  isModified?: boolean;
  isDeleted?: boolean;
  isMoved?: boolean;
  isActived?: string;
}
interface NodeValue {
  uid?: string;
  kind: NodeStatus;
  icon?: string;
  label?: string;
  subTitle?: string;
  enLabel?: string;
  enSubTitle?: string;
}
export type NodeType = "dir" | "node";
export interface PanelInfo {
  showPanel: boolean;
  panelLeft: number;
  panelTop: number;
  items: NodeDirOpProps[];
}
export default class TreeNode {
  public uid: string;
  public type: NodeType;
  public value: NodeValue;
  public options?: TreeNodeOptions;
  public active: string;
  public children?: TreeNode[];

  constructor(
    type: NodeType,
    value: NodeValue,
    children?: TreeNode[],
    options: TreeNodeOptions = {}
  ) {
    this.uid = value.uid || makeUUID();
    this.type = type;
    this.value = value;
    this.children = children;
    this.options = options;
    this.active = options.isActived || "";
  }
  private renderUnknownNode(
    node: NodeValue,
    options: { domId: string; iconClass: string }
  ) {
    const { domId, iconClass } = options;
    return h(
      "div",
      {
        style: {
          display: "flex",
          "padding-left": "10px",
          "box-sizing": "border-box",
        },
      },
      [
        h(svgIcon, {
          iconClass,
          style: {
            flex: "0 1 10px",
            margin: "0 5px",
          },
        }),
        h("input", {
          id: domId,
          class: [styles.file, styles.is_unknown_input],
          autofocus: "autofocus",
          onChange: (evt: InputEvent) => {
            this.value.label = (evt.target as any).value;
          },
          onBlur: (evt: FocusEvent) => {
            if (this.value.label) {
              this.renderNode();
            } else {
              const el = evt.target as HTMLElement;
              if (el.parentNode?.parentNode) {
                el.parentNode?.parentNode.removeChild(el.parentNode);
              }
            }
          },
        }),
      ]
    );
  }
  private renderKnownNode(
    node: NodeValue,
    options: {
      domId: string;
      iconClass: string;
      isFile: boolean;
      nodeStatus: string;
    }
  ) {
    const { domId, iconClass, isFile, nodeStatus } = options;
    const state = reactive<PanelInfo>({
      showPanel: false,
      panelLeft: 0,
      panelTop: 0,
      items: isFile ? nodeSettings : dirSettings,
    });
    const clickShortcutMenu = (evt: MouseEvent) => {
      state.showPanel = false;
      state.panelLeft = evt.offsetX;
      state.panelTop = evt.offsetY;
      console.log(state.panelLeft, state.panelTop, "...");
      state.showPanel = true;
      bus.emit("treeNode:panelInfo", state);
    };
    return h(
      "div",
      {
        id: domId,
        class: [styles.file, styles.is_unknown, isFile && styles[nodeStatus]],
        onContextmenu: clickShortcutMenu,
      },
      [
        h(svgIcon, {
          iconClass,
          style: {
            flex: "0 1 10px",
            margin: "0 5px",
          },
        }),
        h("span", node.label),
      ]
    );
  }
  renderNode(node?: NodeValue) {
    node = node || this.value;
    const isFile = this.type === "node";
    const nodeStatus = NodeStatusVars[node.kind];
    const domId = `node_${node.uid || this.uid}`;
    const iconName =
      node.label &&
      FileIconVars[getExtName(node.label) as keyof typeof FileIconVars];
    const iconClass = !isFile
      ? "folder-unopen"
      : iconName
      ? iconName
      : "file-unknown";

    return node.label
      ? this.renderKnownNode(node, { domId, iconClass, isFile, nodeStatus })
      : this.renderUnknownNode(node, { domId, iconClass });
  }
}
