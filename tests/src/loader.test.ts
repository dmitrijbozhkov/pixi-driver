import * as assert from "assert";
var Blob = require("blob");
import { LoaderHandler, IResource, LoadTypes, ILoadAction } from "../../lib/LoaderHandler";
import { loader, utils } from "pixi.js";

describe("Loader tests", () => {
    let handler: LoaderHandler;
    beforeEach(() => {
        for(var textureUrl in utils.BaseTextureCache) {
            delete utils.BaseTextureCache[textureUrl];
        }
        for(var textureUrl in utils.TextureCache) {
            delete utils.TextureCache[textureUrl];
        }
        loader.reset();
        handler = new LoaderHandler();
    });
    it("LoaderHandler should put resources in TextureCache", () => {
        let res1 = new Blob("kek");
        let res1Name = "resource1";
        let res2 = new Blob("lel");
        let res2Name = "resource2";
        let resMessage: IResource = {
            type: LoadTypes[0],
            resources: [
                { name: res1Name, url: URL.createObjectURL(res1) },
                { name: res2Name, url: URL.createObjectURL(res2) }
            ]
        };
        let loadMessage: ILoadAction = {
            type: LoadTypes[1]
        };
        handler.next([resMessage, loadMessage]);
        console.log(utils.TextureCache[res1Name]);
        console.log(utils.TextureCache[res2Name]);
    });
    it("LoaderHandler.attachProgress() should return stream of progress notifications");
    it("LoaderHandler.attachLoad() should return stream of load notifications");
    it("Commands with type cancel should reset loader");
    it("Commands with type dispose should remove specified resource from cache");
});