<template>
    <v-app id="app">
        <router-view/>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    components: {
    }
};
</script>

<style>
.clearfix {
  height: 40px;
  background-color: #f2f2f2;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
