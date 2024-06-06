<template>
  <header>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </header>
  <div id="app">
      <RouterView />
  </div>
  <footer>
  </footer>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'

</script>

<style>
html, body {
    max-width: 100vw;
    overflow-x: hidden;
}
</style>