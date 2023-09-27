export default class SoundPlayer {
    static async playSound(soundPath: string, game: string = 'hl2') {
        const sound = await import("../assets/games/" + game + "/sound/" + soundPath /* @vite-ignore */);
        const audio = new Audio(sound.default);
        audio.play();
    }
}