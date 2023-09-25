<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import { RouterLink, RouterView } from 'vue-router';

@Component
class NavBar extends Vue {

}

export default toNative(NavBar);
</script>

<template>
<nav>
  <h1>Soundscape Player</h1>
  <ul>
    <RouterLink to="/"><li>Home</li></RouterLink>
    <RouterLink to="/about"><li>About</li></RouterLink>
  </ul>
</nav>
</template>

<style scoped>
nav {
  background-color: var(--darkest);
  height: 100vh;
  width: 400px;
  padding-left: 15px;
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
}

li {
  margin-top: 15px;
  color: white;
  transition: .2s all;
}

li:hover {
  color: var(--lightest);
  padding-left: 15px;
}

</style>