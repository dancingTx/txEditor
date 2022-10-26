import { defineComponent } from "vue";
import ToolKit from "@/components/toolkit/canvasCommand";
import Canvas from "@/components/canvas";
export default defineComponent({
  setup() {
    return () => (
      <div>
        <ToolKit></ToolKit>
        <Canvas>flowProcess</Canvas>
      </div>
    );
  },
});
