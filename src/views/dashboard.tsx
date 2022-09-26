import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => (
      <div>
        <button class="pure-button pure-button-primary">
          A Primary Button
        </button>
      </div>
    );
  },
});
