<script lang="ts">
import type Soundscape from "@/model/Soundscape";
import type SoundscapeAction from "@/model/SoundscapeAction";
import SoundPlayer from "@/lib/SoundPlayer";
import { useStore } from "@/store";
import { Component, Emit, Prop, Vue, toNative } from "vue-facing-decorator";

@Component
class SoundscapePlayer extends Vue {
    store: any = useStore();

    @Prop({ required: true })
    soundscape!: Soundscape;

    timers: { [key: number]: ReturnType<typeof setTimeout> } = {};

    activeLoopingSounds: HTMLAudioElement[] = [];

    mounted() {
        console.log("playing " + this.soundscape.name);
        this.play();
    }

    unmounted() {
        console.log("stopping " + this.soundscape.name);
        this.stop();
    }

    get soundscapeScripts() {
        return this.store.state.soundscapeScripts;
    }

    play() {
        this.soundscape.actions.forEach((action, index) => {
            this.playActionOnRepeat(action, index);
        })
    }

    stop() {
        this.clearTimers();
        this.stopLoops();
    }

    @Emit
    playOtherSoundscape(soundscape: Soundscape) {
        return soundscape;
    }

    private clearTimers() {
        for (const actionIndex in this.timers) {
            clearTimeout(this.timers[actionIndex]);
        }

        this.timers = {};
    }

    private stopLoops() {
        this.activeLoopingSounds.forEach(sound => {
            sound.pause();
        });

        this.activeLoopingSounds = [];
    }

    private playActionOnRepeat(action: SoundscapeAction, actionIndex: number) {
        if (!this.shouldRepeat(action)) {
            this.playAction(action);
            return;
        }

        let delay = this.getRandomDelay(action) * 1000;

        this.timers[actionIndex] = setTimeout(() => {
            this.playAction(action);
            this.playActionOnRepeat(action, actionIndex);
        }, delay);
    }

    private shouldRepeat(action: SoundscapeAction): boolean {
        if (action.type === 'playsoundscape') {
            return false;
        }

        if (action.type === 'playlooping') {
            return false;
        }

        return true;
    }

    private getRandomDelay(action: SoundscapeAction) {
        let max = action.time.max;
        let min = action.time.min;
        return this.randInt(min, max);
    }

    private getRandomVolume(action: SoundscapeAction) {
        let max = action.volume.max;
        let min = action.volume.min;
        return this.randFloat(min, max);
    }

    private randInt(min: number, max: number): number {
        return Math.floor(this.randFloat(min, max));
    }

    private randFloat(min: number, max: number): number {
        return Math.random() * (max - min + 1) + min;
    }

    private playAction(action: SoundscapeAction) {
        if (action.type === 'playrandom') {
            this.playActionRandom(action);
        }

        if (action.type === 'playlooping') {
            this.playActionLooping(action);
        }

        if (action.type === 'playsoundscape') {
            this.playActionSoundscape(action);
        }
    }

    private playActionSoundscape(action: SoundscapeAction) {
        let soundscapes = this.getAllSoundscapes();
        let soundscape = this.findSoundscapeByName(soundscapes, action.soundscapeToPlay);

        if (soundscape)
            this.playOtherSoundscape(soundscape);
    }

    private playActionLooping(action: SoundscapeAction) {
        if (action.rndwave.length === 0)
            return;

        let soundPath = action.rndwave[0];
        let soundFile = this.getSoundFile(soundPath);

        if (!soundFile)
            return;

        let randomVolume = this.getRandomVolume(action);
        let sound = SoundPlayer.playSoundFileLoop(soundFile, randomVolume);

        this.activeLoopingSounds.push(sound);
    }

    private playActionRandom(action: SoundscapeAction) {
        let soundPath = this.getRandomSound(action);
        let soundFile = this.getSoundFile(soundPath);

        let randomVolume = this.getRandomVolume(action);

        if (soundFile)
            SoundPlayer.playSoundFile(soundFile, randomVolume);
    }

    private getRandomSound(action: SoundscapeAction) {
        let sounds = action.rndwave;
        let index = Math.floor(Math.random() * sounds.length);

        return sounds[index];
    }

    private findSoundscapeByName(soundscapes: Soundscape[], nameToFind: string) {
        return soundscapes.find(soundscape => soundscape.name === nameToFind);
    }

    private getAllSoundscapes(): Soundscape[] {
        return this.store.getters.allSoundscapes;
    }

    private getSoundFile(path: string): File | null {
        let soundFiles = this.getSoundFilesFromStorage();

        path = this.appendSoundFolder(path);
        path = this.removeSpecialCharacters(path);

        if (path in soundFiles)
            return soundFiles[path];
        else
            return null;
    }

    private getSoundFilesFromStorage(): { [key: string]: File } {
        return this.store.getters.soundFiles;
    }

    private removeSpecialCharacters(path: string): string {
        // Some sounds have special characters: https://developer.valvesoftware.com/wiki/Soundscripts#Sound_Characters
        return path.replace(new RegExp('[\@\>\<\^\)\}\$\!\?\&\~\`\+\(\%]'), '');
    }

    private appendSoundFolder(path: string) {
        if (!path.startsWith('sound/'))
            return 'sound/' + path;

        return path;
    }
}

export default toNative(SoundscapePlayer);

</script>