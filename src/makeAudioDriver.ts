import * as PIXI from "pixi.js";
import * as audio from "pixi-audio";
import { Stream } from "xstream";
import { AudioHandler, ISoundAction } from "./audioHandler";
/**
 * Creates driver for pixi-audio plugin
 * @param handler Handler for sound actions
 * @returns Function that sets handler to listen for actions
*/
export function makeAudioDriver(handler: AudioHandler) {
    return (actions: Stream<ISoundAction>) => {
        actions.addListener(handler);
    };
}