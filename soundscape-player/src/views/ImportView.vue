<script lang="ts">
import { Component, Ref, Vue, toNative } from 'vue-facing-decorator';
import SoundscapeScriptParser from '@/lib/SoundscapeScriptParser';
import type SoundscapeScript from '@/model/SoundscapeScript';
import { useStore } from '@/store';

@Component
class Settings extends Vue {
    store: any = useStore();
    
    file: File | null = null;
    successfullyAddedSoundscape: boolean = false;
    successfullyAddedFolder: boolean = false;
    errorMessage: string = '';

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
        this.errorMessage = '';

        if (!this.fileInput.files) {
            this.errorMessage = 'You must select a soundscape file!';
            return;   
        }

        this.file = this.fileInput.files[0];

        if (!this.file.name.includes('soundscape') || !this.file.name.endsWith('.txt')) {
            this.errorMessage = 'You must select a soundscape file!';
            return;
        }

        const reader = new FileReader();

        reader.onload = this.loadFile;
        reader.onerror = (err) => console.log(err);
        reader.readAsText(this.file);
    }

    readFolder() {
        this.errorMessage = '';

        if (!this.folderInput.files) {
            this.errorMessage = 'You must select a sound folder!';
            return;
        }

        for (let i = 0; i < this.folderInput.files.length; i++) {
            const file = this.folderInput.files[i];
            
            if (!file.webkitRelativePath.startsWith('sound/')) {
                this.errorMessage = 'You must select a sound folder!';
                return;
            }

            if (!this.isSoundFile(file)) {
                continue;
            }

            this.store.dispatch('addSoundFile', { file });
        }

        this.successfullyAddedFolder = true;
    }

    private isSoundFile(file: File): boolean {
        let acceptedExtensions = ['.wav', '.mp3', '.ogg'];
        
        for (const ext of acceptedExtensions) {
            if (file.name.endsWith(ext)) {
                return true;
            }
        }

        return false;
    }

    private loadFile(readerResult: ProgressEvent<FileReader>) {
        if (!this.file) {
            this.errorMessage = 'Failed to load soundscript file';
            return;
        }

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
        <h1 class="title">Import</h1>

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

        <p v-if="errorMessage" class="error">Import failed: {{ errorMessage }}</p>

        <h2 style="margin-top: 30px">Help for importing soundscape scripts</h2>
        <p>Every source game has a <span>script</span> folder where all the scripts are stored.</p>
        <p>Among them there are files which names start with the word <span>soundscape</span>.</p>
        <p>You can import these into this application.</p>

        <h2 style="margin-top: 30px">Help for importing sounds</h2>
        <p>Every source game has a <span>sound</span> folder where all the audio files are stored.</p>
        <p>This is usually stored in a <span>vpk</span> package. You must extract it using <span>GCFScape</span>, then import it into this application.</p>
        <p>A guide to do this can be found here: <a href="https://developer.valvesoftware.com/wiki/GCFScape" target="_blank">https://developer.valvesoftware.com/wiki/GCFScape</a></p>
        <p style="margin-top: 30px">When importing, make sure to select this <span>sound</span> folder only (not a subfolder, or the game's root folder.)</p>
    </div>
</template>

<style scoped>
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

span {
    color: rgb(var(--lighter));
    font-style: italic;
}

.error {
    color: red;
}
</style>
