"use strict";
var LoaderHandler_1 = require("./LoaderHandler");
function makeLoaderDriver(loader) {
    var handler = new LoaderHandler_1.LoaderHandler(loader);
    return function () {
    };
}
exports.makeLoaderDriver = makeLoaderDriver;
