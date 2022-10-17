import { defineComponent } from "vue";
import ToolKit from "@/components/toolkit/canvasCommand";
import Canvas from "@/packages/sourceManage/canvas";
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
