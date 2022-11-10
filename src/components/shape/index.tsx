import { defineComponent, type CSSProperties, type PropType } from "vue";
import { on, off, definePropType } from "@/shared";
import { DotMatrixVars, DirectionVars } from "@/config/default";
import styles from "@/style/module/components.module.scss";

const dotMatrix: DotMatrixVars[] = [
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
      type: definePropType<boolean>(Boolean),
      default: false,
    },
    defaultStyle: {
      type: definePropType<CSSProperties>(Object),
      default: () => ({}),
    },
  },
  emits: ["pointMouseDown", "pointMouseMove", "pointMouseUp"],
  setup(props, { slots, emit }) {
    const makePointStyle = (point: DotMatrixVars) => {
      const hasT = /t/.test(point);
      const hasB = /b/.test(point);
      const hasL = /l/.test(point);
      const hasR = /r/.test(point);
      const { width, height } = props.defaultStyle;
      const widthNum = parseInt((width ?? 0) + "");
      const heightNum = parseInt((height ?? 0) + "");
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
        cursor: DirectionVars[point] + "-resize",
      };
    };
    const mouseDownPoint = (point: DotMatrixVars) => {
      const evt = window.event;
      evt?.preventDefault();
      evt?.stopPropagation();
      const hasT = /t/.test(point);
      const hasB = /b/.test(point);
      const hasL = /l/.test(point);
      const hasR = /r/.test(point);
      const { width, height, top, left } = props.defaultStyle;
      const rawWidth = parseInt((width ?? 0) + "");
      const rawHeight = parseInt((height ?? 0) + "");
      const rawTop = parseInt((top ?? 0) + "");
      const rawLeft = parseInt((left ?? 0) + "");
      const startX = (evt as MouseEvent).clientX;
      const startY = (evt as MouseEvent).clientY;
      emit("pointMouseDown");
      const mouseMovePoint = (evt: Event) => {
        const currX = (evt as MouseEvent).clientX;
        const currY = (evt as MouseEvent).clientY;
        const disX = currX - startX;
        const disY = currY - startY;

        const height =
          Math.max(rawHeight + (hasT ? -disY : hasB ? disY : 0), 0) + "px";
        const width =
          Math.max(rawWidth + (hasL ? -disX : hasR ? disX : 0), 0) + "px";
        const top = rawTop + (hasT ? disY : 0) + "px";
        const left = rawLeft + (hasL ? disX : 0) + "px";
        emit("pointMouseMove", {
          width,
          height,
          top,
          left,
        });
      };
      const mouseUpPoint = () => {
        off(document, "mousemove", mouseMovePoint);
        off(document, "mouseup", mouseUpPoint);
        emit("pointMouseUp");
      };

      on(document, "mousemove", mouseMovePoint);
      on(document, "mouseup", mouseUpPoint);
    };
    return () => (
      <div class={[styles.shape, props.active && styles.is_active]}>
        {props.active &&
          dotMatrix.map((dot) => (
            <div
              class={styles.point}
              style={makePointStyle(dot)}
              onMousedown={() => mouseDownPoint(dot)}
            >
              <i class={styles.dot}></i>
            </div>
          ))}
        {slots.default && slots.default()}
      </div>
    );
  },
});
