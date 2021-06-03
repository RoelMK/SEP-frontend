<template>
    <div>
        <v-card flat tile>
            <v-toolbar flat dense>
                <v-app-bar-nav-icon
                    @click="drawer = !drawer"
                ></v-app-bar-nav-icon>

                <v-toolbar-title>Diabetter</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>

                <v-app-bar-nav-icon @click.stop="showQueryMenu = !showQueryMenu">
                </v-app-bar-nav-icon>
            </v-toolbar>
        </v-card>

        <v-navigation-drawer v-model="drawer" app temporary absolute>
            <v-list nav dense>
                <v-list-item-group v-model="group">
                    <router-link :to="{ name: 'dashboard' }">
                        <v-list-item>
                            <v-list-item-title> Dashboard </v-list-item-title>
                        </v-list-item>
                    </router-link>

                    <router-link :to="{ name: 'profile' }">
                        <v-list-item>
                            <v-list-item-title> Profile </v-list-item-title>
                        </v-list-item>
                    </router-link>

                    <router-link :to="{ name: 'emotions' }">
                        <v-list-item>
                            <v-list-item-title> Emotions </v-list-item-title>
                        </v-list-item>
                    </router-link>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <QueryMenu :show="showQueryMenu" />
    </div>
</template>

<script>
import QueryMenu from "@/components/QueryMenu.vue";
export default {
    name: "Navbar",
    props: {
        msg: String,
    },
    components: {
        QueryMenu,
    },
    data: () => ({
        drawer: false,
        group: null,
        showQueryMenu: false,
    }),
    watch: {
        group() {
            this.drawer = false;
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>