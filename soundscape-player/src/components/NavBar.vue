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
        <h1>Soundscape Player</h1>
        <ul>
            <RouterLink to="/">
                <li>Home</li>
            </RouterLink>
            <RouterLink to="/settings">
                <li>Settings</li>
            </RouterLink>
        </ul>
        <p class="currently-playing" v-if="playingSoundscape">Currently playing: {{ playingSoundscape.name }}</p>
    </nav>
</template>

<style scoped>
nav {
    background-color: rgb(var(--darkest));
    height: 100vh;
    width: 400px;
    padding-left: 15px;
    display: flex;
    flex-direction: column;
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
    margin-bottom: 15px;
}

</style>