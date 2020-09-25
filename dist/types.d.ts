export declare type Self = Window;
export declare type MessageType = string;
export declare type Noop = () => void;
export declare type TaskId = string;
export declare type MessageEventListener = (event: MessageEvent) => void;
export declare type MessageListener = Noop | MessageEventListener;
export declare type TasksMap<K, V> = {
    [K: string]: V;
};
export declare type Next = (error?: any) => Promise<any>;
