export default class SoundPlayer {
    static defaultGame = 'hl2';

    static async playSound(soundPath: string, game: string = this.defaultGame) {
        this.loadSound(soundPath, game)
        .then(sound => this.play(sound));
    }

    static async playSoundLooping(soundPath: string, game: string = this.defaultGame) {
        this.loadSound(soundPath, game)
        .then(sound => this.play(sound, true));
    }

    private static async loadSound(soundPath: string, game: string = this.defaultGame) {
        return await import("../assets/games/" + game + "/sound/" + soundPath /* @vite-ignore */);
    }

    private static play(sound: any, loop: boolean = false) {
        const audio = new Audio(sound.default);
        audio.loop = loop;
        audio.play();
    }
}