import { defineComponent } from "vue";
import Canvas from "@/components/canvas";

export default defineComponent({
  setup() {
    return () => (
      <div>
        <Canvas>sourcemanage</Canvas>
      </div>
    );
  },
});
