/// <reference types="pixi.js" />
import { WebGLRenderer, CanvasRenderer } from "pixi.js";
export declare type AcceptableRender = WebGLRenderer | CanvasRenderer;
export declare class Renderer {
    private renderer;
    constructor(renderer: AcceptableRender);
}
