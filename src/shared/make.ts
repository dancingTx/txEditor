import { randomFloat } from "./number";

export const makeUUID = (digit: number = 8): string => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-——+=,.<>/?";
  let crypto = "";
  for (let i = digit; i--; ) {
    crypto += chars[~~(randomFloat() * chars.length)];
  }
  return crypto;
};
