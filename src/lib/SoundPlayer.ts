import { Howl } from "howler";

export default class SoundPlayer {
    static defaultGame = 'hl2';

    static playSoundFile(file: File, volume: number = 1.0, game: string = this.defaultGame): HTMLAudioElement {
        const url = URL.createObjectURL(file);
        const audio = new Audio(url);
        audio.volume = this.clampVolume(volume);
        audio.play();

        return audio;
    }

    static playSoundFileLoop(file: File, volume: number = 1.0, game: string = this.defaultGame): Promise<Howl> {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const base64data = reader.result;
    
                if (typeof base64data !== 'string')
                    return;
    
                var audio = new Howl({
                    src: [base64data],
                    volume: volume,
                    autoplay: false,
                    loop: true
                });
                audio.play();

                resolve(audio);
            }
        });
    }

    private static clampVolume(volume: number): number {
        if (volume > 1.0) {
            return 1.0;
        }

        if (volume < 0.0) {
            return 0.0;
        }

        return volume;
    }
}