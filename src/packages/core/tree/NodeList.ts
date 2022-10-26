import { h, type RendererNode } from "vue";
import type TreeNode from "./Node";
import { makeUUID } from "@/shared/variables";
import styles from "@/style/module/components.module.scss";
export default class TreeNodeList {
  public uid!: string;
  private items: TreeNode[];
  protected keepAlive: TreeNode[];
  public activate: TreeNode | null;

  constructor(uid?: string) {
    this.uid = uid || makeUUID();
    this.items = [];
    this.keepAlive = [];
    this.activate = null;
  }
  getItems() {
    return this.items;
  }
  setKeepAliveNode(node: TreeNode) {
    this.keepAlive.push(node);
  }

  getKeepAliveItems() {
    return this.keepAlive.filter((node) => node.active);
  }
  activateNode(node: TreeNode) {
    this.activate = node;
  }

  unactivateNode(node: TreeNode) {
    if (node.uid === this.activate?.uid) {
      this.activate = null;
    }
  }

  add(node: TreeNode, mode?: "unshift" | "push") {
    mode = mode || "unshift";
    this.items[mode](node);
    node.container = this;

    if (node.type === "node") {
      node.alive();
      this.activateNode(node);
      this.setKeepAliveNode(node);
    }

    return this;
  }
  remove(node?: TreeNode, mode?: "shift" | "pop") {
    if (node) {
      for (let i = this.items.length; i--; ) {
        const item = this.items[i];
        if (item.uid === node.uid) {
          this.items.splice(i, 1);
        }
      }
    } else {
      mode = mode || "pop";
      this.items[mode]();
    }

    return this;
  }
  update(node: TreeNode, label: string, rename?: boolean) {
    if (!this.contains(node)) {
      return this;
    }
    for (let i = this.items.length; i--; ) {
      const item = this.items[i];
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
    for (const item of this.items) {
      if (item.uid === node.uid) {
        return true;
      }
    }
    return false;
  }

  renderTreeView(items?: TreeNode[]): RendererNode {
    const recurisveTree = (node: TreeNode): RendererNode => {
      return node.children.length
        ? h(
            "div",
            {
              class: styles.tree,
            },
            [
              node.renderNode(),
              h(
                "ul",
                {
                  class: styles.tree_inner,
                },
                node.children.map((child) => h("li", recurisveTree(child)))
              ),
            ]
          )
        : node.renderNode();
    };

    items = items || this.items;
    return items.map((node) => recurisveTree(node));
  }
}
