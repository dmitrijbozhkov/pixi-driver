import { loaders } from "pixi.js";
import { LoaderHandler } from "./LoaderHandler";
export type Loader = loaders.Loader;
export function makeLoaderDriver(loader: Loader) {
    let handler = new LoaderHandler(loader);
    return () => {

    };
}