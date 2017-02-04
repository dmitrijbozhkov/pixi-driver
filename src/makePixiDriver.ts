import { Stream } from "xstream";
import { WebGLRenderer, CanvasRenderer } from "pixi.js";
import { AcceptableRender } from "./RendererHandler";
export type Renderers = { [name: string]: AcceptableRender };
export function makePixiDriver(Renderers: Renderers) {
    return () => {
    }
}