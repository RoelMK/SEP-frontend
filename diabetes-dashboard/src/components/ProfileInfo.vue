<template>
    <v-card>
        <v-row>
            <v-col cols="12" class="cRow rightAligned editBtn pointer pr-8">
                <p @click="editInfo">{{tIsEdit}}</p>
                <p @click="onCancel" id="cancel" class="pr-3" v-if="editing">Cancel</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="centerAligned">
                <v-avatar size="120" color="primary">
                    <v-img  :src="this.profileData.image"></v-img>
                </v-avatar>
            </v-col>
        </v-row>
        <!-- Not editing -->
        <v-row v-if="!editing">
            <v-col cols="12">
                <div class="customCol centerAligned">
                    <p class="mb-0" id="name">{{ this.profileData.name }}</p>
                    <p class="mb-0" id="role">{{ this.supervisor ? "Supervisor" : "User" }}</p>
                </div>
            </v-col>
        </v-row>
        <br v-if="!editing"/>
        <v-row class="centerAligned" v-if="!editing">
            <v-col cols="12" md="6">
                <div class="customCol">
                    <p class="mb-0" id="personalProperty">Age</p>
                    <p class="mb-0" id="personalValue">{{ this.profileData.age }}</p>
                </div>
            </v-col>
            <v-col cols="12" md="6">
                <div class="customCol">
                    <p class="mb-0" id="personalProperty">Language</p>
                    <p class="mb-0">
                        <country-flag country='gb'/>
                    </p>
                </div>
            </v-col>
        </v-row>
        <v-row class="centerAligned" v-if="!editing">
            <v-col cols="12" md="6">
                <div class="customCol">
                    <p class="mb-0" id="personalProperty">Height</p>
                    <p class="mb-0" id="personalValue">{{ this.profileData.length || "-" }}</p>
                </div>
            </v-col>
            <v-col cols="12" md="6">
                <div class="customCol">
                    <p class="mb-0" id="personalProperty">Weight</p>
                    <p class="mb-0" id="personalValue">{{ this.profileData.weight || "-" }}</p>
                </div>
            </v-col>
        </v-row>
        <v-row class="centerAligned" v-if="!editing">
            <v-col cols="12">
                <div class="customCol">
                    <p class="mb-0" id="personalProperty">Email</p>
                    <p class="mb-0" id="personalValue">{{ this.profileData.email || "-" }}</p>
                </div>
            </v-col>
        </v-row>
        <!-- Editing -->
        <v-row v-if="editing">
            <v-col cols="12">
                <div class="customCol centerAligned">
                    <p class="centered-input mb-0 mx-10" id="name">{{  profileData.name }}</p>
                    <p class="mb-0" id="role">{{ this.supervisor ? "Supervisor" : "User" }}</p>
                </div>
            </v-col>
        </v-row>
        <br v-if="!editing"/>
        <v-row class="centerAligned" v-if="editing">
            <v-col cols="12" md="6">
                <div class="customCol">
                    <p class="mb-0" id="personalProperty">Age</p>
                    <v-text-field class="centered-input my-0 mx-10" id="personalValue" v-model="editedData.age" />
                </div>
            </v-col>
            <v-col cols="12" md="6">
                <div class="customCol">
                    <p class="mb-0" id="personalProperty">Language</p>
                    <p class="mb-0">
                        <country-flag country='gb'/>
                    </p>
                </div>
            </v-col>
        </v-row>
        <v-row class="centerAligned" v-if="editing">
            <v-col cols="12" md="6">
                <div class="customCol">
                    <p class="mb-0" id="personalProperty">Height</p>
                    <v-text-field class="centered-input my-0 mx-10" id="personalValue" v-model="editedData.length" />
                </div>
            </v-col>
            <v-col cols="12" md="6">
                <div class="customCol">
                    <p class="mb-0" id="personalProperty">Weight</p>
                    <v-text-field class="centered-input my-0 mx-10" id="personalValue" v-model="editedData.weight" />
                </div>
            </v-col>
        </v-row>
        <v-row class="centerAligned" v-if="editing">
            <v-col cols="12">
                <div class="customCol">
                    <p class="mb-0" id="personalProperty">Email</p>
                    <p class="mb-0" id="personalValue">{{ this.profileData.email || "-" }}</p>
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import Auth from "@/repositories/Auth";
import Supervisor from "@/repositories/Supervisor";
import CountryFlag from 'vue-country-flag';

export default {
    name: "ProfileInfo",
    components: {
        CountryFlag
    },
    created() {
        if (this.$store.state.user.email) {
            this.refreshUser();
        }
    },
    methods: {
        /**
         * Edit information inside setting cards
         * @return { void }
         */
        editInfo() {
            this.editing = !this.editing;
            if (this.editing) {
                this.tIsEdit = "Done";
            }
            else {
                this.tIsEdit = "Edit";
                Auth.updateUser(this.editedData, this.$cookies.get("JWT")).then(
                    (resp) => { console.log(resp); },
                    (err) => { console.log(err); }
                );
            }
        },
        /**
         * Reset settings upon 'cancel' button click
         * @return { void }
         */
        onCancel() {
            this.editing = false;
            this.tIsEdit = "Edit";
        },
        /**
         * Refresh user after settings were set
         * @return { void }
         */
        refreshUser() {
            this.profileData = {
                name: this.$store.state.user.firstName +
                    " " +
                    this.$store.state.user.lastName || "-",
                age: this.$store.state.user.age || "-",
                weight: this.$store.state.user.weight || "-",
                length: this.$store.state.user.length || "-",
                email: this.$store.state.user.email || "-",
                image: this.$store.state.user.image || "",
            };
            this.editedData = this.profileData;
        }
    },
    data() {
        return {
            editing: false,
            tIsEdit: "Edit",
            options: {
                process: pos => [
                    [pos[0], pos[1]],
                ],
            },
            profileData: {
                name: "Loading",
                age: 0,
                weight: 0,
                length: 0,
                email: "loading@loading.com",
            },
            supervisor: false,
        };
    },
    watch: {
        // watch for changes to the user state and refresh
        // settings upon state change
        '$store.state.user': async function() {
            await this.refreshUser();
            this.supervisor = await Supervisor.getRole({
                email: this.$store.state.user.email
            }).then(
                (resp) => {
                    return resp.data.supervisor;
                },
                (error) => { console.log(error); }
            );
        },
    }
};
</script>

<style>
.centered-input input {
  text-align: center
}

.rightAligned {
  text-align: right;
}

.centerAligned {
  text-align: center;
}

.editBtn {
    font-size: 13px;
    font-weight: bold;
    height: 40px;
}

.editBtn #cancel {
    color: red;
}

.cRow {
    display: flex;
    flex-direction: row;
    direction: rtl;
}

.customCol {
    display: flex;
    flex-direction: column;
}

.customCol #name {
    font-size: 17px;
    font-weight: bold;
}

.customCol #role {
    font-size: 13px;
}

.customCol #personalProperty {
    font-size: 15px;
    padding-bottom: 10px;
}

.customCol #personalValue {
    color: #1B98E0;
}

.pointer {
    cursor: pointer;
}
</style>