<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import SoundscapeScript from '@/model/SoundscapeScript';
import type Soundscape from '@/model/Soundscape';

@Component
class SoundscapeListing extends Vue {
    @Prop
    soundscapeScripts!: SoundscapeScript[];

    listAllSoundscapes(): Soundscape[] {
        const result: Soundscape[] = [];

        this.soundscapeScripts.forEach(script => {
            result.concat(script.soundscapes);
        });

        return result;
    }
}

export default toNative(SoundscapeListing);
</script>

<template>
    <p v-for="soundscape in listAllSoundscapes()">{{ soundscape.name }}</p>
</template>