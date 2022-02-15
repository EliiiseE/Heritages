<script>
  // import data from "../utils/data.json"
  import Vue from '../components/Vue.svelte';
  import HomePage from '../components/Homepage/HomePage.svelte';
</script>

<main>
  <HomePage />
  <Vue />
</main>

<style lang="scss">
  @import '../var';

  p {
    font-family: $interaction-font;
    color: $primary-color;
  }

  main {
    height: 100%;
  }
</style>
