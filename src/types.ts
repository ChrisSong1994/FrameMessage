export type Self = Window;
export type MessageType = string;
export type Noop = () => void;
export type TaskId = string;
export type MessageEventListener = (event: MessageEvent) => void;
export type MessageListener = Noop | MessageEventListener;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type TasksMap<K, V> = { [K: string]: V };
