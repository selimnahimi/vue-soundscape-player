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

    activeSounds: HTMLAudioElement[] = [];

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
        for (const actionIndex in this.timers) {
            clearTimeout(this.timers[actionIndex]);
        }

        this.timers = {};
    }

    @Emit
    playOtherSoundscape(soundscape: Soundscape) {
        return soundscape;
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
        return Math.floor(Math.random() * (max - min + 1) + min);
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
        console.log("playing loop");
        SoundPlayer.playSoundLooping(action.rndwave[0]);
    }

    private playActionRandom(action: SoundscapeAction) {
        let sound = this.getRandomSound(action);
        SoundPlayer.playSound(sound);
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
}

export default toNative(SoundscapePlayer);

</script>