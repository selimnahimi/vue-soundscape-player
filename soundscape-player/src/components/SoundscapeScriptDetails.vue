<script lang="ts">
import type Soundscape from '@/model/Soundscape';
import type SoundscapeScript from '@/model/SoundscapeScript';
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';

@Component
class SoundscapeDetails extends Vue {
    @Prop
    soundscapeScript!: SoundscapeScript;
}

export default toNative(SoundscapeDetails);
</script>

<template>
    <div class="details">
        <h4>{{ soundscapeScript.title }}</h4>
        <ul>
            <li v-for="soundscape in soundscapeScript.soundscapes">{{ soundscape.name }} ({{ soundscape.actions.length }}
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
</style>