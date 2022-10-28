import { defineStore } from "pinia";
import TreeNodeList from "@/packages/core/tree/NodeList";
import TreeNode from "@/packages/core/tree/Node";
import { NamespaceVars, type Namespace } from "@/config/default";
import { useLayoutStore } from "@/store/layout";
interface TreeNodeInfo {
  raw: TreeNodeList;
  id: string;
}

const createNodeTreeViaNamespace = () => {
  const state = {} as Record<Namespace, TreeNodeInfo>;
  for (const item of Object.keys(NamespaceVars)) {
    const treeNodeList = new TreeNodeList();

    state[item as Namespace] = {
      id: treeNodeList.uid,
      raw: treeNodeList,
    };
  }
  return state;
};
export const useNodeStore = defineStore("node", {
  state: () => {
    return createNodeTreeViaNamespace();
  },
  actions: {
    getNodeListNS() {
      const layout = useLayoutStore();
      if (layout.namespace) {
        return this[layout.namespace].raw;
      }
      return new TreeNodeList();
    },
    createDefaultNode(namespace: Namespace) {
      const treeNode = new TreeNode("node", {
        kind: "Created",
        label: "default",
      });
      this[namespace].raw.add(treeNode);
      this[namespace].id = this[namespace].raw.uid;
    },
  },
});
