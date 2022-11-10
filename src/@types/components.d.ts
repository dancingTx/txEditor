import type SvgIcon from "@/components/svgIcon";
import type { GlobalCommand } from "@/components/toolkit/command/command";
import type { NotificationProps, NotificationOption } from "@/@types";
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    SvgIcon: SvgIcon;
  }

  export interface ComponentCustomProperties {
    $notify: ((info: NotificationProps) => void) & NotificationOption;
    $globalCommand: GlobalCommand;
  }
}

export {};
