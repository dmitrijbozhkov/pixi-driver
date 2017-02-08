import { loader, utils, loaders } from "pixi.js";
import { Listener, Producer, Stream } from "xstream";
import { Loader } from "./makeLoaderDriver";
export interface ILoaderOptions {
    crossOrigin?: boolean | string;
    loadType?: number;
    xhrType?: string;
    metaData?: any;
}
export enum LoadTypes {
    resource,
    load,
    cancel,
    dispose
}
export interface ILoadAction {
    type: string;
}
export type Resource = { name: string, url: string, options?: ILoaderOptions };
export interface IResource extends ILoadAction {
    resources: Resource[];
}
export interface IDisposeAction extends ILoadAction {
    names: string[];
}
export type Progress = { loader: loaders.Loader, resource: loaders.Resource };
export class NotifyProducer<T> implements Producer<T> {
    public listeners: Listener<T>[] = [];
    public start(listener: Listener<T>) {
        this.listeners.push(listener);
    }
    public trigger(message: T) {
        this.listeners.forEach((listener) => {
            listener.next(message);
        });
    }
    public stop() {
        this.listeners.forEach((listener) => {
            listener.complete();
        });
    }
}
export class LoaderHandler implements Listener<ILoadAction[]> {
    private progress: NotifyProducer<Progress>;
    private load: NotifyProducer<Progress>;
    constructor() {
        this.progress = new NotifyProducer<Progress>();
        this.load = new NotifyProducer<Progress>();
        loader.on("progress", (loader, resource) => { this.progress.trigger({ loader: loader, resource: resource }) });
        loader.on("load", (loader, resource) => { this.load.trigger({ loader: loader, resource: resource }); });
    }
    public next(actions: ILoadAction[]) {
        actions.forEach((action) => {
            switch(action.type) {
                case LoadTypes[0]:
                    this.handleResource(action as any);
                    break;
                case LoadTypes[1]:
                    this.handleLoad(action);
                    break;
                case LoadTypes[2]:
                    this.handleCancel(action);
                    break;
                case LoadTypes[3]:
                    this.handleDispose(action as any);
                    break;
                default:
                    throw new Error("No such type");
            }
        });
    }
    public error() {}
    public complete() {}
    private handleResource(resource: IResource) {
        resource.resources.forEach((res: Resource) => {
            loader.add(res.name, res.url, res.options);
        });
    }
    private handleLoad(load: ILoadAction) {
        loader.load();
    }
    private handleCancel(cancel: ILoadAction) {
        loader.reset();
    }
    private handleDispose(dispose: IDisposeAction) {
        dispose.names.forEach((name: string) => {
            utils.TextureCache[name].destroy(true); 
        });
    }
    public attachProgress() {
        return Stream.create<Progress>(this.progress);
    }
    public attachLoad() {
        return Stream.create<Progress>(this.load);
    }
}