<template>
    <div>
        <v-card flat tile>
            <v-toolbar flat dense>
                <div class="ml-n5 mt-3">
                    <img src="../assets/DiabetterLogo.png"
                         height="100" width="200"
                         v-on:click="logoClicked" class="pointer">
                </div>

                <v-spacer></v-spacer>

                <!-- <div class="personalInfo" v-if="this.$store.state.user.supervisor"> -->
                <div class="personalInfo">

                    <div class="text-center">
                        <v-menu
                            v-model="showing"
                            offset-y
                            width="300px"
                            :close-on-content-click="false"
                        >
                            <template v-slot:activator="{ on }" @click="showing = true">
                                <v-text-area
                                    id="name"
                                    @click="showing = true"
                                    v-on="on"
                                >
                                    {{ childToSupervise || "Select user" }}
                                </v-text-area>
                            </template>
                            <v-list
                                class="px-4">
                                <v-autocomplete
                                    label="Select user"
                                    :items="this.children"
                                    v-model="childToSupervise"
                                    @change="showing = false;"
                                >

                                </v-autocomplete>
                            </v-list>
                        </v-menu>
                    </div>
                </div>

                <div class="personalInfo">
                    <p id="name">{{ this.profileData.name }}</p>
                    <p id="role">Supervisor</p>
                </div>

                <v-badge bottom overlap offset-x="11" offset-y="15" color="transparent">
                    <span slot="badge">
                        <v-icon size="15" color="blue">mdi-emoticon</v-icon>
                    </span>
                    <span slot="default">
                        <v-avatar size="35">
                            <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
                        </v-avatar>
                    </span>
                </v-badge>

                <v-menu offset-y left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn class="no-background__hover"
                               v-bind="attrs"
                               v-on="on"
                               icon
                               :ripple="false">
                            <v-icon size="20">mdi-chevron-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list class="dropdown-list">
                        <v-list-item>
                            <v-list-item-title class="pointer" v-on:click="profileClicked">
                                Profile
                            </v-list-item-title>
                        </v-list-item>
                        <v-divider class="mx-2"/>
                        <v-list-item>
                            <v-list-item-title class="pointer" @click="logout">
                                Logout
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

                <v-divider inset vertical />

                <v-btn class="no-background__hover" icon :ripple="false">
                    <v-icon size="20" color="dark-gray" v-on:click="historyClicked">mdi-file-table</v-icon>
                </v-btn>

                <v-badge bordered dot offset-x="20" offset-y="20"
                         color="red" :value="notifications">
                    <v-btn class="no-background__hover" icon :ripple="false">
                        <v-icon size="20" color="#FFCD00">mdi-bell</v-icon>
                    </v-btn>
                </v-badge>
            </v-toolbar>
        </v-card>
    </div>
</template>

<script>
import activities from '@/components/configurations/queryProperties.js';
import Supervisor from '../repositories/Supervisor';
import Auth from "../repositories/Auth";
import Data from "../repositories/Data";
import moment from 'moment';
export default {
    name: "Navbar",
    props: {
        msg: String,
    },
    created() {
        this.refreshUser();
        Supervisor.getChildren(
            {
                supervisorEmail: this.$store.state.user.email
            }
        ).then(
            (resp) => {
                let result = resp.data.children;
                for (var i = 0; i < result.length; i++) {
                    this.children.push(result[i].player_email);
                }
            },
            (error) => { console.log(error); }
        );
    },
    data: () => ({
        notifications: true,
        profileData: {
            name: ""
        },
        supervisor: false,
        children: [],
        childToSupervise: null,
    }),
    methods: {
        logoClicked: function () {
            this.$router.push('/');
        },
        profileClicked: function () {
            this.$router.push('/profile');
        },
        historyClicked: function () {
            this.$router.push('/history');
        },
        logout() {
            this.$store.commit("LOGOUT");
            this.$cookies.remove("JWT");
            this.$router.push('/login');
        },
        refreshUser() {
            this.profileData = {
                name: this.$store.state.user.firstName +
                    " " +
                    this.$store.state.user.lastName || "-"
            };
        }
    },
    watch: {
        '$store.state.user': function() {
            this.refreshUser();
            Supervisor.getChildren(
                {
                    supervisorEmail: this.$store.state.user.email
                }
            ).then(
                (resp) => {
                    let result = resp.data.children;
                    for (var i = 0; i < result.length; i++) {
                        this.children.push(result[i].player_email);
                    }
                    console.log(result);
                },
                (error) => { console.log(error); }
            );
        },
        childToSupervise: async function() {
            let token = await Supervisor.getToken({
                childEmail: this.childToSupervise,
                supervisorEmail: this.$store.state.user.email
            }).then(
                (resp) => {
                    this.$store.commit("SUPERVISING",
                        {
                            email: this.childToSupervise,
                            token: resp.data.token.player_token
                        });
                    return resp.data.token.player_token;
                },
                (error) => { console.log(error); }
            );
            const config = {
                startDate: moment().format('DD-MM-YYYY'),
                endDate: moment().format('DD-MM-YYYY'),
                exerciseTypes: activities[3].properties[0].properties
                    .map(d => d.toUpperCase()).join(','),
            };
            console.log(token);
            Data.fetch(config, token).then(
                async (res) => {
                    console.log(res.data);
                    await this.$store.dispatch('setData', res.data);
                },
                (err) => console.log(err)
            );
        }

    }
};
</script>

<style scoped>
.dropdown-list div {
    margin: 0 1.5rem;
}

.personalInfo {
    display: flex;
    flex-direction: column;
    text-align: right;
    padding-right: 10px;
}

.personalInfo p {
    margin-bottom: 0;
}

.personalInfo #name {
    font-size: 13px;
    font-weight: bold;
}

.personalInfo #role {
    font-size: 10px;
}

.pointer {
    cursor: pointer;
}

.no-background__hover::before {
   background-color: transparent !important;
}
</style>
