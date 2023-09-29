<script lang="ts">
import { useStore } from '@/store';
import { Component, Vue, toNative } from 'vue-facing-decorator';
import { RouterLink, RouterView } from 'vue-router';

@Component
class NavBar extends Vue {
    store: any = useStore();

    get playingSoundscape() {
        let soundscapes = this.store.state.currentlyPlayingSoundscapes;
        if (soundscapes.length === 0) {
            return null;
        }

        return this.store.state.currentlyPlayingSoundscapes[0];
    }
}

export default toNative(NavBar);
</script>

<template>
    <nav>
        <div class="content">
            <h1>Soundscape Player</h1>
            <ul>
                <RouterLink to="/">
                    <li>Soundscapes</li>
                </RouterLink>
                <RouterLink to="/sounds">
                    <li>Sounds</li>
                </RouterLink>
                <RouterLink to="/import">
                    <li>Import</li>
                </RouterLink>
                <RouterLink to="/about">
                    <li>About</li>
                </RouterLink>
            </ul>
            <p class="currently-playing" v-if="playingSoundscape">Currently playing: {{ playingSoundscape.name }}</p>
        </div>
    </nav>
</template>

<style scoped>
nav {
    background-color: rgb(var(--darkest));
    height: 100%;
    width: 100%;
    padding-left: 15px;
    display: flex;
    flex-direction: column;
}

nav .content {
    position: fixed;
}

h1 {
    padding-top: 15px;
    font-size: 32px;
}

a {
    text-decoration: none;
}

ul {
    list-style: none;
    margin-left: 15px;
    font-size: 26px;
    flex: 1;
}

li {
    margin-top: 15px;
    color: white;
    transition: .2s all;
}

li:hover {
    color: rgb(var(--lightest));
    padding-left: 15px;
}

.currently-playing {
    position: fixed;
    bottom: 15px;
}

</style>