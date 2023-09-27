<script lang="ts">
import { Component, Emit, Prop, Ref, Vue, toNative } from 'vue-facing-decorator';
import SoundscapeScriptParser from '@/lib/SoundscapeScriptParser';
import SoundPlayer from '@/lib/SoundPlayer';
import SoundscapeScriptDetails from '@/components/SoundscapeScriptDetails.vue';
import type SoundscapeScript from '@/model/SoundscapeScript';
import { useStore } from '@/store';
import SoundscapeDirector from '@/components/SoundscapeDirector.vue';

@Component({
    components: {
        SoundscapeScriptDetails,
        SoundscapeDirector
    }
})
class Settings extends Vue {
    store: any = useStore();
    
    file: any;
    successfullyAdded: boolean = false;

    @Ref('fileInput')
    fileInput!: HTMLInputElement;

    get soundscapeScripts() {
        return this.store.getters.soundscapeScripts;
    }

    readFile() {
        if (this.fileInput.files === null) return;

        this.file = this.fileInput.files[0];
        const reader = new FileReader();

        reader.onload = this.loadFile;
        reader.onerror = (err) => console.log(err);
        reader.readAsText(this.file);
    }

    private loadFile(readerResult: ProgressEvent<FileReader>) {
        let rawText = readerResult.target!.result!.toString();
        let loadedScript = SoundscapeScriptParser.parse(rawText);
        loadedScript.title = this.file.name;
        this.soundscapeScriptLoaded(loadedScript);

        this.playSound('ui/buttonclick.wav');

        this.successfullyAdded = true;
    }

    async playSound(soundPath: string) {
        SoundPlayer.playSound(soundPath);
    }

    soundscapeScriptLoaded(script: SoundscapeScript) {
        this.store.dispatch('addSoundscapeScript', { script });

        console.log(this.store.state.soundscapeScripts);
        console.log(this.store.state.playingSoundscapes);
        this.playSoundscape();
    }

    playSoundscape() {
        let soundscape = this.store.state.soundscapeScripts[0].soundscapes[17];
        console.log(soundscape);
        this.store.dispatch('playSoundscape', { soundscape });
    }
}

export default toNative(Settings);

</script>

<template>
    <div class="content">
        <h1 class="title">Settings</h1>

        <label for="path">Import soundscape script</label>
        <input id="path" type="file" ref="fileInput" @change="readFile()">
        <p v-if="successfullyAdded">Soundscape script successfully added.</p>

        <button @click="playSound('ui/buttonclick.wav')">Play</button>
    </div>

    <SoundscapeDirector />
</template>

<style></style>
