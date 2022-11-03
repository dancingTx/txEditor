import { defineComponent, type CSSProperties, type PropType } from "vue";
import { DotMatrixVars, DirectionVars } from "@/config/default";
import styles from "@/style/module/components.module.scss";
const dotMatrix = [
  DotMatrixVars.Top,
  DotMatrixVars.Left,
  DotMatrixVars.Right,
  DotMatrixVars.Bottom,
  DotMatrixVars.LeftBottom,
  DotMatrixVars.LeftTop,
  DotMatrixVars.RightBottom,
  DotMatrixVars.RightTop,
];
export default defineComponent({
  props: {
    active: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    defaultStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    const makePointStyle = (point: DotMatrixVars) => {
      const hasT = /t/.test(point);
      const hasB = /b/.test(point);
      const hasL = /l/.test(point);
      const hasR = /r/.test(point);
      const { width, height } = props.defaultStyle;
      const widthNum = parseInt(width + "");
      const heightNum = parseInt(height + "");
      let top = 0;
      let left = 0;

      if (point.length === 2) {
        left = hasL ? 0 : widthNum;
        top = hasT ? 0 : heightNum;
      } else {
        if (hasT || hasB) {
          left = Math.round(widthNum / 2);
          top = hasT ? 0 : heightNum;
        }

        if (hasL || hasR) {
          left = hasL ? 0 : widthNum;
          top = Math.round(heightNum / 2);
        }
      }

      return {
        marginLeft: hasR ? "-4px" : "-3px",
        marginTop: "-10px",
        left: left + "px",
        top: top + "px",
        cursor:
          point
            .split("")
            .reverse()
            .map((m) => (DirectionVars as any)[m])
            .join("") + "-resize",
      };
    };
    return () => (
      <div class={[styles.shape, props.active && styles.is_active]}>
        {props.active &&
          dotMatrix.map((dot) => (
            <div class={styles.point} style={makePointStyle(dot)}>
              <i class={styles.dot}></i>
            </div>
          ))}
        {slots.default && slots.default()}
      </div>
    );
  },
});
