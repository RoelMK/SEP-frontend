<template>
  <div class="profile-info">
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
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
export default {
  name: "ProfileInfo",
  components: {
    VueSlider
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
.profile-info {
  padding: 0 5% 0 5%;
}
.border {
  border-style: solid;
}
</style>