export type Self = Window;
export type MessageType = string;
export type Noop = () => void;
export type TaskId = string;
export type MessageEventListener = (event: MessageEvent) => void;
export type MessageListener = Noop | MessageEventListener;
export type TasksMap<K, V> = { [K: string]: V };
export type Next = (error?: any) => Promise<any>;

