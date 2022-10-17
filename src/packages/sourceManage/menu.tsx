import { defineComponent } from "vue";
import Menu from "@/components/menu";
import { sourceList } from "@/config/default";

export default defineComponent({
  setup() {
    return () => (
      <div>
        <Menu items={sourceList}></Menu>
      </div>
    );
  },
});
