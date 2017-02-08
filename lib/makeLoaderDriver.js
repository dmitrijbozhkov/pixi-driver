"use strict";
var LoaderHandler_1 = require("./LoaderHandler");
function makeLoaderDriver() {
    var handler = new LoaderHandler_1.LoaderHandler();
    return function (stream) {
        stream.addListener(handler);
    };
}
exports.makeLoaderDriver = makeLoaderDriver;
