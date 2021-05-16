<template>
    <div id="app" data-app>
        <Header class="header" v-show="$route.path==='/login' ? false : true" ></Header>
        <div class="clearfix" v-show="$route.path==='/login' ? false : true"></div>
        <router-view/>
    </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
.clearfix {
  height: 3vh;
  background-color: #f2f2f2;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
