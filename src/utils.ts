import { MessageType } from "./types";

export const WILDCARD = "*"; // 通配符

// 判断是否是window 原生函数
export const isNative = (fn: Function): boolean => {
  return /\[native code\]/.test(fn.toString());
};

export function noop() {}

export function warn(...log: any[]) {
  const print = console.warn ?? console.log;
  print(...log);
}

// 生成唯一id
export function generateUid() {
  return Number(
    Math.random().toString().substr(3, length) + Date.now()
  ).toString(36);
}
