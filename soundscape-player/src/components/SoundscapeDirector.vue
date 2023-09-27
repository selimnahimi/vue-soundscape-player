<script lang="ts">
import SoundscapePlayer from "@/components/SoundscapePlayer.vue";
import type Soundscape from "@/model/Soundscape";
import { useStore } from "@/store";
import { Component, Vue, toNative } from "vue-facing-decorator";

@Component({
    components: {
        SoundscapePlayer
    }
})
class SoundscapeDirector extends Vue {
    store: any = useStore();

    get currentlyPlayingSoundscapes() {
        return this.store.getters.currentlyPlayingSoundscapes;
    }

    get soundscapeScripts() {
        return this.store.getters.soundscapeScripts;
    }

    playSoundscape(soundscape: Soundscape) {
        this.store.dispatch('playSoundscape', { soundscape });
    }

    unmounted() {
        this.store.dispatch('clearPlayingSoundscapes');
    }
}

export default toNative(SoundscapeDirector);
</script>

<template>
    <SoundscapePlayer v-for="soundscape in currentlyPlayingSoundscapes" :soundscape="soundscape" @playOtherSoundscape="playSoundscape" />
</template>