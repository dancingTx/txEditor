import { defineStore } from "pinia";
import TreeNodeList from "@/packages/core/tree/NodeList";

const treeNodeList = new TreeNodeList();

export const useNodeStore = defineStore("node", {
  state: () => {
    return {
      treeNodeListId: treeNodeList.uid,
      treeNodeList: treeNodeList,
    };
  },
});
