/// <reference types="pixi.js" />
import { loaders } from "pixi.js";
import { Listener, Producer, Stream } from "xstream";
export interface ILoaderOptions {
    crossOrigin?: boolean | string;
    loadType?: number;
    xhrType?: string;
    metaData?: any;
}
export declare enum LoadTypes {
    resource = 0,
    load = 1,
    cancel = 2,
    dispose = 3,
}
export interface ILoadAction {
    type: string;
}
export declare type Resource = {
    name: string;
    url: string;
    options?: ILoaderOptions;
};
export interface IResource extends ILoadAction {
    resources: Resource[];
}
export interface IDisposeAction extends ILoadAction {
    names: string[];
}
export declare type Progress = {
    loader: loaders.Loader;
    resource: loaders.Resource;
};
export declare class NotifyProducer<T> implements Producer<T> {
    listeners: Listener<T>[];
    start(listener: Listener<T>): void;
    trigger(message: T): void;
    stop(): void;
}
export declare class LoaderHandler implements Listener<ILoadAction[]> {
    private progress;
    private load;
    constructor();
    next(actions: ILoadAction[]): void;
    error(): void;
    complete(): void;
    private handleResource(resource);
    private handleLoad(load);
    private handleCancel(cancel);
    private handleDispose(dispose);
    attachProgress(): Stream<Progress>;
    attachLoad(): Stream<Progress>;
}
