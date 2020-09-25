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

// 生成id
export function generateUid() {
  return Number(Math.floor(Math.random() * 1000000) + Date.now()).toString(36);
}
