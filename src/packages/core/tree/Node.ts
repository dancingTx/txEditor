import { h } from "vue";
import svgIcon from "@/components/svgIcon";
import { makeUUID } from "@/shared/variables";
import { getExtName } from "@/shared/tool";
import {
  NodeStatusVars,
  FileIconVars,
  type NodeStatus,
  type NodeDirOpProps,
} from "@/config/default";
import bus from "@/shared/bus";
import styles from "@/style/module/file.module.scss";

interface TreeNodeOptions {
  readonly?: boolean;
  isModified?: boolean;
  isDeleted?: boolean;
  isMoved?: boolean;
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

export interface NodeInfo {
  uid: string;
  active: boolean;
  type: NodeType;
  raw: TreeNode;
  evt?: Event;
}
export default class TreeNode {
  public uid: string;
  public type: NodeType;
  public value: NodeValue;
  public options?: TreeNodeOptions;
  public active: boolean;
  public children: TreeNode[];
  static id?: number;
  constructor(
    type: NodeType,
    value: NodeValue,
    children: TreeNode[] = [],
    options: TreeNodeOptions = {}
  ) {
    this.uid = value.uid || makeUUID();
    this.type = type;
    this.value = value;
    this.children = children;
    this.options = options;
    this.active = false;
  }
  private sendMessage(namespace: string, evt: Event) {
    bus.emit(namespace, {
      uid: this.uid,
      type: this.type,
      active: this.active,
      raw: this,
      evt,
    } as NodeInfo);

    evt.stopPropagation();
    evt.preventDefault();
  }
  private clickShortcutMenu(evt: Event) {
    this.sendMessage("treeNode:contextmenu", evt);
  }

  private onClick(evt: Event) {
    this.sendMessage("treeNode:click", evt);
  }

  private onDbClick(evt: Event) {
    this.sendMessage("treeNode:dbclick", evt);
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
    return h(
      "div",
      {
        id: domId,
        class: [styles.file, styles.is_unknown, isFile && styles[nodeStatus]],
        onContextmenu: (evt: Event) => this.clickShortcutMenu(evt),
        onClick: this.onClick,
        onDbClick: this.onDbClick,
      },
      [
        h(svgIcon, {
          iconClass,
          style: {
            flex: "0 1 10px",
            margin: "0 5px",
          },
        }),
        h(
          "span",
          {
            style: {
              "pointer-events": "none",
            },
          },
          node.label
        ),
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
