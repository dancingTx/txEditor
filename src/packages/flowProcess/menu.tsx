import { defineComponent } from "vue";
import Menu from "@/components/menu";

export default defineComponent({
  setup() {
    return () => (
      <div>
        <Menu>{"flowProcess"}</Menu>
      </div>
    );
  },
});
