import type { Component } from "vue";
import type { PluginProps } from "@/config/default";

export const compoundComponents = (
  list: PluginProps[],
  compType: keyof PluginProps
): Record<string, Component> => {
  return list.reduce((total, curr) => {
    if (curr[compType]) {
      total[curr.uid] = curr[compType] as Component;
    }
    return total;
  }, {} as Record<string, Component>);
};
