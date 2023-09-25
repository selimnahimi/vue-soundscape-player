<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { Component, toNative, Vue } from 'vue-facing-decorator';
import NavBar from '@/components/NavBar.vue';
import type SoundscapeScript from './model/SoundscapeScript';

@Component({
  components: {
    NavBar
  }
})
class App extends Vue {
  loadedSoundscapeScripts: SoundscapeScript[] = [];

  addSoundscapeScript(soundscapeScript: SoundscapeScript) {
    this.loadedSoundscapeScripts.push(soundscapeScript);
  }
}

export default toNative(App);

</script>

<template>
  <div class="wrapper">
    <header>
      <NavBar />
    </header>

    <main>
      <RouterView
      :soundscapeScripts="loadedSoundscapeScripts"
      @soundscapeScriptLoaded="addSoundscapeScript" />
    </main>
  </div>
</template>

<style>
.wrapper {
  display: flex;
}

main {
  flex: 1;
}

main .content {
  height: 100%;
  padding-left: 50px;
}

main .content .title {
  padding-top: 15px;
  margin: 0 auto;
  text-align: center;
}

</style>
