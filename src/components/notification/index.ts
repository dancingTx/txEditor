import { createVNode, isVNode, render, type App, type Plugin } from "vue";
import NotificationConstructor from "./main";
import { createElement, mount2Body } from "@/shared";
import { DefaultVars, DotMatrixVars } from "@/config/var";
import type { NotificationProps } from "@/@types";

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
const makeNotificationDefaultProps = (props: NotificationProps | string) => {
  if (typeof props === "string" || isVNode(props)) {
    props = { message: props };
  }
  const options: NotificationProps = Object.assign({}, defaultOptions, props);

  const userOnClose = options.onClose;

  options.onClose = () => {
    close(userOnClose);
  };

  return options;
};
const registerInstance = (props: NotificationProps & Record<string, any>) => {
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
  mount2Body(container);
};
const close = (userOnClose?: () => void) => {};
Notification.install = (app: App) => {
  const notificationFn = (options: NotificationProps) => {
    const props = makeNotificationDefaultProps(options);
    registerInstance(props);
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
