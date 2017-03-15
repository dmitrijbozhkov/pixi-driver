import { loaders } from "pixi.js";
import { LoaderHandler, ILoadAction } from "./LoaderHandler";
import { Stream } from "xstream";
export type Loader = loaders.Loader;
/**
 * Creates loader driver
 * @param handler Handler that listens for loader actions
 * @returns Function that attaches handler to listener events and returns class that queries loader events
 */
export function makeLoaderDriver(handler: LoaderHandler) {
    return (stream: Stream<ILoadAction[]>) => {
        stream.addListener(handler);
        return new QueryLoaderEvents(handler);
    };
}
/**
 * Queries events form loader handler
 * @constructor Takes handler that manages loader
 */
export class QueryLoaderEvents {
    /** Loader handler */
    private handler: LoaderHandler;
    constructor(handler: LoaderHandler) {
        this.handler = handler;
    }
    /**
     * Attaches listener to progress events
     * @returns Stream of progress events
     */
    public Progress() {
        return this.handler.attachProgress();
    }
    /**
     * Attaches listener to load events
     * @returns Stream of load events
     */
    public Load() {
        return this.handler.attachLoad();
    }
}