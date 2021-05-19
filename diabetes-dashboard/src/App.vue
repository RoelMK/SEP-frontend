<template>
    <div id="app" data-app>
        <router-view/>
        <Footer/>
    </div>
</template>

<script>
import Footer from './components/Footer.vue';

export default {
    name: 'App',
    components: {
        Footer
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
