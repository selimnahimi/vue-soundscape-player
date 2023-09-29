<script lang="ts">
import SoundPlayer from '@/lib/SoundPlayer';
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';

@Component
class SoundTreeItem extends Vue {
    @Prop({ required: true, default: {} })
    folderContents!: { [key: string]: any };

    @Prop({ default: '' })
    folderName!: string;

    open: boolean = false;

    get subFolders(): {name: string, contents: any}[] {
        if (this.isFolderInvalid()) {
            return [];
        }

        let subFolders: {name: string, contents: any}[] = [];
        
        for (const folderName in this.folderContents) {
            if (folderName === '%files%') {
                continue;
            }

            let subFolderContents = this.folderContents[folderName];
            subFolders.push({name: folderName, contents: subFolderContents});
        }

        return subFolders;
    }

    get files(): File[] {
        if (this.isFolderInvalid()) {
            return [];
        }

        if ('%files%' in this.folderContents) {
            return this.folderContents['%files%'];
        }

        return [];
    }

    isFolderInvalid() {
        return !this.folderContents;
    }

    toggleOpen() {
        this.open = !this.open;
    }

    playSound(soundFile: File) {
        SoundPlayer.playSoundFile(soundFile);
    }
}

export default toNative(SoundTreeItem);
</script>

<template>
    <div>
        <p @click="toggleOpen()"><button>{{ open ? '-' : '+' }}</button> {{ folderName }}/</p>
        <ul v-if="open">
            <li v-for="folder in subFolders" class="folder"><SoundTreeItem :folderName="folder.name" :folderContents="folder.contents" /></li>
            <li v-for="file in files" class="file" @click="playSound(file)">{{ file.name }}</li>
        </ul>
    </div>
</template>

<style scoped>
p {
    cursor: pointer;
}

div {
    margin-left: 20px;
    user-select: none;
}

button {
    width: 25px;
    background-color: transparent;
    border: none;
    font-size: 32px;
    color: rgb(var(--lightest));
    cursor: pointer;
}

p:hover {
    color: rgb(var(--darkest));
}

.folder {
    color: rgb(var(--lightest))
}

.file {
    color: white;
    margin-left: 50px;
    cursor: pointer;
}

.file:hover {
    color: rgb(var(--lightest));
}

.file:hover::before {
    content: '▶ ';
    color: green;
}

ul li {
    list-style: none;
}
</style>