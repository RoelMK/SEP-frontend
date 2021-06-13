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
                    <v-text-area id="name">Cody Simpson</v-text-area>
                    <v-text-area id="role">User</v-text-area>
                </div>
            </v-col>
        </v-row>
        <br/>
        <v-row class="centerAligned">
            <v-col cols="12" md="6">
                <div class="customCol">
                    <v-text-area id="personalProperty">Age</v-text-area>
                    <v-text-area id="personalValue">20</v-text-area>
                </div>
            </v-col>
            <v-col cols="12" md="6">
                <div class="customCol">
                    <v-text-area id="personalProperty">Language</v-text-area>
                    <v-text-area>
                        <country-flag country='gb'/>
                    </v-text-area>
                </div>
            </v-col>
        </v-row>
        <v-row class="centerAligned">
            <v-col cols="12" md="6">
                <div class="customCol">
                    <v-text-area id="personalProperty">Height</v-text-area>
                    <v-text-area id="personalValue">180</v-text-area>
                </div>
            </v-col>
            <v-col cols="12" md="6">
                <div class="customCol">
                    <v-text-area id="personalProperty">Weight</v-text-area>
                    <v-text-area id="personalValue">80</v-text-area>
                </div>
            </v-col>
        </v-row>
        <v-row class="centerAligned">
            <v-col cols="12">
                <div class="customCol">
                    <v-text-area id="personalProperty">Email</v-text-area>
                    <v-text-area id="personalValue">{{ this.$store.state.user.email }}</v-text-area>
                </div>
            </v-col>
        </v-row>
    </v-card>
    <!-- <div class="profile-info">
        <h3 class="">Hey {{ profileData.name }}!</h3>

        <h4 class="">Profile Information</h4>
        <p class=""> Age: {{ profileData.age }} </p>
        <p class=""> Height: {{ profileData.height }} cm</p>
        <p class=""> Weight: {{ profileData.weight }} kg</p>
        <p class=""> E-mail: {{ profileData.email }} </p>

        <h4 class="">Glucose Settings</h4>

        <v-row>
            <v-text-field
                class="input"
                label="'Very high' treshold"
                v-model="healthSettings.veryHighThreshold"
                hint="in mmol/L"
            />
        </v-row>
        <v-row class="mt-3">
            <v-text>High glucose range</v-text>
            <vue-slider
                class="price_slider"
                :width="'100%'"
                :min="range[0]"
                :max="range[1]"
                ref="slider"
                v-model="healthSettings.highRange"
                v-bind="options"
                :interval="0.1"
            ></vue-slider>

        </v-row>
        <v-row class="mt-5">
            <v-text>Normal glucose range</v-text>
            <vue-slider
                class="price_slider"
                :width="'100%'"
                :min="range[0]"
                :max="range[1]"
                ref="slider"
                v-model="healthSettings.normalRange"
                v-bind="options"
                :interval="0.1"
            ></vue-slider>
        </v-row>
        <v-row class="mt-5">
            <v-text>Low glucose range</v-text>
            <vue-slider
                class="price_slider"
                :width="'100%'"
                :min="range[0]"
                :max="range[1]"
                ref="slider"
                v-model="healthSettings.lowRange"
                v-bind="options"
                :interval="0.1"
            ></vue-slider>
        </v-row>
        <v-row class="mt-5">
            <v-text>Normal glucose range when fasting</v-text>
            <vue-slider
                class="price_slider"
                :width="'100%'"
                :min="range[0]"
                :max="range[1]"
                ref="slider"
                v-model="healthSettings.fastingRange"
                v-bind="options"
                :interval="0.1"
            ></vue-slider>
        </v-row>
        <v-row>
            <v-text-field
                class="input"
                label="A1C goal"
                v-model="healthSettings.goalA1C"
                hint="Below x, in mmol/L"
            />
        </v-row>
        <v-row>
            <v-text-field
                class="input"
                label="Normal blood glucose PP threshold"
                v-model="healthSettings.ppRangeThreshold"
                hint=""
            />
        </v-row>

        <h4 class="">Food Settings</h4>
        <v-row>
            <v-text-field
                class="input"
                label="Consumed calories goal"
                v-model="foodSettings.goalConsumedCalories"
                hint=""
            />
        </v-row>
        <v-row>
            <v-text-field
                class="input"
                label="Burnt calories goal"
                v-model="foodSettings.goalBurntCalories"
                hint=""
            />
        </v-row>
        <v-btn
            color="success">
            Save changes
        </v-btn>
    </div> -->
</template>

<script>
// import VueSlider from 'vue-slider-component';
// import 'vue-slider-component/theme/default.css';
import CountryFlag from 'vue-country-flag';

export default {
    name: "ProfileInfo",
    components: {
        CountryFlag
        // VueSlider
    },
    data() {
        return {
            options: {
                process: pos => [
                    [pos[0], pos[1]],
                ],
                //enableCross: true
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

/* .profile-info {
  padding: 0 5% 0 5%;
} */
/* .border {
  border-style: solid;
} */
</style>