<script lang="ts">
import type Soundscape from '@/model/Soundscape';
import type SoundscapeAction from '@/model/SoundscapeAction';
import type SoundscapeScript from '@/model/SoundscapeScript';
import { Component, Emit, Prop, Vue, toNative } from 'vue-facing-decorator';
import SoundscapeDetails from './SoundscapeDetails.vue';

@Component({
    components: {
        SoundscapeDetails
    }
})
class SoundscapeScriptDetails extends Vue {
    openSoundscapes: Set<Soundscape> = new Set();
    openActions: Set<SoundscapeAction> = new Set();

    @Prop
    soundscapeScript!: SoundscapeScript;

    @Emit
    playSoundscape(soundscape: Soundscape) {
        return soundscape;
    }

    toggleSoundscapeDetails(soundscape: Soundscape) {
        if (this.openSoundscapes.has(soundscape)) {
            this.openSoundscapes.delete(soundscape);
        } else {
            this.openSoundscapes.add(soundscape);
        }
    }

    toggleActionDetails(action: SoundscapeAction) {
        if (this.openActions.has(action)) {
            this.openActions.delete(action);
        } else {
            this.openActions.add(action);
        }
    }
}

export default toNative(SoundscapeScriptDetails);
</script>

<template>
    <div class="details">
        <h4>{{ soundscapeScript.title }}</h4>
        <ul>
            <li v-for="soundscape in soundscapeScript.soundscapes" :key="soundscape.name">
                <SoundscapeDetails @playSoundscape="playSoundscape" :soundscape="soundscape" />
            </li>
        </ul>
    </div>
</template>

<style>
.details {
    margin-bottom: 50px;
}

.details li {
    margin-left: 15px;
    list-style: none;
}
</style>