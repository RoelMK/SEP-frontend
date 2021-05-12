<template>
    <div id="app">
        <Header class="header" v-if="$route.path==='/login' ? false : true" ></Header>
        <div class="clearfix" v-if="$route.path==='/login' ? false : true"></div>
        <router-view/>
        <Footer/>
    </div>
</template>

<script>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Footer,
    Header
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
