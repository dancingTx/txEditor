import { defineComponent } from "vue";
import Menu from "@/components/menu";
import { sourceList } from "@/config/default";
import { useNodeStore } from "@/store/node";
export default defineComponent({
  setup() {
    const nodeStore = useNodeStore();
    return () => (
      <div>
        <Menu items={sourceList}>
          {{
            workspace: () => (
              <div>
                {nodeStore.treeNodeList
                  .getItems()
                  .map((node) => node.renderNode())}
              </div>
            ),
          }}
        </Menu>
      </div>
    );
  },
});
