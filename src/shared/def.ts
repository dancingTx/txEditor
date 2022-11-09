import type { PropType } from "vue";

export const definePropType = <T>(types: any): PropType<T> => {
  return types;
};
