/// <reference types="pixi.js" />
import { loaders } from "pixi.js";
import { Listener, Producer, Stream } from "xstream";
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
export declare enum LoadTypes {
    /** Resource that needs to be loaded */
    resource = 0,
    /** Load resources in queue */
    load = 1,
    /** Empty resource queue */
    cancel = 2,
    /** Removes texture from TextureCache */
    dispose = 3,
}
/** Action to make with loader */
export interface ILoadAction {
    type: string;
}
/** Resource to put into loading queue */
export declare type Resource = {
    name: string;
    url: string;
    options?: ILoaderOptions;
};
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
export declare type Progress = {
    loader: loaders.Loader;
    resource: loaders.Resource;
};
/** Notifies listeners of some action */
export declare class NotifyProducer<T> implements Producer<T> {
    /** Listeners to notify */
    listeners: Listener<T>[];
    /** Attaches listener */
    start(listener: Listener<T>): void;
    /** Notifies listeners */
    trigger(message: T): void;
    /** Stops listeninig */
    stop(): void;
}
/**
 * Handles actions with loader and listens for loader events
 * @constructor Creates producers that listen for progress and load events
 */
export declare class LoaderHandler implements Listener<ILoadAction[]> {
    private progress;
    private load;
    constructor();
    next(actions: ILoadAction[]): void;
    error(): void;
    complete(): void;
    /**
     * Handles adding new resources to resource queue
     * @param resource IResource message with resources to add
     */
    private handleResource(resource);
    /**
     * Loades resources put in queue
     * @param load ILoadAction with type load
     */
    private handleLoad(load);
    /**
     * Empties resource queue
     * @param cancel ILoadAction with type cancel
     */
    private handleCancel(cancel);
    /**
     * Removes textures from TextureCache
     * @param dispose IDisposeAction message with names of the textures to Removes
     */
    private handleDispose(dispose);
    /**
     * Attaches listener to progress events
     * @returns Stream of progress events
     */
    attachProgress(): Stream<Progress>;
    /**
     * Attaches listener to load events
     * @returns Stream of load events
     */
    attachLoad(): Stream<Progress>;
}
