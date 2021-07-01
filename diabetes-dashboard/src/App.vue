<template>
    <v-app id="app">
        <Navbar v-if="$route.meta.showNavbar" />
        <router-view/>
        <Toast/>
        <QueryMenu/>
    </v-app>
</template>

<script>
import Toast from '@/components/Toast.vue';
import QueryMenu from '@/components/QueryMenu.vue';
import Navbar from '@/components/Navbar';

// Entry point of the application which renders all the necessary components
// Router-view renders view based on the current path
export default {
    name: 'App',
    components: {
        Toast,
        QueryMenu,
        Navbar
    },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
