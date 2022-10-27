import { computed, defineComponent } from "vue";
import ToolKit from "@/components/toolkit/canvasCommand";
import Canvas from "@/components/canvas";
import { useNodeStore } from "@/store/node";
import { useCommandStore } from "@/store/global";
export default defineComponent({
  setup() {
    const node = useNodeStore();
    const command = useCommandStore();
    const activateNode = computed(() => node.treeNodeList.activate);
    return () => (
      <div>
        <ToolKit></ToolKit>
        <Canvas>
          {activateNode.value?.canvas?.render(
            command.canvasCommand,
            command.canSelected
          )}
        </Canvas>
      </div>
    );
  },
});
