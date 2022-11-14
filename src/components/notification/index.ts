import {
  createVNode,
  isVNode,
  render,
  type App,
  type Plugin,
  type VNode,
} from "vue";
import NotificationConstructor, { __Notification_OFFSET__ } from "./main";
import { createElement, mount2Body, makeUUID } from "@/shared";
import { DefaultVars, DotMatrixVars } from "@/config/var";
import type { NotificationProps, NotificationQueue } from "@/@types";

let Notification: Plugin = {} as Plugin;
export const notificationType = [
  "success",
  "warning",
  "info",
  "error",
] as const;
const defaultOptions: NotificationProps = {
  orientation: DotMatrixVars.RightBottom,
  ratio: DefaultVars.__Notification_OFFSET_RATIO__,
  duration: 3000,
  size: 300,
  type: "info",
  message: "",
};
const notificationMap: Record<DotMatrixVars, NotificationQueue> = {
  [DotMatrixVars.RightTop]: [],
  [DotMatrixVars.Right]: [],
  [DotMatrixVars.RightBottom]: [],
  [DotMatrixVars.LeftTop]: [],
  [DotMatrixVars.Left]: [],
  [DotMatrixVars.LeftBottom]: [],
  [DotMatrixVars.Top]: [],
  [DotMatrixVars.Bottom]: [],
};
const makeNotificationDefaultProps = (
  props: NotificationProps | string,
  id: string
) => {
  if (typeof props === "string" || isVNode(props)) {
    props = { message: props };
  }
  const options: NotificationProps = Object.assign({}, defaultOptions, props);

  const userOnClose = options.onClose;

  options.onClose = () => {
    close(id, options.orientation!, userOnClose);
  };

  let offset = 0;
  notificationMap[options.orientation!].forEach(({ vm }) => {
    offset += (vm.el?.offsetHeight || 0) + __Notification_OFFSET__;
  });
  options.offset = offset;

  return options;
};
const registerInstance = (props: NotificationProps, id: string) => {
  const app = createVNode(
    NotificationConstructor,
    props,
    isVNode(props.message) ? { default: () => props.message } : null
  );
  const container = createElement("div");
  app.props!.onDestroy = () => {
    render(null, container);
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  };
  render(app, container);
  notificationMap[props.orientation!].push({ vm: app, vmId: id });
  mount2Body(container);
};
const close = (
  id: string,
  orientation: DotMatrixVars,
  userOnClose?: (vm: VNode) => void
) => {
  const notifications = notificationMap[orientation];
  const index = notifications.findIndex((item) => item.vmId === id);
  if (index === -1) {
    return;
  }
  const { vm } = notifications[index];

  userOnClose?.(vm);

  notifications.splice(index, 1);

  const offsetHeight = vm.el?.offsetHeight;
  const position = orientation.includes("t") ? "top" : "bottom";
  const restLength = notifications.length;
  if (restLength < 1) {
    return;
  }
  for (let i = index; i < restLength; i++) {
    const { el, component } = notifications[i].vm;

    const pos =
      parseInt(el!.style[position], 10) -
      offsetHeight -
      __Notification_OFFSET__;

    component!.props.offset = pos;
  }
};

Notification.install = (app: App) => {
  const notificationFn = (options: NotificationProps) => {
    const id = makeUUID();
    const props = makeNotificationDefaultProps(options, id);
    registerInstance(props, id);
  };
  for (const key of notificationType) {
    (notificationFn as any)[key] = (options: NotificationProps) => {
      if (typeof options === "string" || isVNode(options)) {
        options = { message: options };
      }
      return notificationFn(Object.assign(options, { type: key }));
    };
  }
  app.config.globalProperties.$notify = notificationFn;
};

export default Notification;
