<template>
  <div id="dashboard">
    <div class="main">
      <v-row>
        <v-col class="col" cols="12" md="6">
          <v-container>
            <div class="col1">
              <Glucose />
            </div>
          </v-container>
        </v-col>
        <v-col class="col" cols="12" md="6">
          <v-container>
            <div class="col1">
              <Profile v-bind:selectedFoodItem="chosenFood" v-bind:selectedActivity="chosenActivity"/>
            </div>
          </v-container>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col" cols="12" md="6">
          <v-container>
              <v-card style="border-radius:20px;">
                <v-tabs v-model="tab">
                  <v-tab v-for="item in items" :key="item">
                    {{ item }}
                  </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                  <v-tab-item>
                    <TableInsulinData />
                  </v-tab-item>
                  <v-tab-item>
                    <TableFoodData  @selectedFood="getSelectedFood"/>
                  </v-tab-item>
                  <v-tab-item>
                    <TableActivitiesData @selectedActivity="getSelectedActivity"/>
                  </v-tab-item>
                </v-tabs-items>
                
              </v-card>
          </v-container>
        </v-col>
      </v-row>

    </div>
  </div>
</template>

<script>
import Glucose from "@/components/Glucose.vue";
import Profile from "@/components/Profile.vue";
import TableFoodData from "@/components/TableFoodData.vue";
import TableActivitiesData from "@/components/TableActivitiesData.vue";
import TableInsulinData from "@/components/TableInsulinData.vue";

export default {
  name: "Dashboard",
  components: {
    Glucose,
    Profile,
    TableFoodData,
    TableActivitiesData,
    TableInsulinData,
  },
  data() {
    return {
      tab: null,
      items: ["insulin", "food", "activities"],
      chosenFood: '',
      chosenActivity: '',
    };
  },
  methods: {
      getSelectedFood(food) {
          this.chosenFood = food;
      },
      getSelectedActivity(activity) {
          this.chosenActivity = activity;
      }

  }
};
</script>

<style>
.unalloc {
  min-height: 40vh;
}
.col {
  justify-content: center;
  align-items: center;
  display: flex;
}
.col1 {
  border-radius: 20px;
  left: 3%;
  right: 3%;
  background-color: white;
}
.main {
  background-color: #f2f2f2;
  padding: 0 2% 0 2%;
}
</style>
