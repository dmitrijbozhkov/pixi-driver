"use strict";
/**
 * Creates loader driver
 * @param handler Handler that listens for loader actions
 * @returns Function that attaches handler to listener events and returns class that queries loader events
 */
function makeLoaderDriver(handler) {
    return function (stream) {
        stream.addListener(handler);
        return new QueryLoaderEvents(handler);
    };
}
exports.makeLoaderDriver = makeLoaderDriver;
/**
 * Queries events form loader handler
 * @constructor Takes handler that manages loader
 */
var QueryLoaderEvents = (function () {
    function QueryLoaderEvents(handler) {
        this.handler = handler;
    }
    /**
     * Attaches listener to progress events
     * @returns Stream of progress events
     */
    QueryLoaderEvents.prototype.Progress = function () {
        return this.handler.attachProgress();
    };
    /**
     * Attaches listener to load events
     * @returns Stream of load events
     */
    QueryLoaderEvents.prototype.Load = function () {
        return this.handler.attachLoad();
    };
    return QueryLoaderEvents;
}());
exports.QueryLoaderEvents = QueryLoaderEvents;
