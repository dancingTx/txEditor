import type { Component } from "vue";
import { isString } from "./validate";
import type { CommonProps, ComponentInfo, SourceProps } from "@/config/default";

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

export const isEqual = <T>(
  comp1: ComponentInfo<T>,
  comp2: ComponentInfo<T>
): boolean => {
  if (isString(comp1) && isString(comp2)) {
    return comp1 === comp2;
  }
  if (
    (comp1 as ComponentInfo<SourceProps>).elId &&
    (comp2 as ComponentInfo<SourceProps>).elId
  ) {
    return (
      (comp1 as ComponentInfo<SourceProps>).elId ===
      (comp2 as ComponentInfo<SourceProps>).elId
    );
  }

  return (
    (comp1 as ComponentInfo<SourceProps>).uid ===
    (comp2 as ComponentInfo<SourceProps>).uid
  );
};
