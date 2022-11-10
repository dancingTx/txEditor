import { useI18n } from "vue-i18n";
import { useLayoutStore } from "@/store/layout";
import { Vars } from "@/config/default";
import type { ExtraProps } from "@/@types/core";

export const calcNavWidth = (): string => {
  const state = useLayoutStore();
  const baseWidth = Vars.__ASIDE_WIDTH__;
  const otherWidth =
    baseWidth +
    (state.isCollapse ? 0 : Vars.__MENU_WIDTH__) +
    (state.isCollapseProp ? 0 : Vars.__MENU_WIDTH__);
  return `calc(100vw - ${otherWidth}px)`;
};

export const useI18nTitle = (source: Partial<ExtraProps>, prop?: string) => {
  if (!source) return "";
  const { t } = useI18n();
  return source.i18n
    ? t(source.i18n)
    : prop
    ? (source as any)[prop]
    : source.label;
};
