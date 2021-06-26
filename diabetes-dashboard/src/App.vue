<template>
    <v-app id="app">
        <router-view/>
        <Toast/>
        <QueryMenu/>
    </v-app>
</template>

<script>
import Toast from '@/components/Toast.vue';
import QueryMenu from '@/components/QueryMenu.vue';

export default {
    name: 'App',
    components: {
        Toast,
        QueryMenu
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
