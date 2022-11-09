import type SvgIcon from "@/components/svgIcon";
import type { TipProps } from "@/components/tip/main";
import type { GlobalCommand } from "@/components/toolkit/command/command";
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    SvgIcon: SvgIcon;
  }

  export interface ComponentCustomProperties {
    $tip: {
      visable: (info: TipProps) => ComponentPublicInstance;
      hide: () => {};
    };
    $globalCommand: GlobalCommand;
  }
}

export {};
