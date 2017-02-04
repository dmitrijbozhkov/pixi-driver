import { AcceptableRender } from "./RendererHandler";
export declare type Renderers = {
    [name: string]: AcceptableRender;
};
export declare function makePixiDriver(Renderers: Renderers): () => void;
