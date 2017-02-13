import * as assert from "assert";
import { LoaderHandler, IResource, LoadTypes, ILoadAction, IDisposeAction } from "../../lib/LoaderHandler";
import { loader, utils } from "pixi.js";

describe("Loader tests", () => {
    let handler: LoaderHandler;
    let res1: string;
    let res1Name: string;
    let res2: string;
    let res2Name: string;
    let resMessage: IResource;
    let loadMessage: ILoadAction;
    beforeEach(() => {
        for (let textureUrl in utils.BaseTextureCache) {
            delete utils.BaseTextureCache[textureUrl];
        }
        for (let textureUrl in utils.TextureCache) {
            delete utils.TextureCache[textureUrl];
        }
        loader.reset();
        handler = new LoaderHandler();
        res1 = "http://www.w3schools.com/css/img_fjords.jpg";
        res1Name = "resource1";
        res2 = "http://www.w3schools.com/css/trolltunga.jpg";
        res2Name = "resource2";
        resMessage = {
            type: LoadTypes[0],
            resources: [
                { name: res1Name, url: res1, options: { crossOrigin: true } },
                { name: res2Name, url: res2, options: { crossOrigin: true } }
            ]
        };
        loadMessage = {
            type: LoadTypes[1]
        };
    });
    it("LoaderHandler should put resources in TextureCache", function(done) {
        handler.next([resMessage, loadMessage]);
        this.timeout(7000);
        setTimeout(() => {
            assert.ok(utils.TextureCache[res1Name]);
            assert.ok(utils.TextureCache[res2Name]);
            done();
        }, 5000);
    });
    it("LoaderHandler.attachProgress() should return stream of progress notifications", function(done) {
        let progress$ = handler.attachProgress();
        let resName;
        progress$.addListener({
            next(p) { resName = p.resource.name; },
            error() {},
            complete() {}
        });
        resMessage = {
            type: LoadTypes[0],
            resources: [
                { name: res1Name, url: res1, options: { crossOrigin: true } }
            ]
        };
        handler.next([resMessage, loadMessage]);
        this.timeout(5000);
        setTimeout(() => {
            assert.deepEqual(resName, res1Name);
            done();
        }, 4900);
    });
    it("LoaderHandler.attachLoad() should return stream of load notifications", function(done) {
        let loaded$ = handler.attachLoad();
        let resource;
        loaded$.addListener({
            next(l) { resource = l.resource.name; },
            error() {},
            complete() {}
        });
        resMessage = {
            type: LoadTypes[0],
            resources: [
                { name: res1Name, url: res1, options: { crossOrigin: true } }
            ]
        };
        handler.next([resMessage, loadMessage]);
        this.timeout(5000);
        setTimeout(() => {
             assert.deepEqual(resource, res1Name);
             done();
        }, 4900);
    });
    it("Commands with type cancel should reset loader", () => {
        loadMessage.type = LoadTypes[2];
        handler.next([resMessage, loadMessage]);
        let resources = Object.keys(loader.resources).length;
        assert.deepEqual(resources, 0);
    });
    it("Commands with type dispose should remove specified resource from cache", function(done) {
        handler.next([resMessage, loadMessage]);
        this.timeout(7000);
        setTimeout(() => {
            assert.ok(utils.TextureCache[res1Name]);
            assert.ok(utils.TextureCache[res2Name]);
            let disposeMessage: IDisposeAction = {
                type: LoadTypes[3],
                names: [res1Name, res2Name]
            };
            handler.next([disposeMessage]);
            assert.deepStrictEqual(utils.TextureCache[res1Name].baseTexture, null);
            assert.deepStrictEqual(utils.TextureCache[res2Name].baseTexture, null);
            done();
        }, 5000);
    });
});