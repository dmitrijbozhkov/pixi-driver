"use strict";
var pixi_js_1 = require("pixi.js");
var xstream_1 = require("xstream");
/** Types of loader actions */
var LoadTypes;
(function (LoadTypes) {
    /** Resource that needs to be loaded */
    LoadTypes[LoadTypes["resource"] = 0] = "resource";
    /** Load resources in queue */
    LoadTypes[LoadTypes["load"] = 1] = "load";
    /** Empty resource queue */
    LoadTypes[LoadTypes["cancel"] = 2] = "cancel";
    /** Removes texture from TextureCache */
    LoadTypes[LoadTypes["dispose"] = 3] = "dispose";
})(LoadTypes = exports.LoadTypes || (exports.LoadTypes = {}));
/** Notifies listeners of some action */
var NotifyProducer = (function () {
    function NotifyProducer() {
        /** Listeners to notify */
        this.listeners = [];
    }
    /** Attaches listener */
    NotifyProducer.prototype.start = function (listener) {
        this.listeners.push(listener);
    };
    /** Notifies listeners */
    NotifyProducer.prototype.trigger = function (message) {
        this.listeners.forEach(function (listener) {
            listener.next(message);
        });
    };
    /** Stops listeninig */
    NotifyProducer.prototype.stop = function () {
        this.listeners.forEach(function (listener) {
            listener.complete();
        });
    };
    return NotifyProducer;
}());
exports.NotifyProducer = NotifyProducer;
/**
 * Handles actions with loader and listens for loader events
 * @constructor Creates producers that listen for progress and load events
 */
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
    /**
     * Handles adding new resources to resource queue
     * @param resource IResource message with resources to add
     */
    LoaderHandler.prototype.handleResource = function (resource) {
        resource.resources.forEach(function (res) {
            pixi_js_1.loader.add(res.name, res.url, res.options);
        });
    };
    /**
     * Loades resources put in queue
     * @param load ILoadAction with type load
     */
    LoaderHandler.prototype.handleLoad = function (load) {
        pixi_js_1.loader.load();
    };
    /**
     * Empties resource queue
     * @param cancel ILoadAction with type cancel
     */
    LoaderHandler.prototype.handleCancel = function (cancel) {
        pixi_js_1.loader.reset();
    };
    /**
     * Removes textures from TextureCache
     * @param dispose IDisposeAction message with names of the textures to Removes
     */
    LoaderHandler.prototype.handleDispose = function (dispose) {
        dispose.names.forEach(function (name) {
            pixi_js_1.utils.TextureCache[name].destroy(true);
        });
    };
    /**
     * Attaches listener to progress events
     * @returns Stream of progress events
     */
    LoaderHandler.prototype.attachProgress = function () {
        return xstream_1.Stream.create(this.progress);
    };
    /**
     * Attaches listener to load events
     * @returns Stream of load events
     */
    LoaderHandler.prototype.attachLoad = function () {
        return xstream_1.Stream.create(this.load);
    };
    return LoaderHandler;
}());
exports.LoaderHandler = LoaderHandler;
