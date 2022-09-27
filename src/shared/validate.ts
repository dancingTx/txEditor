export const typeOf = (source: unknown, typeTarget: string): boolean => {
  if (typeof source !== "object") {
    return typeof source === typeTarget;
  }
  return (
    Object.prototype.toString
      .call(source)
      .replace(/^\[object (\w+)\]$/, "$1")
      .toLowerCase() === typeTarget
  );
};

export const isPlainObject = (source: unknown): source is object => {
  return typeOf(source, "object");
};

export const isString = (source: unknown): source is string => {
  return typeOf(source, "string");
};

export const isExternal = (path: string): boolean => {
  return /^(https?|mailto|tel):/.test(path);
};
