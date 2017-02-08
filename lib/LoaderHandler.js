"use strict";
var pixi_js_1 = require("pixi.js");
var xstream_1 = require("xstream");
var LoadTypes;
(function (LoadTypes) {
    LoadTypes[LoadTypes["resource"] = 0] = "resource";
    LoadTypes[LoadTypes["load"] = 1] = "load";
    LoadTypes[LoadTypes["cancel"] = 2] = "cancel";
    LoadTypes[LoadTypes["dispose"] = 3] = "dispose";
})(LoadTypes = exports.LoadTypes || (exports.LoadTypes = {}));
var NotifyProducer = (function () {
    function NotifyProducer() {
        this.listeners = [];
    }
    NotifyProducer.prototype.start = function (listener) {
        this.listeners.push(listener);
    };
    NotifyProducer.prototype.trigger = function (message) {
        this.listeners.forEach(function (listener) {
            listener.next(message);
        });
    };
    NotifyProducer.prototype.stop = function () {
        this.listeners.forEach(function (listener) {
            listener.complete();
        });
    };
    return NotifyProducer;
}());
exports.NotifyProducer = NotifyProducer;
var LoaderHandler = (function () {
    function LoaderHandler() {
        var _this = this;
        this.progress = new NotifyProducer();
        this.load = new NotifyProducer();
        pixi_js_1.loader.on("progress", function (loader, resource) { _this.progress.trigger({ loader: loader, resource: resource }); });
        pixi_js_1.loader.on("load", function (loader, resource) { _this.load.trigger({ loader: loader, resource: resource }); });
    }
    LoaderHandler.prototype.next = function (actions) {
        var _this = this;
        actions.forEach(function (action) {
            switch (action.type) {
                case LoadTypes[0]:
                    _this.handleResource(action);
                    break;
                case LoadTypes[1]:
                    _this.handleLoad(action);
                    break;
                case LoadTypes[2]:
                    _this.handleCancel(action);
                    break;
                case LoadTypes[3]:
                    _this.handleDispose(action);
                    break;
                default:
                    throw new Error("No such type");
            }
        });
    };
    LoaderHandler.prototype.error = function () { };
    LoaderHandler.prototype.complete = function () { };
    LoaderHandler.prototype.handleResource = function (resource) {
        resource.resources.forEach(function (res) {
            pixi_js_1.loader.add(res.name, res.url, res.options);
        });
    };
    LoaderHandler.prototype.handleLoad = function (load) {
        pixi_js_1.loader.load();
    };
    LoaderHandler.prototype.handleCancel = function (cancel) {
        pixi_js_1.loader.reset();
    };
    LoaderHandler.prototype.handleDispose = function (dispose) {
        dispose.names.forEach(function (name) {
            pixi_js_1.utils.TextureCache[name].destroy(true);
        });
    };
    LoaderHandler.prototype.attachProgress = function () {
        return xstream_1.Stream.create(this.progress);
    };
    LoaderHandler.prototype.attachLoad = function () {
        return xstream_1.Stream.create(this.load);
    };
    return LoaderHandler;
}());
exports.LoaderHandler = LoaderHandler;
