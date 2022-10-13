import { defineComponent, Teleport } from "vue";
import Command from "@/components/toolkit/directive";
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
