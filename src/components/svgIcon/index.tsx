import { defineComponent, computed } from "vue";
import type { PropType } from "vue";
import { isExternal } from "@/shared/validate";
import styles from "@/style/module/components.module.scss";
export default defineComponent({
  name: "svgIcon",
  props: {
    className: {
      type: String as PropType<string>,
      default: "",
    },
    iconClass: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props, { attrs }) {
    const styleExternalIcon = computed(() => {
      const attribute = `url(${props.iconClass}) no-repeat 50% 50%`;
      return {
        mask: attribute,
        "-webkit-mask": attribute,
      };
    });
    return () => (
      <>
        {isExternal(props.iconClass) ? (
          <div
            {...attrs}
            style={{ ...styleExternalIcon }}
            class={[styles.svg_icon, styles.svg_external_icon]}
          />
        ) : (
          <svg
            {...attrs}
            class={[styles.svg_icon, props.className]}
            aria-hidden="true"
          >
            <use xlinkHref={`#icon-${props.iconClass}`} />
          </svg>
        )}
      </>
    );
  },
});