import { defineComponent } from "vue";
import Canvas from "@/components/canvas";

export default defineComponent({
  setup() {
    return () => (
      <div>
        <Canvas>flowProcess</Canvas>
      </div>
    );
  },
});
