import type { DefineComponent, VNode } from "vue";
import NotificationConstructor from "@/components/notification/main";
import { notificationType } from "@/components/notification";
import { DotMatrixVars } from "@/config/var";

type FetchComponentProps<
  T extends typeof NotificationConstructor,
  O = InstanceType<T>["$props"]
> = Omit<O, keyof InstanceType<DefineComponent>["$props"]>;

export type NotificationProps = FetchComponentProps<
  typeof NotificationConstructor
>;
const notificationTypes = notificationType as const;
export type NotificationType = typeof notificationTypes[number];

export type LocationMap = Record<DotMatrixVars, string>;

export interface NotificationOption {
  success: (info: NotificationProps | string) => void;
  warning: (info: NotificationProps | string) => void;
  error: (info: NotificationProps | string) => void;
  info: (info: NotificationProps | string) => void;
}

export interface NotificationQueueItem {
  vmId: string;
  vm: VNode;
}

export type NotificationQueue = NotificationQueueItem[];
