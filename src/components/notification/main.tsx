import {
  Transition,
  defineComponent,
  ref,
  onMounted,
  type CSSProperties,
  withModifiers,
  computed,
  type VNode,
} from "vue";
import SvgIcon from "@/components/svgIcon";
import { screen2BodyRatio, definePropType, noop } from "@/shared";
import { DotMatrixVars, DefaultVars, Vars } from "@/config/default";
import styles from "@/style/module/components.module.scss";
import type { NotificationType, LocationMap } from "@/@types";

export const __Notification_OFFSET__ = 10;
const locationMap: LocationMap = {
  [DotMatrixVars.RightBottom]: `${__Notification_OFFSET__} ${
    Vars.__STATUS_BAR_HEIGHT__ + __Notification_OFFSET__
  }`,
  [DotMatrixVars.Right]: `${__Notification_OFFSET__}`,
  [DotMatrixVars.RightTop]: `${__Notification_OFFSET__} ${
    Vars.__STATUS_BAR_HEIGHT__ + __Notification_OFFSET__
  }`,
  [DotMatrixVars.LeftTop]: `${__Notification_OFFSET__} ${
    Vars.__STATUS_BAR_HEIGHT__ + __Notification_OFFSET__
  }`,
  [DotMatrixVars.Left]: `${Vars.__ASIDE_WIDTH__ + __Notification_OFFSET__}`,
  [DotMatrixVars.LeftBottom]: `${__Notification_OFFSET__} ${
    Vars.__STATUS_BAR_HEIGHT__ + __Notification_OFFSET__
  }`,
  [DotMatrixVars.Top]: `${__Notification_OFFSET__}`,
  [DotMatrixVars.Bottom]: `${
    Vars.__STATUS_BAR_HEIGHT__ + __Notification_OFFSET__
  }`,
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
      default: DefaultVars.__Notification_OFFSET_RATIO__,
    },
    message: {
      type: definePropType<string | VNode>([String, Object]),
      default: "",
    },
    type: {
      type: definePropType<NotificationType>(String),
      default: "info",
    },
    duration: {
      type: definePropType<number>(Number),
      default: 3000,
    },
    from: {
      type: definePropType<string>(String),
      default: "未知",
    },
    onClose: {
      type: definePropType<() => void>(Function),
      default: () => noop,
    },
    offset: {
      type: definePropType<number>(Number),
      default: 0,
    },
  },
  emits: ["destroy"],
  setup(props, { emit }) {
    const visible = ref(false);
    const makeNotificationStyle = (): CSSProperties => {
      const style: CSSProperties = {};
      const width = parseInt(props.size + "");
      const height = Math.round(screen2BodyRatio(width, props.ratio));
      const [loc1, loc2] = locationMap[props.orientation]
        .split(" ")
        .map(Number);
      const orientation = props.orientation;
      const offset = props.offset ?? 0;
      if (orientation.includes("r")) {
        style.right = loc1;
        if (orientation.includes("t")) {
          style.top = loc2 + offset;
        } else if (orientation.includes("b")) {
          style.bottom = loc2 + offset;
        } else {
          style.top = "50%";
          style.transform = `translateY(-50%)`;
        }
      } else if (orientation.includes("l")) {
        style.left = loc1;
        if (orientation.includes("t")) {
          style.top = loc2 + offset;
        } else if (orientation.includes("b")) {
          style.bottom = loc2 + offset;
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
      if (style.left) {
        style.left += "px";
      }
      if (style.right) {
        style.right += "px";
      }
      if (style.top) {
        style.top += "px";
      }
      if (style.bottom) {
        style.bottom += "px";
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
    const notificationStyle = makeNotificationStyle();
    const calcTBRatio = computed(() => {
      const flagValue = parseInt((notificationStyle.height ?? 0) + "") - 20;
      return {
        t: flagValue * 0.8,
        b: flagValue * 0.2,
      };
    }).value;
    let timer: NodeJS.Timeout | null = null;
    const startTimer = () => {
      if (props.duration > 0) {
        timer = setTimeout(() => {
          if (visible.value) {
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
    };
    onMounted(() => {
      startTimer();
      visible.value = true;
    });
    return () => (
      <Transition
        name="notification-fade"
        onBeforeLeave={props.onClose}
        onAfterLeave={() => emit("destroy")}
      >
        {visible.value && (
          <div
            class={[styles.notification, makeCustomClass()]}
            style={notificationStyle}
            onMouseenter={stopTimer}
            onMouseleave={startTimer}
          >
            <div class={styles.notification_inner}>
              <div class={styles.notification_identify}>
                <SvgIcon
                  iconClass={props.type}
                  class={[styles.notification_icon, styles[`is_${props.type}`]]}
                ></SvgIcon>
              </div>
              <div
                class={styles.notification_content}
                style={{ height: calcTBRatio.t + "px" }}
              >
                <span class={styles.notification_message}>{props.message}</span>
              </div>
              <div class={styles.notification_setting}>
                <div
                  class={styles.notification_close}
                  onClick={withModifiers(close, ["stop"])}
                >
                  <SvgIcon
                    iconClass="close"
                    class={styles.notification_close_inner}
                  ></SvgIcon>
                </div>
              </div>
            </div>
            <div
              class={styles.notification_footer}
              style={{
                height: calcTBRatio.b + "px",
                lineHeight: calcTBRatio.b + "px",
              }}
            >
              <span class={styles.from}>来源：{props.from}</span>
            </div>
          </div>
        )}
      </Transition>
    );
  },
});
