<template>
  <div>
    <h4 class="center">Modify Food Settings:</h4>
    <hr />
    <v-row>
      <v-col>
        Consumed Calories Goal:
      </v-col>
      <v-col>
        <form class="center">
          <input
            type="number"
            v-model="goalConsumedCalories"
            placeholder="Enter value (int)"
          />
          <input type="submit" value="Submit" class="button"/>
        </form>
      </v-col>
    </v-row>
    <hr/>
    <v-row>
      <v-col>
        Burnt Calories Goal:
      </v-col>
      <v-col>
        <form class="center">
          <input
            type="number"
            v-model="goalBurntCalories"
            placeholder="Enter value (int)"
          />
          <input type="submit" value="Submit" class="button"/>
        </form>
      </v-col>
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
.center {
  justify-content: center;
  align-items: center;
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
}
.button {
  background-color: #008cba;
  border-radius: 12px;
  padding: 6px 18px;
  color: white;
}
</style>