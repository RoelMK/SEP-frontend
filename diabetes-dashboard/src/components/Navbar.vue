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

                <div class="personalInfo">
                    <div class="text-center">
                        <v-menu
                            v-model="showing"
                            offset-y
                            width="300px"
                            :close-on-content-click="false"
                        >
                            <template v-slot:activator="{ on }" @click="showing = true">
                                <p
                                    id="name"
                                    @click="showing = true"
                                    v-on="on"
                                >
                                    {{ childToSupervise || "Select user" }}
                                </p>
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
                    <p id="role">{{ this.supervisor ? 'Supervisor' : "User" }}</p>
                </div>

                <v-badge bottom overlap offset-x="11" offset-y="15" color="transparent">
                    <span slot="badge">
                        <v-icon size="15" color="blue">{{ valenceIcon }}</v-icon>
                    </span>
                    <span slot="default">
                        <v-avatar size="35" color="primary">
                            <v-img :src="this.profileData.image"></v-img>
                        </v-avatar>
                    </span>
                </v-badge>
                <v-badge bottom overlap offset-x="-5" offset-y="-3" color="transparent">
                    <span slot="badge">
                        <v-icon size="15" color="blue">{{ arousalIcon }}</v-icon>
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
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon size="20" color="dark-gray" v-on:click="historyClicked">mdi-file-table</v-icon>
                            </span>
                        </template>
                        <span>History page</span>
                    </v-tooltip>
                </v-btn>
            </v-toolbar>
        </v-card>
    </div>
</template>

<script>
import Supervisor from '../repositories/Supervisor';
import Auth from "../repositories/Auth";
import Data from "../repositories/Data";
import moment from 'moment';
import { mapState } from 'vuex';

export default {
    name: "Navbar",
    props: {
        msg: String,
    },
    computed: {
        ...mapState(['arousalIcon', 'valenceIcon', 'data'])
    },
    async created() {
        if (this.$store.state.user.email) {
            await this.refreshUser();
            await this.fetchUserRole();
        }
    },
    data: () => ({
        notifications: true,
        profileData: {
            name: "",
            image: ""
        },
        supervisor: false,
        children: [],
        childToSupervise: null,
        showing: false
    }),
    methods: {
        checkData() {
            for (let d in this.data) {
                if (this.data[d].length > 0)
                    return true;
            }
            return false;
        },
        logoClicked: function () {
            this.$router.push('/').catch(() => {});
        },
        profileClicked: function () {
            this.$router.push('/profile').catch(() => {});
        },
        historyClicked: function () {
            if (this.checkData())
                this.$router.push('/history').catch(() => {});
        },
        logout() {
            this.$store.commit("LOGOUT");
            this.$cookies.remove("JWT");
            this.$router.push('/login').catch(() => {});
            localStorage.clear();
        },
        refreshUser() {
            this.profileData = {
                name: this.$store.state.user.firstName +
                    " " +
                    this.$store.state.user.lastName || "-"
            };
            this.profileData.image = this.$store.state.user.image;
        },
        async fetchUserRole() {
            this.supervisor = await Supervisor.getRole({
                email: this.$store.state.user.email
            }).then(
                (resp) => {
                    return resp.data.supervisor;
                },
                (error) => { console.log(error); }
            );
        }
    },
    watch: {
        '$store.state.user.email': async function() {
            await this.refreshUser();
            await this.fetchUserRole();
            console.log(this.supervisor);
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
                endDate: moment().format('DD-MM-YYYY')
            };
            Data.fetch(config, token).then(
                async (res) => {
                    await this.$store.dispatch('setData', res.data);
                },
                (err) => console.log(err)
            );
        },
        supervisor: function() {
            if (this.supervisor) {
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
            }
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
