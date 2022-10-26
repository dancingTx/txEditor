import { useI18n } from "vue-i18n";
import {
  Vars,
  type SourceProps,
  type PluginProps,
  type CommandOptions,
} from "@/config/default";
import { useLayoutStore } from "@/store/layout";

export const calcNavWidth = (): string => {
  const state = useLayoutStore();
  const baseWidth = Vars.__ASIDE_WIDTH__;
  const otherWidth =
    baseWidth +
    (state.isCollapse ? 0 : Vars.__MENU_WIDTH__) +
    (state.isCollapseProp ? 0 : Vars.__MENU_WIDTH__);
  return `calc(100vw - ${otherWidth}px)`;
};

type combineType = SourceProps | PluginProps | CommandOptions | undefined;
export const useI18nTitle = (source: combineType, prop?: string) => {
  if (!source) return "";
  const { t } = useI18n();
  return source.i18n
    ? t(source.i18n)
    : prop
    ? (source as Record<string, any>)[prop]
    : (source as Record<string, any>).label;
};
