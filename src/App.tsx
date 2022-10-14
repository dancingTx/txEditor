import { defineComponent, Teleport } from "vue";
import Command from "@/components/toolkit/globalCommand";
export default defineComponent({
  setup() {
    return () => (
      <div>
        <router-view></router-view>
        <Teleport to="body">
          <Command></Command>
        </Teleport>
      </div>
    );
  },
});
