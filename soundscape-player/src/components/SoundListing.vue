<script lang="ts">
import { useStore, type State, Store } from '@/store';
import { Component, Emit, Vue, toNative } from 'vue-facing-decorator';

@Component
class SoundListing extends Vue {
    store: any = useStore();
    
    get soundFiles(): File[] {
        return this.store.getters.soundFiles;
    }

    @Emit
    playSound(file: File) {
        return file;
    }
}

export default toNative(SoundListing);
</script>

<template>
    <ul>
        <li v-for="soundFile in soundFiles" @click="playSound(soundFile)">{{ soundFile.webkitRelativePath }}</li>
    </ul>
</template>

<style scoped>
li {
    user-select: none;
}

li:hover {
    cursor: pointer;
    color: rgb(var(--lightest));
}
</style>