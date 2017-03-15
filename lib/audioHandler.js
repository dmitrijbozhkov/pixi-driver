"use strict";
/** Actions wtih sound object */
var SoundActions;
(function (SoundActions) {
    /** Plays target sound */
    SoundActions[SoundActions["play"] = 0] = "play";
    /** Mutes all sounds playing */
    SoundActions[SoundActions["mute"] = 1] = "mute";
    /** Loops sound */
    SoundActions[SoundActions["repeat"] = 2] = "repeat";
    /** Pauses sound */
    SoundActions[SoundActions["pause"] = 3] = "pause";
    /** Sets volume for sound */
    SoundActions[SoundActions["volume"] = 4] = "volume";
    /** Removes sound from assets */
    SoundActions[SoundActions["remove"] = 5] = "remove";
})(SoundActions = exports.SoundActions || (exports.SoundActions = {}));
/**
 * Handles actions with sound manager
 * @constructor Sets sound manager
 */
var AudioHandler = (function () {
    function AudioHandler(manager) {
        this.manager = manager;
    }
    /** Routes action to appropriate handler */
    AudioHandler.prototype.next = function (action) {
        switch (action.target) {
            case SoundActions[0]:
                this.handlePlay(action);
                break;
            case SoundActions[1]:
                this.handleMute(action);
                break;
            case SoundActions[2]:
                this.handleRepeat(action);
                break;
            case SoundActions[3]:
                this.handlePause(action);
                break;
            case SoundActions[4]:
                this.handleVolume(action);
                break;
            case SoundActions[5]:
                this.handleRemove(action);
        }
    };
    /** Routes errors */
    AudioHandler.prototype.error = function () { };
    /** Action on finish */
    AudioHandler.prototype.complete = function () { };
    /** Plays or stops sound */
    AudioHandler.prototype.handlePlay = function (action) {
        var sound = this.manager.getAudio(action.target);
        action.value ? sound.play() : sound.stop();
    };
    /** Mutes or unmutes sounds */
    AudioHandler.prototype.handleMute = function (action) {
        if (action.target) {
            var sound = this.manager.getAudio(action.target);
            sound.muted = action.value;
        }
        else {
            action.value ? this.manager.mute() : this.manager.unmute();
        }
    };
    /** Sets sound for repeat */
    AudioHandler.prototype.handleRepeat = function (action) {
        var sound = this.manager.getAudio(action.target);
        sound.loop = action.value;
    };
    /** Pauses sound or all sounds */
    AudioHandler.prototype.handlePause = function (action) { };
    /** Sets volume for sound */
    AudioHandler.prototype.handleVolume = function (action) { };
    /** Removes sound from resources */
    AudioHandler.prototype.handleRemove = function (action) { };
    return AudioHandler;
}());
exports.AudioHandler = AudioHandler;
