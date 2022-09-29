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
  source: [] | object,
  keyName = "key",
  valueName = "value"
) => {
  if (!typeOf(source, "object") && !typeOf(source, "array")) return source;
  return Object.keys(source).reduce((total, curr) => {
    const info = {} as Record<string | number, any>;
    info[keyName] = Array.isArray(source)
      ? Number(curr)
      : Number.isNaN(Number(curr))
      ? curr
      : Number(curr);
    info[valueName] = (source as any)[curr];
    total.push(info);
    return total;
  }, [] as Array<Record<string | number, any>>);
};
export const valueMapLabel = (source: [] | object) => {
  return buildKeyValueMap(source, "value", "label");
};
