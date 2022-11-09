import { h, type VNode } from "vue";
import type TreeNode from "./Node";
import { makeUUID } from "@/shared";
import styles from "@/style/module/components.module.scss";
export default class TreeNodeList {
  public uid: string;
  private items: Set<TreeNode>;
  protected keepAlive: Set<TreeNode>;
  public activate: TreeNode | null;

  constructor(uid?: string) {
    this.uid = uid || makeUUID();
    this.items = new Set<TreeNode>();
    this.keepAlive = new Set<TreeNode>();
    this.activate = null;
  }

  getItems() {
    return this.items;
  }

  setKeepAliveNode(node: TreeNode) {
    this.keepAlive.add(node);
  }

  removeKeepAliveNode(node: TreeNode) {
    this.keepAlive.delete(node);
  }

  getKeepAliveItems() {
    return Array.from(this.keepAlive).filter((node) => node.active);
  }
  activateNode(node: TreeNode) {
    this.activate = node;
  }

  unactivateNode(node: TreeNode) {
    if (node.uid === this.activate?.uid) {
      if (this.keepAlive.size > 1) {
        this.activate = Array.from(this.keepAlive)[this.keepAlive.size - 1];
      } else {
        this.activate = null;
      }
    }
  }

  add(node: TreeNode) {
    this.items.add(node);
    node.container = this;
    return this;
  }

  remove(node: TreeNode) {
    node.unlive();
    this.items.delete(node);
    return this;
  }

  update(node: TreeNode, label: string, rename?: boolean) {
    this.items.forEach((item) => {
      if (item.uid === node.uid) {
        if (rename) {
          item.value.rawLabel = item.value.label;
        }
        item.value.label = label;
        return;
      }
    });
    return this;
  }

  renderTreeView(items?: Set<TreeNode>): VNode[] {
    const recurisveTree = (node: TreeNode): VNode => {
      return node.children.size
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
                Array.from(node.children).map((child) =>
                  h("li", recurisveTree(child))
                )
              ),
            ]
          )
        : node.renderNode();
    };

    items = items || this.items;
    return Array.from(items).map((node) => recurisveTree(node));
  }
}
