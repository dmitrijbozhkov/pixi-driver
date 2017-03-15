import { Stream } from "xstream";
import { AudioHandler, ISoundAction } from "./audioHandler";
/**
 * Creates driver for pixi-audio plugin
 * @param handler Handler for sound actions
 * @returns Function that sets handler to listen for actions
*/
export declare function makeAudioDriver(handler: AudioHandler): (actions: Stream<ISoundAction>) => void;
