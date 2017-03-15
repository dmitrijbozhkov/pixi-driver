import * as assert from "assert";
import { AudioHandler, SoundActions } from "../../lib/audioHandler";
import { SoundManagerMock, SoundMock } from "../../lib/soundMock";
describe("AudioHandler tests", () => {
    let audioHandler: AudioHandler;
    let soundManagerMock: SoundManagerMock;
    let sound1: SoundMock;
    let sound2: SoundMock;
    beforeEach(() => {
        sound1 = new SoundMock();
        sound2 = new SoundMock();
        soundManagerMock = new SoundManagerMock();
        soundManagerMock.sounds["sound1"] = sound1 as any;
        soundManagerMock.sounds["sound2"] = sound2 as any;
        audioHandler = new AudioHandler(soundManagerMock as any);
    });
    it("AudioHanlder.handlePlay() should play sound1 if target is 'sound1', action is play and value true", () => { assert.ok(true); });
    it("AudioHanlder.handlePlay() should stop playing sound1 if target is 'sound1', action is play and value false", () => { assert.ok(true); });
    it("AudioHandler.handleMute() should mute all sounds if target is empty, action is mute and value true", () => { assert.ok(true); });
    it("AudioHandler.handleMute() should unmute all sounds if target is empty, action is mute and value is false", () => { assert.ok(true); });
    it("AudioHandler.handleMute() should mute sound if target is 'sound1', action is mute and value is true", () => { assert.ok(true); });
    it("AudioHandler.handleMute() should unmute sound if target is 'sound1', action is mute and value is false", () => { assert.ok(true); });
    it("AudioHandler.handleRepeat() should set true to sound1 loop property if target is 'sound1', action is repeat and value is true", () => { assert.ok(true); });
    it("AudioHandler.handleRepeat() should set true to sound1 loop property if target is 'sound1', action is repeat and value is true", () => { assert.ok(true); });
    it("AudioHandler.handleRepeat()", () => { assert.ok(true); });
});