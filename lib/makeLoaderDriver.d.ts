/// <reference types="pixi.js" />
import { loaders } from "pixi.js";
import { LoaderHandler, ILoadAction } from "./LoaderHandler";
import { Stream } from "xstream";
export declare type Loader = loaders.Loader;
/**
 * Creates loader driver
 * @param handler Handler that listens for loader actions
 * @returns Function that attaches handler to listener events and returns class that queries loader events
 */
export declare function makeLoaderDriver(handler: LoaderHandler): (stream: Stream<ILoadAction[]>) => QueryLoaderEvents;
/**
 * Queries events form loader handler
 * @constructor Takes handler that manages loader
 */
export declare class QueryLoaderEvents {
    /** Loader handler */
    private handler;
    constructor(handler: LoaderHandler);
    /**
     * Attaches listener to progress events
     * @returns Stream of progress events
     */
    Progress(): Stream<{
        loader: loaders.Loader;
        resource: loaders.Resource;
    }>;
    /**
     * Attaches listener to load events
     * @returns Stream of load events
     */
    Load(): Stream<{
        loader: loaders.Loader;
        resource: loaders.Resource;
    }>;
}
