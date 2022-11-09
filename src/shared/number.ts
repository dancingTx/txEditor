export const randomFloat = (): number => {
  const maxUintValue = 0xffffffff;
  if (window) {
    return window.crypto.getRandomValues(new Uint32Array(1))[0] / maxUintValue;
  }
  return Math.random();
};
