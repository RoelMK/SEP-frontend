<template>
  <div>
    <h4 class="">Modify Food Settings:</h4>
    <v-row>
        <v-text-field
          class="input mt-5"
          label="Consumed calories goal"
          v-model="goalConsumedCalories"
          hint="Enter value"
        />
    </v-row>
    <v-row>
          <v-text-field
            class="input"
            label="Burnt calories goal"
            v-model="goalBurntCalories"
            hint="Enter value"
          />
    </v-row>
  </div>
</template>

<script>
export default {
  name: "FoodSettings",
  data() {
    return {
        goalConsumedCalories: '',
        goalBurntCalories: '',
    };
  },
};
</script>

<style>
.button {
  background-color: #008cba;
  border-radius: 12px;
  padding: 6px 18px;
  color: white;
}
</style>