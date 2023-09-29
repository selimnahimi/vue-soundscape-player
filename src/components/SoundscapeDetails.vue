<script lang="ts">
import type Soundscape from '@/model/Soundscape';
import { Component, Emit, Prop, Vue, toNative } from 'vue-facing-decorator';
import SoundscapeActionDetails from './SoundscapeActionDetails.vue';

@Component({
    components: {
        SoundscapeActionDetails
    }
})
class SoundscapeDetails extends Vue {
    @Prop({ required: true })
    soundscape!: Soundscape;

    open: boolean = false;

    toggle() {
        this.open = !this.open;
    }

    @Emit
    playSoundscape(soundscape: Soundscape) {
        return soundscape;
    }
}

export default toNative(SoundscapeDetails);
</script>

<template>
    <div>
        <p class="clickable">
            <button @click="toggle()">{{ open ? "-" : "+" }}</button>
            <span @click="playSoundscape(soundscape)">{{ soundscape.name }}</span>
        </p>
        <div v-if="open">
            <ul>
                <li v-for="action in soundscape.actions">
                    <SoundscapeActionDetails :action="action" />
                </li>
            </ul>
        </div>
    </div>
</template>

<style>
.details .clickable:hover {
    cursor: pointer;
    color: rgb(var(--lightest));
}

.details button {
    width: 25px;
    background-color: transparent;
    border: none;
    font-size: 32px;
    color: rgb(var(--lightest));
}

.details button:hover {
    cursor: pointer;
}

.details span {
    margin-left: 10px;
} 
</style>