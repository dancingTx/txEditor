import { defineComponent, onMounted, reactive, type CSSProperties } from "vue";
import bus, { isEqual, definePropType } from "@/shared";
import { MarkLineVars, Vars } from "@/config/default";
import styles from "@/style/module/components.module.scss";
import type {
  ExtraProps,
  ComponentInfo,
  Direction,
  RefIns,
  ConditionGroup,
  ConditionItem,
  LineStatus,
  LineRefs,
  MarkLineState,
} from "@/@types";

const lines: MarkLineVars[] = [
  MarkLineVars.xTop,
  MarkLineVars.xCenter,
  MarkLineVars.xBottom,
  MarkLineVars.yLeft,
  MarkLineVars.yCenter,
  MarkLineVars.yRight,
];
export default defineComponent({
  props: {
    bucket: {
      type: definePropType<ComponentInfo<ExtraProps>[]>(Array),
      default: () => [],
    },
    activeEl: {
      type: definePropType<ComponentInfo<ExtraProps>>(Object),
      required: true,
    },
  },
  setup(props) {
    const lineStatus: LineStatus = lines.reduce((total, curr) => {
      total[curr] = false;
      return total;
    }, {} as LineStatus);
    const state = reactive<MarkLineState>({
      gap: Vars.__ELEMENT_GAP__,
      lineStatus,
    });
    const linesRef: LineRefs = new Map();
    const setLinesRef = (el: RefIns, line: MarkLineVars) => {
      if (el) {
        linesRef.set(line, el);
      }
    };

    const displayMarkLine = (isDownward: boolean, isRightward: boolean) => {
      const str2Num = (source: number | string | undefined): number => {
        if (!source) return 0;
        return parseInt(source + "") ?? 0;
      };
      const makeAllPositionStyle = (styles?: CSSProperties) => {
        const top = str2Num(styles?.top);
        const left = str2Num(styles?.left);
        const width = str2Num(styles?.width);
        const height = str2Num(styles?.height);
        return {
          top,
          left,
          bottom: top + height,
          right: left + width,
          width,
          height,
        };
      };
      const isNearly = (dragValue: number, targetValue: number): boolean => {
        return Math.abs(dragValue - targetValue) <= state.gap;
      };
      const makeMould = (
        isNearly: boolean,
        type: MarkLineVars,
        dragOffset: number,
        lineOffset: number
      ): ConditionItem => ({
        isNearly,
        line: type,
        lineNode: linesRef.get(type)!,
        dragOffset,
        lineOffset,
      });
      const displayNeedMarkLine = (
        markLines: MarkLineVars[],
        isDownward: boolean,
        isRightward: boolean
      ) => {
        const hasDirection = (direction: MarkLineVars) =>
          markLines.includes(direction);
        if (isDownward) {
          if (hasDirection(MarkLineVars.xBottom)) {
            state.lineStatus[MarkLineVars.xBottom] = true;
          } else if (hasDirection(MarkLineVars.xCenter)) {
            state.lineStatus[MarkLineVars.xCenter] = true;
          } else if (hasDirection(MarkLineVars.xTop)) {
            state.lineStatus[MarkLineVars.xTop] = true;
          }
        } else {
          if (hasDirection(MarkLineVars.xTop)) {
            state.lineStatus[MarkLineVars.xTop] = true;
          } else if (hasDirection(MarkLineVars.xCenter)) {
            state.lineStatus[MarkLineVars.xCenter] = true;
          } else if (hasDirection(MarkLineVars.xBottom)) {
            state.lineStatus[MarkLineVars.xBottom] = true;
          }
        }
        if (isRightward) {
          if (hasDirection(MarkLineVars.yRight)) {
            state.lineStatus[MarkLineVars.yRight] = true;
          } else if (hasDirection(MarkLineVars.yCenter)) {
            state.lineStatus[MarkLineVars.yCenter] = true;
          } else if (hasDirection(MarkLineVars.yLeft)) {
            state.lineStatus[MarkLineVars.yLeft] = true;
          }
        } else {
          if (hasDirection(MarkLineVars.yLeft)) {
            state.lineStatus[MarkLineVars.yLeft] = true;
          } else if (hasDirection(MarkLineVars.yCenter)) {
            state.lineStatus[MarkLineVars.yCenter] = true;
          } else if (hasDirection(MarkLineVars.yRight)) {
            state.lineStatus[MarkLineVars.yRight] = true;
          }
        }
      };
      const components = props.bucket;
      const currComponent = props.activeEl;
      // TODO: sticky
      const {
        top: currTop,
        left: currLeft,
        bottom: currBottom,
        right: currRight,
        width: currComponentWidth,
        height: currComponentHeight,
      } = makeAllPositionStyle(currComponent.props?.style);

      const currComponentHalfWidth = currComponentWidth / 2;
      const currComponentHalfHeight = currComponentHeight / 2;

      hiddenMarkLine();

      for (const component of components) {
        if (isEqual<ExtraProps>(component, currComponent)) {
          break;
        }

        const { top, left, bottom, right, width, height } =
          makeAllPositionStyle(component.props?.style);
        const compHalfWidth = width / 2;
        const compHalfHeight = height / 2;

        const conditions: ConditionGroup = {
          top: [
            makeMould(isNearly(currTop, top), MarkLineVars.xTop, top, top),
            makeMould(
              isNearly(currBottom, top),
              MarkLineVars.xTop,
              top - currComponentHeight,
              top
            ),
            makeMould(
              isNearly(currTop + currComponentHalfHeight, top + compHalfHeight),
              MarkLineVars.xCenter,
              top + compHalfHeight - currComponentHalfHeight,
              top + compHalfHeight
            ),
            makeMould(
              isNearly(currTop, bottom),
              MarkLineVars.xBottom,
              bottom,
              bottom
            ),
            makeMould(
              isNearly(currBottom, bottom),
              MarkLineVars.xBottom,
              bottom - currComponentHeight,
              bottom
            ),
          ],
          left: [
            makeMould(isNearly(currLeft, left), MarkLineVars.yLeft, left, left),
            makeMould(
              isNearly(currRight, left),
              MarkLineVars.yLeft,
              left - currComponentWidth,
              left
            ),
            makeMould(
              isNearly(currLeft + currComponentHalfWidth, left + compHalfWidth),
              MarkLineVars.yCenter,
              left + compHalfWidth - currComponentHalfWidth,
              left + compHalfWidth
            ),
            makeMould(
              isNearly(currLeft, right),
              MarkLineVars.yRight,
              right,
              right
            ),
            makeMould(
              isNearly(currRight, right),
              MarkLineVars.yRight,
              right - currComponentWidth,
              right
            ),
          ],
        };

        const displays: MarkLineVars[] = [];

        for (const key of Object.keys(conditions)) {
          conditions[key as keyof ConditionGroup].forEach((item) => {
            if (!item.isNearly) return;

            (item.lineNode as HTMLElement).style[key as keyof ConditionGroup] =
              item.lineOffset + "px";
            displays.push(item.line);
          });
        }

        if (displays.length) {
          displayNeedMarkLine(displays, isDownward, isRightward);
        }
      }
    };

    const hiddenMarkLine = () => {
      Object.keys(state.lineStatus).forEach((key) => {
        state.lineStatus[key as keyof LineStatus] = false;
      });
    };

    onMounted(() => {
      bus.on("component:startMove", (info: unknown) => {
        displayMarkLine(
          (info as Direction).isDownward,
          (info as Direction).isRightward
        );
      });
      bus.on("component:endMove", hiddenMarkLine);
    });
    return () => (
      <ul class={styles.mark_line}>
        {lines.map((line) => (
          <li
            ref={(el) => setLinesRef(el, line)}
            class={[
              styles.line,
              line.includes("x") ? styles.line_x : styles.line_y,
              line,
            ]}
            style={{ display: state.lineStatus[line] ? "block" : "none" }}
          ></li>
        ))}
      </ul>
    );
  },
});
