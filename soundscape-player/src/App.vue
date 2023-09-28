<script lang="ts">
import { RouterView } from 'vue-router';
import { Component, toNative, Vue } from 'vue-facing-decorator';
import NavBar from '@/components/NavBar.vue';
import { useStore } from './store';
import type Soundscape from './model/Soundscape';
import SoundscapeDirector from './components/SoundscapeDirector.vue';

@Component({
    components: {
        NavBar,
        SoundscapeDirector
    }
})
class App extends Vue {
    store: any = useStore();
}

export default toNative(App);

</script>

<template>
    <div class="wrapper">
        <header>
            <NavBar />
        </header>

        <main>
            <RouterView />
        </main>
    </div>

    <SoundscapeDirector />
</template>

<style>
.wrapper {
    display: flex;
}

main {
    flex: 1;
    min-height: 100vh;
}

header {
    width: 400px;
}

main .content {
    height: 100%;
    padding-left: 50px;
}

main .content .title {
    padding-top: 15px;
    margin: 0 auto;
    text-align: center;
}
</style>
