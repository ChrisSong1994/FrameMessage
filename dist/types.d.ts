export declare type Self = Window;
export declare type MessageType = string;
export declare type Noop = () => void;
export declare type TaskId = string;
export declare type MessageEventListener = (event: MessageEvent) => void;
export declare type MessageListener = Noop | MessageEventListener;
export declare type TaskMap<K, V> = {
    [K: string]: V;
};
