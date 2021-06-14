<template>
    <v-card>
        <v-row>
            <v-col cols="12" class="rightAligned editBtn pointer pr-10">Edit</v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="centerAligned">
                <v-avatar size="120">
                    <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
                </v-avatar>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <div class="customCol centerAligned">
                    <p class="mb-0" id="name">Cody Simpson</p>
                    <p class="mb-0" id="role">User</p>
                </div>
            </v-col>
        </v-row>
        <br/>
        <v-row class="centerAligned">
            <v-col cols="12" md="6">
                <div class="customCol">
                    <p class="mb-0" id="personalProperty">Age</p>
                    <p class="mb-0" id="personalValue">20</p>
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
        <v-row class="centerAligned">
            <v-col cols="12" md="6">
                <div class="customCol">
                    <p class="mb-0" id="personalProperty">Height</p>
                    <p class="mb-0" id="personalValue">180</p>
                </div>
            </v-col>
            <v-col cols="12" md="6">
                <div class="customCol">
                    <p class="mb-0" id="personalProperty">Weight</p>
                    <p class="mb-0" id="personalValue">80</p>
                </div>
            </v-col>
        </v-row>
        <v-row class="centerAligned">
            <v-col cols="12">
                <div class="customCol">
                    <p class="mb-0" id="personalProperty">Email</p>
                    <p class="mb-0" id="personalValue">c.simp@email.com</p>
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import CountryFlag from 'vue-country-flag';

export default {
    name: "ProfileInfo",
    components: {
        CountryFlag
    },
    data() {
        return {
            options: {
                process: pos => [
                    [pos[0], pos[1]],
                ],
            },
            profileData: {
                name: "Peter",
                age: 20,
                weight: 75,
                height: 180,
                email: "fake@gmail.com",
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
};
</script>
<style>
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