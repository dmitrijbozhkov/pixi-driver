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
export declare enum SoundActions {
    /** Plays target sound */
    play = 0,
    /** Mutes all sounds playing */
    mute = 1,
    /** Loops sound */
    repeat = 2,
    /** Pauses sound */
    pause = 3,
    /** Sets volume for sound */
    volume = 4,
    /** Removes sound from assets */
    remove = 5,
}
/**
 * Handles actions with sound manager
 * @constructor Sets sound manager
 */
export declare class AudioHandler implements Listener<ISoundAction> {
    /** Manages sound resources */
    private manager;
    constructor(manager: ISoundManager);
    /** Routes action to appropriate handler */
    next(action: ISoundAction): void;
    /** Routes errors */
    error(): void;
    /** Action on finish */
    complete(): void;
    /** Plays or stops sound */
    private handlePlay(action);
    /** Mutes or unmutes sounds */
    private handleMute(action);
    /** Sets sound for repeat */
    private handleRepeat(action);
    /** Pauses sound or all sounds */
    private handlePause(action);
    /** Sets volume for sound */
    private handleVolume(action);
    /** Removes sound from resources */
    private handleRemove(action);
}
