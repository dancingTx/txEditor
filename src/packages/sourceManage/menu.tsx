import {
  defineComponent,
  onMounted,
  ref,
  getCurrentInstance,
  reactive,
  computed,
} from "vue";
import Menu from "@/components/menu";
import TreeNode from "../core/tree/Node";
import bus from "@/shared/bus";
import { useContextMenuStore } from "@/store/global";
import { useNodeStore } from "@/store/node";
import { sourceList } from "@/config/default";
import type {
  ExtraPropsEn,
  NodeDirOpProps,
  NodeType,
  NodeInfo,
} from "@/@types";

export default defineComponent({
  setup() {
    const app = getCurrentInstance();
    const menu = ref(null);
    const state = reactive({
      currNode: null as unknown,
    });
    const nodeStore = useNodeStore();
    const contextMenu = useContextMenuStore();
    const nodeTree = computed(() => nodeStore.getNodeListNS());
    const clickShortcutMenu = (tabInfo: ExtraPropsEn) => {
      if (tabInfo.enLabel === "workspace") {
        contextMenu.setPanelOrientation("left top");
        contextMenu.setPanelType("menu:workspace");
        if (app && app.uid) {
          contextMenu.setUniqueId(app.uid);
        }
        contextMenu.show();
      }
    };

    const clickNodeShortcutMenu = (evt: NodeInfo) => {
      contextMenu.setPanelOrientation("left top");
      contextMenu.setPanelType(
        evt.type === "node" ? "workspace:node" : "workspace:tree"
      );
      if (app && app.uid) {
        contextMenu.setUniqueId(app.uid);
      }
      if (evt.raw) {
        state.currNode = evt.raw;
      }
      contextMenu.show();
    };

    const createDirOrNode = (type: NodeType) => {
      const treeNode = new TreeNode(type, {
        kind: "Created",
      });
      if (state.currNode) {
        (state.currNode as TreeNode).add(treeNode);
      } else {
        nodeTree.value?.add(treeNode);
      }

      if (!TreeNode.id) {
        TreeNode.id = app?.uid;
      }
    };

    const renameDirOrNode = (node: TreeNode) => {
      if (node.parentNode) {
        node.parentNode.update(node, "", true);
      } else {
        nodeTree.value?.update(node, "", true);
      }
      node.renderNode();
    };

    const deleteDirOrNode = (node: TreeNode) => {
      if (node.parentNode) {
        node.parentNode.remove(node);
      } else {
        nodeTree.value?.remove(node);
      }
    };

    const processCommand = (info: NodeDirOpProps) => {
      const nodeType = info.command.indexOf("Dir") !== -1 ? "dir" : "node";
      if (info.command === "CreateDir" || info.command === "CreateNode") {
        createDirOrNode(nodeType);
      }

      if (info.command === "RenameDir" || info.command === "RenameNode") {
        renameDirOrNode(state.currNode as TreeNode);
      }

      if (info.command === "DeleteDir" || info.command === "DeleteNode") {
        deleteDirOrNode(state.currNode as TreeNode);
      }
    };

    onMounted(() => {
      bus.on("contextMenu:clickItem", (info) => {
        if (app?.uid === contextMenu.uid) {
          processCommand(info as NodeDirOpProps);
          contextMenu.hide();
          state.currNode = null;
        }
      });
      bus.on("treeNode:contextmenu", (evt) => {
        if (TreeNode.id === app?.uid) {
          clickNodeShortcutMenu(evt as NodeInfo);
        }
      });
    });
    return () => (
      <Menu
        items={sourceList}
        ref={menu}
        onClickContextMenu={clickShortcutMenu}
      >
        {{
          workspace: () => nodeTree.value?.renderTreeView(),
        }}
      </Menu>
    );
  },
});
