<script lang="ts">
import { Component, Emit, Prop, Ref, Vue, toNative } from 'vue-facing-decorator';
import SoundscapeScriptParser from '@/lib/SoundscapeScriptParser';
import SoundPlayer from '@/lib/SoundPlayer';
import SoundscapeScriptDetails from '@/components/SoundscapeScriptDetails.vue';
import type SoundscapeScript from '@/model/SoundscapeScript';
import { useStore } from '@/store';

@Component({
    components: {
        SoundscapeScriptDetails
    }
})
class Settings extends Vue {
    store: any = useStore();
    
    file: any;
    successfullyAddedSoundscape: boolean = false;
    successfullyAddedFolder: boolean = false;

    @Ref('fileInput')
    fileInput!: HTMLInputElement;

    @Ref('folderInput')
    folderInput!: HTMLInputElement;

    get soundscapeScripts() {
        return this.store.getters.soundscapeScripts;
    }

    get soundFileAmount() {
        return Object.keys(this.store.getters.soundFiles).length;
    }

    get soundscapeScriptAmount() {
        return this.soundscapeScripts.length;
    }

    readFile() {
        if (this.fileInput.files === null) return;

        this.file = this.fileInput.files[0];
        const reader = new FileReader();

        reader.onload = this.loadFile;
        reader.onerror = (err) => console.log(err);
        reader.readAsText(this.file);
    }

    readFolder() {
        if (!this.folderInput.files) {
            return;
        }

        for (let i = 0; i < this.folderInput.files.length; i++) {
            let file = this.folderInput.files[i];
            this.store.dispatch('addSoundFile', { file });
        }

        this.successfullyAddedFolder = true;
    }

    private loadFile(readerResult: ProgressEvent<FileReader>) {
        let rawText = readerResult.target!.result!.toString();
        let loadedScript = SoundscapeScriptParser.parse(rawText);
        loadedScript.title = this.file.name;
        this.soundscapeScriptLoaded(loadedScript);

        this.successfullyAddedSoundscape = true;
    }

    soundscapeScriptLoaded(script: SoundscapeScript) {
        this.store.dispatch('addSoundscapeScript', { script });
    }
}

export default toNative(Settings);

</script>

<template>
    <div class="content">
        <h1 class="title">Settings</h1>

        <h2>Statistics</h2>
        <p>Imported soundscapes: {{ soundscapeScriptAmount }}</p>
        <p>Imported sounds: {{ soundFileAmount }}</p>

        <hr>

        <h2>Import new</h2>
        <label for="path">Import soundscape script</label>
        <input id="path" type="file" ref="fileInput" @change="readFile()">
        <p v-if="successfullyAddedSoundscape">Soundscape script successfully added.</p>

        <label for="folder">Import "sound" folder</label>
        <input type="file" id="folder" ref="folderInput" @change="readFolder()" webkitdirectory directory multiple/>
        <p v-if="successfullyAddedFolder">Sound folder successfully added.</p>

    </div>
</template>

<style>
label {
    cursor: pointer;
    border: 1px solid;
    background-color: rgb(var(--lighter));
    width: fit-content;

    padding: 15px;
    margin: 15px;
}

label:hover {
    background-color: rgb(var(--lightest));
}

input {
    display: none;
}

hr {
    margin-top: 30px;
    margin-bottom: 30px;
}
</style>
