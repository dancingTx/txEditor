import { defineComponent, computed, type CSSProperties } from "vue";
import { isExternal, definePropType } from "@/shared";
import styles from "@/style/module/components.module.scss";
import type { SvgIconsKind } from "@/@types";

export default defineComponent({
  name: "svgIcon",
  inheritAttrs: false,
  props: {
    className: {
      type: definePropType<string>(String),
      default: "",
    },
    iconClass: {
      type: definePropType<SvgIconsKind>(String),
      required: true,
    },
    tip: {
      type: definePropType<string>(String),
      default: "",
    },
  },
  setup(props, { attrs }) {
    const styleExternalIcon = computed((): CSSProperties => {
      const attribute = `url(${props.iconClass}) no-repeat 50% 50%`;
      return {
        mask: attribute,
        "-webkit-mask": attribute,
      };
    });
    return () =>
      isExternal(props.iconClass) ? (
        <div
          {...attrs}
          style={styleExternalIcon.value}
          class={[styles.svg_icon, styles.svg_external_icon]}
        />
      ) : (
        <span
          class={props.tip && styles.svg_icon_wrapper}
          data-label={props.tip}
        >
          <svg
            {...attrs}
            class={[styles.svg_icon, props.className]}
            aria-hidden="true"
          >
            <use xlinkHref={`#icon-${props.iconClass}`} />
          </svg>
        </span>
      );
  },
});
