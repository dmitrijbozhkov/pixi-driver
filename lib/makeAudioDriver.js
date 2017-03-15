"use strict";
/**
 * Creates driver for pixi-audio plugin
 * @param handler Handler for sound actions
 * @returns Function that sets handler to listen for actions
*/
function makeAudioDriver(handler) {
    return function (actions) {
        actions.addListener(handler);
    };
}
exports.makeAudioDriver = makeAudioDriver;
