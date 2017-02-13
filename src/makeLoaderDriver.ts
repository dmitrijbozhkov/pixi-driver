import { loaders } from "pixi.js";
import { LoaderHandler, ILoadAction } from "./LoaderHandler";
import { Stream } from "xstream";
export type Loader = loaders.Loader;
/** Creates loader driver */
export function makeLoaderDriver() {
    let handler = new LoaderHandler();
    return (stream: Stream<ILoadAction[]>) => {
        stream.addListener(handler);
    };
}