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
import styles from "@/style/module/components.module.scss";
import stylesFile from "@/style/module/file.module.scss";

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
  public parentNode?: TreeNode;
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

  add(node: TreeNode) {
    node.parentNode = this;
    this.children.push(node);
  }

  remove(node?: TreeNode, mode?: "shift" | "pop") {
    if (node) {
      for (let i = this.children.length; i--; ) {
        const item = this.children[i];
        if (item.uid === node.uid) {
          this.children.splice(i, 1);
        }
      }
    } else {
      mode = mode || "pop";
      this.children[mode]();
    }

    return this;
  }

  update(node: TreeNode, label: string) {
    if (!this.contains(node)) {
      return this;
    }
    for (let i = this.children.length; i--; ) {
      const item = this.children[i];
      if (item.uid === node.uid) {
        item.value.label = label;
      }
    }
    return this;
  }

  contains(node: TreeNode) {
    for (const item of this.children) {
      if (item.uid === node.uid) {
        return true;
      }
    }
    return false;
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
        class: styles.tree_node_unknown,
      },
      [
        h(svgIcon, {
          iconClass,
          class: styles.icon,
        }),
        h("input", {
          id: domId,
          class: styles.input,
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
        class: [
          styles.tree_node_known,
          stylesFile.file,
          isFile && stylesFile[nodeStatus],
        ],
        onContextmenu: (evt: Event) => this.clickShortcutMenu(evt),
        onClick: this.onClick,
        onDbClick: this.onDbClick,
      },
      [
        h(svgIcon, {
          iconClass,
          class: styles.icon,
        }),
        h("span", null, node.label),
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
