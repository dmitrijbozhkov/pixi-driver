/// <reference types="pixi.js" />
import { loaders } from "pixi.js";
export declare type Loader = loaders.Loader;
export declare function makeLoaderDriver(loader: Loader): () => void;
