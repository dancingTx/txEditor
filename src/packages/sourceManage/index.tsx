import { defineComponent } from "vue";
import ToolKit from "@/components/toolkit/canvasCommand";
import Canvas from "./canvas";
export default defineComponent({
  setup() {
    return () => (
      <div>
        <ToolKit></ToolKit>
        <Canvas></Canvas>
      </div>
    );
  },
});
