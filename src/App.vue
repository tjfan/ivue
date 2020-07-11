<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>
import Layout from '@/layout';
export default {
  name: 'App',
  data() {
    return {}
  },
  components: {
    Layout
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
