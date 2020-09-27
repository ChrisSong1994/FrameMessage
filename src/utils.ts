import { MessageType } from "./types";

export const WILDCARD = "*"; // 通配符
export const HAND_SHAKE = "__FRAME_MESSAGE_HANDLE_SHAKE__"; // 内置握手通信类型

// 是否内置通信类型
export const isInternalType = (type: MessageType): boolean => {
  return [HAND_SHAKE].includes(type);
};

// 判断是否是window 原生函数
// eslint-disable-next-line @typescript-eslint/ban-types
export const isNative = (fn: Function): boolean => {
  return /\[native code\]/.test(fn.toString());
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export const warn = (...log: any[]) => {
  const print = console.warn ?? console.log;
  print(...log);
};

// 生成id
export const generateUid = (): string => {
  return Number(Math.floor(Math.random() * 1000000) + Date.now()).toString(36);
};

// 延迟
export const delay = (timeout: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

// 数组过滤
export const filter = <T>(arr: T[], match: (item: T) => boolean) => {
  const result: T[] = [];
  return arr.reduce((result, item) => {
    if (match(item)) result.push(item);
    return result;
  }, result);
};
