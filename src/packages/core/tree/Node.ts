import { h } from "vue";
import svgIcon from "@/components/svgIcon";
import Canvas from "../canvas";
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
  public children: Set<TreeNode>;
  public container?: TreeNodeList;
  public canvas?: Canvas;
  static id?: number;
  constructor(
    type: NodeType,
    value: NodeValue,
    children?: Set<TreeNode>,
    options: TreeNodeOptions = {}
  ) {
    this.uid = value.uid || makeUUID();
    this.type = type;
    this.value = value;
    this.children = children || new Set();
    this.options = options;
    this.active = false;
  }

  add(node: TreeNode) {
    node.parentNode = this;
    node.container = node.container || node.parentNode.container;
    this.children.add(node);

    return this;
  }

  remove(node: TreeNode) {
    node.unlive();
    this.children.delete(node);

    return this;
  }

  update(node: TreeNode, label: string, rename?: boolean) {
    this.children.forEach((child) => {
      if (child.uid === node.uid) {
        if (rename) {
          child.value.rawLabel = child.value.label;
        }
        child.value.label = label;
        return;
      }
    });
    return this;
  }

  alive(node?: TreeNode) {
    node = node || this;
    if (node.type === "node") {
      node.active = true;
      if (node.container) {
        node.container.setKeepAliveNode(node);
        node.container.activateNode(node);
      }
    }
  }

  unlive(node?: TreeNode) {
    node = node || this;
    if (node.type === "node") {
      node.active = false;
      if (node.container) {
        node.container.unactivateNode(node);
        node.container.removeKeepAliveNode(node);
      }
    }
  }

  private withNodeRenderFinish(isNode: boolean) {
    if (isNode && !this.canvas) {
      this.alive();
      this.canvas = new Canvas(this.uid);
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
  }

  private onDbClick(evt: Event) {
    this.sendMessage("treeNode:dbclick", evt);
    this.alive();
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
      isNode: boolean;
      nodeStatus: string;
    }
  ) {
    const { domId, iconClass, isNode, nodeStatus } = options;
    this.withNodeRenderFinish(isNode);
    return h(
      "div",
      {
        id: domId,
        class: [
          styles.tree_node_known,
          stylesFile.file,
          isNode && stylesFile[nodeStatus],
          this.container?.activate?.uid === this.uid && styles.is_active,
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
    const isNode = this.type === "node";
    const nodeStatus = NodeStatusVars[node.kind];
    const domId = `node_${node.uid || this.uid}`;
    const iconExt = node.label && getExtName(node.label);
    const iconName = FileIconVars[iconExt as keyof typeof FileIconVars];
    if (!node.icon) {
      node.icon = iconName;
    }
    const iconClass = !isNode
      ? "folder-unopen"
      : iconName
      ? iconName
      : "file-unknown";
    return node.label
      ? this.renderKnownNode(node, { domId, iconClass, isNode, nodeStatus })
      : this.renderUnknownNode(node, { domId, iconClass });
  }
}
