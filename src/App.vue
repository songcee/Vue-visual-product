<template>
  <div id="app">
    <Main></Main>
  </div>
</template>

<script>
import Main from './components/main.vue'

export default {
  name: 'app',
  components: {
    Main
  }
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
}
input, button, select {
  outline: none;
}
#app {
  font-family: 'Microsoft YaHei', 'simsun', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
