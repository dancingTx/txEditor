import type { Component } from "vue";
import { isString } from "./validate";
import type { ExtraPropsEn, Props, ComponentInfo } from "@/@types";

export const compoundComponents = <P extends Props>(
  list: P[],
  compType: keyof P
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
    (comp1 as ComponentInfo<ExtraPropsEn>).elId &&
    (comp2 as ComponentInfo<ExtraPropsEn>).elId
  ) {
    return (
      (comp1 as ComponentInfo<ExtraPropsEn>).elId ===
      (comp2 as ComponentInfo<ExtraPropsEn>).elId
    );
  }

  return (
    (comp1 as ComponentInfo<ExtraPropsEn>).uid ===
    (comp2 as ComponentInfo<ExtraPropsEn>).uid
  );
};
