import { defineComponent, Teleport } from "vue";
import ContextMenu from "@/components/contextMenu";
import Command from "@/components/toolkit/globalCommand";
import bus from "@/shared/bus";
export default defineComponent({
  setup() {
    return () => (
      <div>
        <router-view></router-view>
        <Teleport to="body">
          <ContextMenu></ContextMenu>
          <Command></Command>
        </Teleport>
      </div>
    );
  },
});
