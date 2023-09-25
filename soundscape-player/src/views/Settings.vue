<script lang="ts">
import { Component, Emit, Prop, Ref, Vue, toNative } from 'vue-facing-decorator';
import SoundscapeScriptParser from '@/lib/SoundscapeScriptParser';
import SoundscapeScriptDetails from '@/components/SoundscapeScriptDetails.vue';
import type SoundscapeScript from '@/model/SoundscapeScript';

@Component({
  components: {
    SoundscapeScriptDetails
  }
})
class Settings extends Vue {
  file: any;
  content: any;
  successfullyAdded: boolean = false;

  @Prop({ default: [] })
  soundscapeScripts!: SoundscapeScript[]

  @Ref('fileInput')
  fileInput!: HTMLInputElement;

  readFile() {
    if (this.fileInput.files === null) return;

    this.file = this.fileInput.files[0];
    const reader = new FileReader();

    this.content = "check the console for file output";
    reader.onload = (res) => {
      let soundscapeParser = new SoundscapeScriptParser();
      let loadedScript = soundscapeParser.parseSoundscapeScript(res.target!.result!.toString());
      loadedScript.title = this.file.name;
      this.soundscapeScriptLoaded(loadedScript);

      this.successfullyAdded = true;
    };
    reader.onerror = (err) => console.log(err);
    reader.readAsText(this.file);
  }

  @Emit
  soundscapeScriptLoaded(soundscapeScript: SoundscapeScript) {
    return soundscapeScript;
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

    <SoundscapeScriptDetails v-for="script in soundscapeScripts" :soundscapeScript="script" />
  </div>
</template>

<style>
</style>
