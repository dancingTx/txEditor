import type { Component, CSSProperties } from "vue";
import type { Tag } from "./var";

export interface ComponentAttrs {}
export interface ComponentProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
}
export interface ComponentEvents {}
export interface ComponentAnimation {}
export type ComponentInfo<T> = T extends string
  ? string
  : T & {
      elId?: string;
      tag: Tag;
      attributes?: ComponentAttrs;
      props?: ComponentProps;
      events?: ComponentEvents;
      animates?: ComponentAnimation[];
      value?: string;
      children?: ComponentInfo<T>[];
      component?: Component;
    };
