<script lang="ts">
import type Soundscape from '@/model/Soundscape';
import type SoundscapeScript from '@/model/SoundscapeScript';
import { Component, Emit, Prop, Vue, toNative } from 'vue-facing-decorator';

@Component
class SoundscapeDetails extends Vue {
    @Prop
    soundscapeScript!: SoundscapeScript;

    @Emit
    playSoundscape(soundscape: Soundscape) {
        return soundscape;
    }
}

export default toNative(SoundscapeDetails);
</script>

<template>
    <div class="details">
        <h4>{{ soundscapeScript.title }}</h4>
        <ul>
            <li @click="playSoundscape(soundscape)" v-for="soundscape in soundscapeScript.soundscapes" :key="soundscape.name">{{ soundscape.name }} ({{ soundscape.actions.length }}
                actions)</li>
        </ul>
    </div>
</template>

<style scoped>
.details {
    border: 1px solid black;
}

.details li {
    margin-left: 100px;
    list-style: "+ ";
}

.details li:hover {
    cursor: pointer;
    color: blue;
}
</style>