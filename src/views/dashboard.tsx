import { defineComponent } from "vue";
import ToolKit from "@/components/toolkit/command";
import Canvas from "@/components/canvas";
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
