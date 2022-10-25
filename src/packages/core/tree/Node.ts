import { h } from "vue";
import svgIcon from "@/components/svgIcon";
import type TreeNodeList from "./NodeList";
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
  rawLabel?: string;
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
  public container?: TreeNodeList;
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
    const container = (node.container =
      node.container || node.parentNode.container);
    if (node.type === "node") {
      node.alive();
      if (container) {
        container.activateNode(node);
        container.setKeepAliveNode(node);
      }
    }

    return this;
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

  update(node: TreeNode, label: string, rename?: boolean) {
    if (!this.contains(node)) {
      return this;
    }
    for (let i = this.children.length; i--; ) {
      const item = this.children[i];
      if (item.uid === node.uid) {
        if (rename) {
          item.value.rawLabel = item.value.label;
        }
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

  alive(node?: TreeNode) {
    node = node || this;
    if (node.type === "node") {
      node.active = true;
    }
  }

  unlive(node?: TreeNode) {
    node = node || this;
    if (node.type === "node") {
      node.active = false;
      if (node.container) {
        node.container.unactivateNode(node);
      }
    }
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
    this.alive();
    if (this.container) {
      this.container.activateNode(this);
    }
  }

  private onDbClick(evt: Event) {
    this.sendMessage("treeNode:dbclick", evt);
    this.alive();
    if (this.container) {
      this.container.activateNode(this);
    }
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
          autofocus: true,
          value: node.rawLabel,
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
          this.container?.activate === this.uid && styles.is_active,
        ],
        onContextmenu: (evt: Event) => this.clickShortcutMenu(evt),
        onClick: (evt: Event) => this.onClick(evt),
        onDbClick: (evt: Event) => this.onDbClick(evt),
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
    const iconExt = node.label && getExtName(node.label);
    const iconName = FileIconVars[iconExt as keyof typeof FileIconVars];
    if (!node.icon) {
      node.icon = iconName;
    }
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
