<script lang="ts">
import SoundscapeScriptDetails from '@/components/SoundscapeScriptDetails.vue';
import type Soundscape from '@/model/Soundscape';
import { useStore } from '@/store';
import { Component, Vue, toNative } from 'vue-facing-decorator';

@Component({
    components: {
        SoundscapeScriptDetails
    }
})
class HomeView extends Vue {
    store: any = useStore();

    get soundscapeScripts() {
        return this.store.getters.soundscapeScripts;
    }

    playSoundscape(soundscape: Soundscape) {
        this.store.dispatch('clearPlayingSoundscapes');
        this.store.dispatch('playSoundscape', { soundscape });
    }
}

export default toNative(HomeView);
</script>

<template>
    <div class="content">
        <h1 class="title">Home</h1>

        <SoundscapeScriptDetails v-for="script in soundscapeScripts" :soundscapeScript="script" @playSoundscape="playSoundscape" />
    </div>
</template>

<style></style>