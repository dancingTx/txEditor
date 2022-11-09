import {
  Transition,
  defineComponent,
  onMounted,
  reactive,
  type CSSProperties,
  type PropType,
  getCurrentInstance,
  watch,
  ref,
} from "vue";
import SvgIcon from "@/components/svgIcon";
import { screen2BodyRatio, definePropType, noop } from "@/shared";
import { DotMatrixVars, DefaultVars, Vars } from "@/config/default";
import styles from "@/style/module/components.module.scss";

const __TIP_OFFSET__ = 10;
type TipType = "success" | "warning" | "info" | "error";
export interface TipProps {
  orientation?: DotMatrixVars;
  size?: string | number;
  ratio?: string;
  message: string;
  type?: TipType;
  duration?: number;
  onClose?: () => {};
}
const locationMap: Record<DotMatrixVars, string> = {
  [DotMatrixVars.RightBottom]: `${__TIP_OFFSET__}px ${
    Vars.__STATUS_BAR_HEIGHT__ + __TIP_OFFSET__
  }px`,
  [DotMatrixVars.Right]: `${__TIP_OFFSET__}px`,
  [DotMatrixVars.RightTop]: `${__TIP_OFFSET__}px ${
    Vars.__STATUS_BAR_HEIGHT__ + __TIP_OFFSET__
  }px`,
  [DotMatrixVars.LeftTop]: `${__TIP_OFFSET__}px ${
    Vars.__STATUS_BAR_HEIGHT__ + __TIP_OFFSET__
  }px`,
  [DotMatrixVars.Left]: `${Vars.__ASIDE_WIDTH__ + __TIP_OFFSET__}px`,
  [DotMatrixVars.LeftBottom]: `${__TIP_OFFSET__}px ${
    Vars.__STATUS_BAR_HEIGHT__ + __TIP_OFFSET__
  }px`,
  [DotMatrixVars.Top]: `${__TIP_OFFSET__}px`,
  [DotMatrixVars.Bottom]: `${Vars.__STATUS_BAR_HEIGHT__ + __TIP_OFFSET__}px`,
};
export default defineComponent({
  props: {
    visible: {
      type: definePropType<boolean>(Boolean),
      default: false,
    },
    orientation: {
      type: definePropType<DotMatrixVars>(String),
      default: DotMatrixVars.RightBottom,
    },
    size: {
      type: definePropType<string | number>([String, Number]),
      default: 300,
    },
    ratio: {
      type: definePropType<string>(String),
      default: DefaultVars.__TIP_RATIO__,
    },
    message: {
      type: definePropType<string>(String),
      default: "",
    },
    type: {
      type: definePropType<TipType>(String),
      default: "info",
    },
    duration: {
      type: definePropType<number>(Number),
      default: 3000,
    },
    onClose: {
      type: definePropType<() => {}>(Function),
      default: () => noop,
    },
  },
  emits: ["onClose"],
  setup(props, { emit }) {
    const visible = ref(false);
    const makeTipStyle = (): CSSProperties => {
      const style: CSSProperties = {};
      const width = parseInt(props.size + "");
      const height = Math.round(screen2BodyRatio(width, props.ratio));
      const [loc1, loc2] = locationMap[props.orientation].split(" ");
      const orientation = props.orientation;
      if (orientation.includes("r")) {
        style.right = loc1;
        if (orientation.includes("t")) {
          style.top = loc2;
        } else if (orientation.includes("b")) {
          style.bottom = loc2;
        } else {
          style.top = "50%";
          style.transform = `translateY(-50%)`;
        }
      } else if (orientation.includes("l")) {
        style.left = loc1;
        if (orientation.includes("t")) {
          style.top = loc2;
        } else if (orientation.includes("b")) {
          style.bottom = loc2;
        } else {
          style.top = "50%";
          style.transform = `translateY(-50%)`;
        }
      } else if (orientation.includes("t") || orientation.includes("b")) {
        style.left = "50%";
        style.transform = `translateX(-50%)`;
        if (orientation.includes("t")) {
          style.top = loc1;
        } else {
          style.bottom = loc1;
        }
      }
      style.width = width + "px";
      style.height = height + "px";
      return style;
    };
    const makeCustomClass = () => {
      let className = "";
      if (props.orientation.includes("l")) {
        className = "left";
      } else if (props.orientation.includes("r")) {
        className = "right";
      }

      if (props.orientation.includes("t")) {
        className += className ? " top" : "top";
      } else if (props.orientation.includes("b")) {
        className += className ? " bottom" : "bottom";
      }
      return className;
    };
    let timer: NodeJS.Timeout | null = null;
    const startTimer = () => {
      if (props.duration > 0) {
        timer = setTimeout(() => {
          if (props.visible) {
            close();
          }
        }, props.duration);
      }
    };
    const stopTimer = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
    const close = () => {
      visible.value = false;
      stopTimer();
      emit("onClose");
    };
    onMounted(() => {
      startTimer();
    });
    return () => (
      <Transition name="tip-fade">
        {props.visible && (
          <div class={[styles.tip, makeCustomClass()]} style={makeTipStyle()}>
            <SvgIcon
              iconClass={props.type}
              class={[styles.tip_icon, styles[`is_${props.type}`]]}
            ></SvgIcon>
            <span class={styles.tip_message}>{props.message}</span>
          </div>
        )}
      </Transition>
    );
  },
});
