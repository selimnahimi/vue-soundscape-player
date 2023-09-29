<script lang="ts">
import SoundListing from '@/components/SoundListing.vue';
import SoundPlayer from '@/lib/SoundPlayer';
import { useStore } from '@/store';
import { Component, Vue, toNative } from 'vue-facing-decorator';

@Component({
    components: {
        SoundListing
    }
})
class HomeView extends Vue {
    store: any = useStore();

    playSound(file: File) {
        SoundPlayer.playSoundFile(file);
    }
}

export default toNative(HomeView);
</script>

<template>
    <div class="content">
        <h1 class="title">List of sounds</h1>

        <SoundListing @playSound="playSound" />
    </div>
</template>

<style></style>