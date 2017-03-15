"use strict";
var SoundManagerMock = (function () {
    function SoundManagerMock() {
        this.sounds = {};
    }
    SoundManagerMock.prototype.getAudio = function (name) {
        return this.sounds[name];
    };
    SoundManagerMock.prototype.removeAudio = function (audio) {
        var _this = this;
        Object.keys(this.sounds).forEach(function (key) { if (_this.sounds[key] === audio)
            delete _this.sounds[key]; });
    };
    SoundManagerMock.prototype.mute = function () {
        this.actionHandler("mute");
    };
    SoundManagerMock.prototype.unmute = function () {
        this.actionHandler("unmute");
    };
    SoundManagerMock.prototype.pause = function () {
        this.actionHandler("pause");
    };
    SoundManagerMock.prototype.resume = function () {
        this.actionHandler("resume");
    };
    return SoundManagerMock;
}());
exports.SoundManagerMock = SoundManagerMock;
var SoundMock = (function () {
    function SoundMock() {
        this.playing = false;
        this.paused = false;
        this.muted = false;
        this.loop = false;
        this.volume = 5;
    }
    SoundMock.prototype.play = function () {
        this.actionHandler("play");
    };
    SoundMock.prototype.stop = function () {
        this.actionHandler("stop");
    };
    SoundMock.prototype.remove = function () {
        this.actionHandler("remove");
    };
    return SoundMock;
}());
exports.SoundMock = SoundMock;
