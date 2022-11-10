import type { DefineComponent } from "vue";
import NotificationConstructor from "@/components/notification/main";
import { notificationType } from "@/components/notification";
import { DotMatrixVars } from "@/config/var";

type FetchNotificationProps<
  T extends typeof NotificationConstructor,
  O = InstanceType<T>["$props"]
> = Omit<O, keyof InstanceType<DefineComponent>["$props"]>;
export type NotificationProps = FetchNotificationProps<
  typeof NotificationConstructor
>;
const notificationTypes = notificationType as const;
export type NotificationType = typeof notificationTypes[number];

export type LocationMap = Record<DotMatrixVars, string>;

export interface NotificationOption {
  success: (info: NotificationProps) => void;
  warning: (info: NotificationProps) => void;
  error: (info: NotificationProps) => void;
  info: (info: NotificationProps) => void;
}
