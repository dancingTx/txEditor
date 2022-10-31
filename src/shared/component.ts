import type { Component } from "vue";
import type { CommonProps } from "@/config/default";

export const compoundComponents = <Props extends CommonProps>(
  list: Props[],
  compType: keyof Props
): Record<string, Component> => {
  return list.reduce((total, curr) => {
    if (curr[compType] && curr) {
      total[curr.uid] = curr[compType] as Component;
    }
    return total;
  }, {} as Record<string, Component>);
};
