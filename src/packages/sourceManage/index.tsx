import { computed, defineComponent } from "vue";
import ToolKit from "@/components/toolkit/canvasCommand";
import Canvas from "@/components/canvas";
import { useNodeStore } from "@/store/node";
import { useCommandStore } from "@/store/global";
import { useLayoutStore } from "@/store/layout";
export default defineComponent({
  setup() {
    const node = useNodeStore();
    const layout = useLayoutStore();
    const command = useCommandStore();
    const activateNode = computed(
      () => layout.namespace && node[layout.namespace].raw.activate
    );
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
