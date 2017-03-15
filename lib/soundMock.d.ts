import { ISoundManager, ISound } from "./audioHandler";
export declare class SoundManagerMock implements ISoundManager {
    sounds: {
        [name: string]: ISound;
    };
    actionHandler: (action: any) => void;
    getAudio(name: string): ISound;
    removeAudio(audio: ISound): void;
    mute(): void;
    unmute(): void;
    pause(): void;
    resume(): void;
}
export declare class SoundMock implements ISound {
    playing: boolean;
    paused: boolean;
    muted: boolean;
    loop: boolean;
    volume: number;
    actionHandler: (action: any) => void;
    play(): void;
    stop(): void;
    remove(): void;
}
