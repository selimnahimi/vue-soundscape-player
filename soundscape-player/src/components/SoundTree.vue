<script lang="ts">
import { useStore } from '@/store';
import { Component, Vue, toNative } from 'vue-facing-decorator';
import SoundTreeItem from './SoundTreeItem.vue';
import SoundPlayer from '@/lib/SoundPlayer';

@Component({
    components: {
        SoundTreeItem
    }
})
class SoundTree extends Vue {
    store: any = useStore();

    content: any = {};

    mounted() {
        this.generateFolderStructure();
    }

    generateFolderStructure() {
        this.content = {};
        let soundPaths = Object.keys(this.soundFiles);

        soundPaths.forEach(path => {
            let file = this.soundFiles[path];
            let splitPath = path.split('/');

            this.processSplitPath(splitPath, file);
        });

        console.log(this.content);
    }

    private processSplitPath(splitPath: string[], file: File) {
        let currentFolder = this.content;

        splitPath.forEach((_, index) => {
            let isFile = index === splitPath.length - 1;
            let isFolder = !isFile;

            if (isFolder) {
                let folder = splitPath[index];
                if (!(folder in currentFolder)) {
                    currentFolder[folder] = {};
                }

                currentFolder = currentFolder[folder];
            }

            if (isFile) {
                if (!('%files%' in currentFolder)) {
                    currentFolder['%files%'] = [];
                }

                currentFolder['%files%'].push(file);
            }
        });
    }

    get soundFiles(): { [key: string]: File } {
        return this.store.getters.soundFiles;
    }
}

export default toNative(SoundTree);
</script>

<template>
    <SoundTreeItem :folderName="'root'" :folderContents="content" />
</template>