<template>
    <v-card>
        <v-row>
            <!-- <v-col cols="9" class="rightAligned editBtn pointer pr-8">
                <p @click="editInfo">{{tIsEdit}}</p>
            </v-col> -->
            <v-col cols="12" class="cRow rightAligned editBtn pointer pr-8">
                <p @click="editInfo">{{tIsEdit}}</p>
                <p @click="onCancel" id="cancel" class="pr-3" v-if="editing">Cancel</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="centerAligned">
                <v-avatar size="120">
                    <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
                </v-avatar>
            </v-col>
        </v-row>

        <!-- Not editing -->
        <v-row v-if="!editing">
            <v-col cols="12">
                <div class="customCol centerAligned">
                    <p class="mb-0" id="name">{{ this.profileData.name }}</p>
                    <p class="mb-0" id="role">User</p>
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
                    <v-text-field class="centered-input mb-0 mx-10" id="name" v-model="editedData.name" />
                    <p class="mb-0" id="role">User</p>
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
import Auth from "../../repositories/Auth";
import CountryFlag from 'vue-country-flag';

export default {
    name: "ProfileInfo",
    components: {
        CountryFlag
    },
    methods: {
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
        onCancel() {
            this.editing = false;
            this.tIsEdit = "Edit";
            // No changes are made
        },
        refreshUser() {
            this.profileData = {
                name: this.$store.state.user.firstName +
                    " " +
                    this.$store.state.user.lastName || "-",
                age: this.$store.state.user.age || "-",
                weight: this.$store.state.user.weight || "-",
                length: this.$store.state.user.length || "-",
                email: this.$store.state.user.email || "-",
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
            range: [2.0, 20.0],
            healthSettings: {
                unit: "mmol/L",
                veryHighThreshold: 13.9,
                highRange: [10.0, 13.0],
                normalRange: [3.9, 10.0],
                lowRange: [3.0, 3.8],
                veryLowThreshold: 3.0,
                fastingRange: [4.4, 7.2],
                ppRangeThreshold: 10.0,
                goalA1C: 7,
            },
            foodSettings: {
                goalConsumedCalories: 1800,
                goalBurntCalories: 300,
            },
            emotionSettings: {
                ask: true,
            },
        };
    },
    watch: {
        '$store.state.user': function() {
            this.refreshUser();
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