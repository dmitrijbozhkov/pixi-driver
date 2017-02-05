import { loaders } from "pixi.js";
import { Loader } from "./makeLoaderDriver";
export class LoaderHandler {
    private loader: Loader;
    constructor(loader: Loader) {
        this.loader = loader;
        // this.loader.on("", () => {});
    }
    public add() {
    }
}