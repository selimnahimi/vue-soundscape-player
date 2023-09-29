<script lang="ts">
import SoundscapeScriptDetails from '@/components/SoundscapeScriptDetails.vue';
import type Soundscape from '@/model/Soundscape';
import { useStore } from '@/store';
import { Component, Vue, toNative } from 'vue-facing-decorator';

@Component
class AboutView extends Vue {

}

export default toNative(AboutView);
</script>

<template>
    <div class="content">
        <h1 class="title">About</h1>
        <div class="about-box">
            <p>Written by Selim Nahimi</p>
            <p><a href="https://github.com/selimnahimi/vue-soundscape-player" target="_blank">Project GitHub</a></p>
        </div>
    </div>
</template>

<style>
.about-box {
    height: 80%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>