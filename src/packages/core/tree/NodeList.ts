import type TreeNode from "./Node";
import { makeUUID } from "@/shared/variables";
export default class TreeNodeList {
  public uid!: string;
  private items: TreeNode[];
  private keepAlive: TreeNode[];

  constructor(uid?: string) {
    this.uid = uid || makeUUID();
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
    if (this.contains(node)) {
      return this;
    }
    mode = mode || "push";
    this.items[mode](node);
    return this;
  }
  remove(node: TreeNode, mode?: "shift" | "pop") {
    if (!this.contains(node)) {
      return this;
    }
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
  contains(node: TreeNode) {
    for (const item of this.items) {
      if (item.uid === node.uid) {
        return true;
      }
    }
    return false;
  }
}
