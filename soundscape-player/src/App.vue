<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { Component, toNative, Vue } from 'vue-facing-decorator';
import NavBar from '@/components/NavBar.vue';

@Component({
  components: {
    NavBar
  }
})
class App extends Vue {
  
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
</template>

<style>
.wrapper {
  display: flex;
}

main {
  flex: 1;
}

main .content {
  height: 100%;
  display: flex;
}

main .content .title {
  padding-top: 15px;
  margin: 0 auto
}

</style>
