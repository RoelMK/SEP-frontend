<template>
  <div>
    <h3 class="center">Hey {{ profileData.name }}!</h3>
    <hr>

    <h4 class="center">Your Profile Information is:</h4>
    <hr>
    <v-row class="center"> Age: {{ profileData.age }} </v-row>
    <v-row class="center"> Height: {{ profileData.height }} cm</v-row>
    <v-row class="center"> Weight: {{ profileData.weight }} kg</v-row>
    <v-row class="center"> E-mail: {{ profileData.email }} </v-row>
    <hr>

    <h4 class="center">Your Glucose Settings are:</h4>
    <hr>
    <v-row class="center">
      "Very High" threshold: {{ healthSettings.veryHighThreshold }}
      {{ healthSettings.unit }}
    </v-row>
    <v-row class="center">
      "High" range: from {{ healthSettings.highRangeMin }}
      {{ healthSettings.unit }} to {{ healthSettings.highRangeMax }}
      {{ healthSettings.unit }}
    </v-row>
    <v-row class="center">
      "Normal" range: from {{ healthSettings.normalRangeMin }}
      {{ healthSettings.unit }} to {{ healthSettings.normalRangeMax }}
      {{ healthSettings.unit }}
    </v-row>
    <v-row class="center">
      "Low" range: from {{ healthSettings.lowRangeMin }}
      {{ healthSettings.unit }} to {{ healthSettings.lowRangeMax }}
      {{ healthSettings.unit }}
    </v-row>
    <v-row class="center">
      "Very High" threshold: {{ healthSettings.veryLowThreshold }}
      {{ healthSettings.unit }}
    </v-row>
    <v-row class="center">
      "Normal" fasting blood glucose range: from
      {{ healthSettings.fastingRangeMin }} {{ healthSettings.unit }} to
      {{ healthSettings.fastingRangeMax }} {{ healthSettings.unit }}
    </v-row>
    <v-row class="center">
      "Normal" blood glucose PP threshold:
      {{ healthSettings.veryLowThreshold }} {{ healthSettings.unit }}
    </v-row>
    <v-row class="center">
      A1C goal: below {{ healthSettings.goalA1C }}%
    </v-row>
    <hr>

    <h4 class="center">Your Food Settings are:</h4>
    <hr>
    <v-row class="center">
      Consumed calories goal: {{ foodSettings.goalConsumedCalories }}
    </v-row>
    <v-row class="center">
      Burnt calories goal: {{ foodSettings.goalBurntCalories }}
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ProfileInfo",
  data() {
    return {
      profileData: {
        name: "Peter",
        age: 20,
        weight: 75,
        height: 180,
        email: "fake@gmail.com",
      },
      healthSettings: {
        unit: "mmol/L",
        veryHighThreshold: 13.9,
        highRangeMin: 10.1,
        highRangeMax: 13.9,
        normalRangeMin: 3.9,
        normalRangeMax: 10.0,
        lowRangeMin: 3.0,
        lowRangeMax: 3.8,
        veryLowThreshold: 3.0,
        fastingRangeMin: 4.4,
        fastingRangeMax: 7.2,
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
.border {
  border-style: solid;
}
.center {
  justify-content: center;
  align-items: center;
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>