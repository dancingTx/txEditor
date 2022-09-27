/**
 *
 * @param {string} str
 * @returns
 * @description 首字符大写
 */
export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);
