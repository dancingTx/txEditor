import { defineStore } from "pinia";
import TreeNodeList from "@/packages/core/tree/NodeList";
import TreeNode from "@/packages/core/tree/Node";

const treeNodeList = new TreeNodeList();

export const useNodeStore = defineStore("node", {
  state: () => {
    return {
      treeNodeListId: treeNodeList.uid,
      treeNodeList: treeNodeList,
    };
  },
  actions: {
    createDefaultNode() {
      const treeNode = new TreeNode("node", {
        kind: "Created",
        label: "default",
      });
      treeNodeList.add(treeNode);
    },
  },
});
