import { isArray } from "./validate";
/**
 *
 * @param {string} str
 * @returns
 * @description 首字符大写
 */
export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(
  func: (...args: any) => any,
  wait: number,
  immediate?: boolean
): () => any {
  let timeout: NodeJS.Timeout | null;
  let timestamp: number;
  let result: any;
  let params: [] | null;
  let context: typeof debounce | null;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, params || []);
        if (!timeout) context = params = null;
      }
    }
  };

  return function (this: any, ...args: any): any {
    context = this;
    params = args;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, params || []);
      context = params = null;
    }

    return result;
  };
}

/**
 * array
 */
export const arrayify = (source: unknown): Array<any> => {
  if (source == null) {
    return [];
  }
  return isArray(source) ? source : [source];
};
