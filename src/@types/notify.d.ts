import type { NotificationProps } from "./notification";

export type NotificationItem = Pick<
  NotificationProps,
  "message" | "type" | "from"
> & { id: string };

export interface NotifyState {
  bucket: Record<string, NotificationItem[]>;
}
