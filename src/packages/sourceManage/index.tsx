import { computed, defineComponent } from "vue";
import ToolKit from "@/components/toolkit/canvasCommand";
import Canvas from "@/components/canvas";
import { useNodeStore } from "@/store/node";

export default defineComponent({
  setup() {
    const node = useNodeStore();
    const activateNode = computed(() => node.getNodeListNS().activate);
    return () => (
      <div>
        <ToolKit></ToolKit>
        <Canvas>
          {activateNode.value?.canvas?.render(
            activateNode.value.canvasCommand?.command,
            activateNode.value.canvasCommand?.canSelected
          )}
        </Canvas>
      </div>
    );
  },
});
