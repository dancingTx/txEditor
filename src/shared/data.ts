import { typeOf } from "./validate";
/**
 *
 * @param {Array|Object} source
 * @param {String} keyName
 * @param {String} valueName
 * @param {Boolean} flag
 * @returns 返回指定格式的对象数组
 * @description 将对象或数组转换为指定格式的对象数组，便于options等选项解析
 */
export const buildKeyValueMap = (
  source: [] | {},
  keyName = "key",
  valueName = "value"
) => {
  if (!typeOf(source, "object") && !typeOf(source, "array")) return source;
  return Object.keys(source).reduce((total, curr) => {
    const info = {} as Record<keyof any, any>;
    info[keyName] = Array.isArray(source)
      ? Number(curr)
      : Number.isNaN(Number(curr))
      ? curr
      : Number(curr);
    info[valueName] = (source as any)[curr];
    total.push(info);
    return total;
  }, [] as Array<Record<keyof any, any>>);
};
export const valueMapLabel = (source: [] | object) => {
  return buildKeyValueMap(source, "value", "label");
};

export const deepClone = <Source>(source: Source): Source => {
  if (typeof source !== "object" || source === null) return source;

  const target = Array.isArray(source) ? [] : {};

  for (const key in source) {
    if (Object.hasOwnProperty.call(source, key)) {
      (target as Record<string, any>)[key] = deepClone(source[key]);
    }
  }
  return target as Source;
};

export const noop = () => {};
