export default class SoundPlayer {
    static defaultGame = 'hl2';

    static playSoundFile(file: File, volume: number = 1.0, game: string = this.defaultGame): HTMLAudioElement {
        return this.play(file, volume, false, game);
    }

    static playSoundFileLoop(file: File, volume: number = 1.0, game: string = this.defaultGame): HTMLAudioElement {
        return this.play(file, volume, true, game);
    }

    private static play(file: File, volume: number, loop: boolean = false, game: string): HTMLAudioElement {
        const url = URL.createObjectURL(file);
        const audio = new Audio(url);
        audio.volume = volume;
        audio.loop = loop;
        audio.play();

        return audio;
    }
}