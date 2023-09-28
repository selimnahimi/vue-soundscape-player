<script lang="ts">
import type SoundscapeAction from '@/model/SoundscapeAction';
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';

@Component
class SoundscapeActionDetails extends Vue {
    @Prop({ required: true })
    action!: SoundscapeAction;

    open: boolean = false;

    toggle() {
        this.open = !this.open;
    }
}

export default toNative(SoundscapeActionDetails);
</script>

<template>
    <div>
        <ul>
            <li>
                <p>
                    <button @click="toggle()">{{ open ? "-" : "+" }}</button>
                    <span>{{ action.type }}</span>
                </p>
                <div v-if="open" class="actionDetails">
                    <div v-if="action.type === 'playrandom'">
                        <ul>
                            <li v-for="sound in action.rndwave">
                                {{ sound }}
                            </li>
                        </ul>
                    </div>
                    <div v-if="action.type === 'playsoundscape'">
                        {{ action.soundscapeToPlay }}
                    </div>
                    <div v-if="action.type === 'playlooping'">
                        {{ action.rndwave[0] }}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.actionDetails {
    padding: 15px;
    background-color: rgba(var(--darkest), 0.8);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    width: fit-content;
    font-size: 0.5em;

    margin: 15px;

    border-left: solid 3px rgb(var(--lightest));
}

.actionDetails li {
    list-style: "- ";
}
</style>