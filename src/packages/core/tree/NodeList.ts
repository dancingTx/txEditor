import type TreeNode from "./Node";
import { makeUUID } from "@/shared/variables";
export default class TreeNodeList {
  public uid!: string;
  private items: TreeNode[];
  private prevNodeIndex: number;
  private currNodeIndex: number;
  private keepAlive: TreeNode[];

  constructor(uid?: string) {
    this.uid = uid || makeUUID();
    this.prevNodeIndex = this.currNodeIndex = -1;
    this.items = [];
    this.keepAlive = [];
  }
  getItems() {
    return this.items;
  }

  getKeepAliveItems() {
    return this.keepAlive;
  }

  add(node: TreeNode, mode?: "unshift" | "push") {
    mode = mode || "unshift";
    this.items[mode](node);
    return this;
  }
  remove(node: TreeNode, mode?: "shift" | "pop") {
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
  update(node: TreeNode, label: string) {
    if (!this.contains(node)) {
      return this;
    }
    for (let i = this.items.length; i--; ) {
      const item = this.items[i];
      if (item.uid === node.uid) {
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
}
