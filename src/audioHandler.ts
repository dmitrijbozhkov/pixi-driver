import { Listener } from "xstream";
/** Action that will be done with sound manager */
export interface ISoundAction {
    /** Name of a sound resource */
    target?: string;
    /** Action that will be done with sound resource */
    action: string;
    /** Value to pass to action */
    value?: any;
}
/** Object that operates on specific sound */
export interface ISound {
    /** Is sound now played */
    playing: boolean;
    /** Is sound paused */
    paused: boolean;
    /** Is sound muted */
    muted: boolean;
    /** Should sound be looped */
    loop: boolean;
    /** Volume of a sound */
    volume: number;
    /** Play a sound */
    play: () => void;
    /** Stop playing sound */
    stop: () => void;
    /** Remove sound */
    remove: () => void;
}
/** Manages loaded sounds */
export interface ISoundManager {
    /** Get sound from assets */
    getAudio: (name: string) => ISound;
    /** Removes sound from assets */
    removeAudio: (audio: ISound) => void;
    /** Mute all sounds */
    mute: () => void;
    /** Unmute all sounds */
    unmute: () => void;
    /** Pauses all sounds */
    pause: () => void;
    /** Resumes all sounds */
    resume: () => void;
}
/** Actions wtih sound object */
export enum SoundActions {
    /** Plays target sound */
    play,
    /** Mutes all sounds playing */
    mute,
    /** Loops sound */
    repeat,
    /** Pauses sound */
    pause,
    /** Sets volume for sound */
    volume,
    /** Removes sound from assets */
    remove
}
/**
 * Handles actions with sound manager
 * @constructor Sets sound manager
 */
export class AudioHandler implements Listener<ISoundAction> {
    /** Manages sound resources */
    private manager: ISoundManager;
    constructor(manager: ISoundManager) {
        this.manager = manager;
    }
    /** Routes action to appropriate handler */
    public next(action: ISoundAction) {
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
    }
    /** Routes errors */
    public error() {}
    /** Action on finish */
    public complete() {}
    /** Plays or stops sound */
    private handlePlay(action: ISoundAction) {
        let sound = this.manager.getAudio(action.target);
        action.value ? sound.play() : sound.stop();
    }
    /** Mutes or unmutes sounds */
    private handleMute(action: ISoundAction) {
        if (action.target) {
            let sound = this.manager.getAudio(action.target);
            sound.muted = action.value;
        } else {
            action.value ? this.manager.mute() : this.manager.unmute();
        }
    }
    /** Sets sound for repeat */
    private handleRepeat(action: ISoundAction) {
        let sound = this.manager.getAudio(action.target);
        sound.loop = action.value;
    }
    /** Pauses sound or all sounds */
    private handlePause(action: ISoundAction) {}
    /** Sets volume for sound */
    private handleVolume(action: ISoundAction) {}
    /** Removes sound from resources */
    private handleRemove(action: ISoundAction) {}
}