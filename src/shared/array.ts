import { isArray } from "./validate";
/**
 * array
 */
export const arrayify = <Type>(source: Type): Array<Type> => {
  if (source == null) {
    return [];
  }
  return isArray(source) ? source : [source];
};
