import { WebGLRenderer, CanvasRenderer } from "pixi.js";
export type AcceptableRender = WebGLRenderer | CanvasRenderer
export class Renderer {
    private renderer: AcceptableRender;
    constructor(renderer: AcceptableRender) {
        this.renderer = renderer;
    }
}