
export const randomFloat = (): number => {
    const maxUintValue = 0xffffffff;
    if (window) {
        return window.crypto.getRandomValues(new Uint32Array(1))[0] / maxUintValue;
    }
    return Math.random()
  };

export const makeUUID = (digit: number = 8): string => {
    const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-——+=,.<>/?";
  let crypto = "";
  for (let i = digit; i--;) {
    crypto += chars[~~(randomFloat() * chars.length)];
  }
  return crypto;
}