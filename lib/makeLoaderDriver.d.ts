/// <reference types="pixi.js" />
import { loaders } from "pixi.js";
import { ILoadAction } from "./LoaderHandler";
import { Stream } from "xstream";
export declare type Loader = loaders.Loader;
/** Creates loader driver */
export declare function makeLoaderDriver(): (stream: Stream<ILoadAction[]>) => void;
