<script lang="ts">
import { useStore } from '@/store';
import { Component, Emit, Vue, toNative } from 'vue-facing-decorator';
import SoundTree from './SoundTree.vue';

@Component({
    components: {
        SoundTree
    }
})
class SoundListing extends Vue {
    store: any = useStore();

    viewMode: 'tree' | 'list' = 'tree';
    
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
    <p>
        View mode:
        <select v-model="viewMode">
            <option value="tree">Tree</option>
            <option value="list">List</option>
        </select>
    </p>
    <ul v-if="viewMode === 'list'">
        <li v-for="soundFile in soundFiles" @click="playSound(soundFile)">{{ soundFile.webkitRelativePath }}</li>
    </ul>
    <SoundTree v-if="viewMode === 'tree'" />
</template>

<style scoped>
li {
    user-select: none;
    margin-left: 50px;
    list-style: square;
}

li:hover {
    cursor: pointer;
    color: rgb(var(--lightest));
}
</style>