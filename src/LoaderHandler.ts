import { loader, utils, loaders } from "pixi.js";
import { Listener, Producer, Stream } from "xstream";
import { Loader } from "./makeLoaderDriver";
/** Options how to make request */
export interface ILoaderOptions {
    /** Is resource from another resource */
    crossOrigin?: boolean | string;
    /** How request will be loaded */
    loadType?: number;
    /** Type of the xhr request */
    xhrType?: string;
    /** Request metadata */
    metaData?: any;
}
/** Types of loader actions */
export enum LoadTypes {
    /** Resource that needs to be loaded */
    resource,
    /** Load resources in queue */
    load,
    /** Empty resource queue */
    cancel,
    /** Removes texture from TextureCache */
    dispose
}
/** Action to make with loader */
export interface ILoadAction {
    type: string;
}
/** Resource to put into loading queue */
export type Resource = { name: string, url: string, options?: ILoaderOptions };
/** Resource action */
export interface IResource extends ILoadAction {
    /** Resources to add */
    resources: Resource[];
}
/** Removes textures from TextureCache */
export interface IDisposeAction extends ILoadAction {
    /** Names of textures */
    names: string[];
}
/** Progress of resource loading */
export type Progress = { loader: loaders.Loader, resource: loaders.Resource };
/** Notifies listeners of some action */
export class NotifyProducer<T> implements Producer<T> {
    /** Listeners to notify */
    public listeners: Listener<T>[] = [];
    /** Attaches listener */
    public start(listener: Listener<T>) {
        this.listeners.push(listener);
    }
    /** Notifies listeners */
    public trigger(message: T) {
        this.listeners.forEach((listener) => {
            listener.next(message);
        });
    }
    /** Stops listeninig */
    public stop() {
        this.listeners.forEach((listener) => {
            listener.complete();
        });
    }
}
/**
 * Handles actions with loader and listens for loader events
 * @constructor Creates producers that listen for progress and load events
 */
export class LoaderHandler implements Listener<ILoadAction[]> {
    private progress: NotifyProducer<Progress>;
    private load: NotifyProducer<Progress>;
    constructor() {
        this.progress = new NotifyProducer<Progress>();
        this.load = new NotifyProducer<Progress>();
        loader.on("progress", (loader, resource) => { this.progress.trigger({ loader: loader, resource: resource }); });
        loader.on("load", (loader, resource) => { this.load.trigger({ loader: loader, resource: resource }); });
    }
    public next(actions: ILoadAction[]) {
        actions.forEach((action) => {
            switch (action.type) {
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
    /**
     * Handles adding new resources to resource queue
     * @param resource IResource message with resources to add
     */
    private handleResource(resource: IResource) {
        resource.resources.forEach((res: Resource) => {
            loader.add(res.name, res.url, res.options);
        });
    }
    /**
     * Loades resources put in queue
     * @param load ILoadAction with type load
     */
    private handleLoad(load: ILoadAction) {
        loader.load();
    }
    /**
     * Empties resource queue
     * @param cancel ILoadAction with type cancel
     */
    private handleCancel(cancel: ILoadAction) {
        loader.reset();
    }
    /**
     * Removes textures from TextureCache
     * @param dispose IDisposeAction message with names of the textures to Removes
     */
    private handleDispose(dispose: IDisposeAction) {
        dispose.names.forEach((name: string) => {
            utils.TextureCache[name].destroy(true);
        });
    }
    /**
     * Attaches listener to progress events
     * @returns Stream of progress events
     */
    public attachProgress() {
        return Stream.create<Progress>(this.progress);
    }
    /**
     * Attaches listener to load events
     * @returns Stream of load events
     */
    public attachLoad() {
        return Stream.create<Progress>(this.load);
    }
}