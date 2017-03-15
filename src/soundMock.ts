import { ISoundManager, ISound, ISoundAction } from "./audioHandler";
export class SoundManagerMock implements ISoundManager {
    public sounds: { [name: string]: ISound } = {};
    public actionHandler: (action: any) => void;
    public getAudio(name: string) {
        return this.sounds[name];
    }
    public removeAudio(audio: ISound) {
        Object.keys(this.sounds).forEach((key) => { if (this.sounds[key] === audio) delete this.sounds[key]; });
    }
    public mute() {
        this.actionHandler("mute");
    }
    public unmute() {
        this.actionHandler("unmute");
    }
    public pause() {
        this.actionHandler("pause");
    }
    public resume() {
        this.actionHandler("resume");
    }
}
export class SoundMock implements ISound {
    public playing: boolean = false;
    public paused: boolean = false;
    public muted: boolean = false;
    public loop: boolean = false;
    public volume: number = 5;
    public actionHandler: (action: any) => void;
    public play() {
        this.actionHandler("play");
    }
    public stop() {
        this.actionHandler("stop");
    }
    public remove() {
        this.actionHandler("remove");
    }
}