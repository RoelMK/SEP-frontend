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
            <v-row>
                <v-col class="wide-chart" cols="12">
                    <div class="col1">
                        <LineChart @filtered="updateData" :datasets="this.datasets" :labels="this.labels" v-if="rendered" />
                    </div>
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
import LineChart from '@/components/LineChart.vue';
import moment from 'moment';
import { AxiosWrapper } from '@/helpers/wrapper.js';

const wrapper = new AxiosWrapper();
const URL = 'https://gist.githubusercontent.com/nbalasovs/4e766292125780ce206e5790d46f2978/raw/19488c092c0f778f33c0a43c68542c5767c0c568/5min.json';

export default {
  name: "Dashboard",
  components: {
    Glucose,
    Profile,
    TableFoodData,
    TableActivitiesData,
    TableInsulinData,
    LineChart
  },
  methods: {
      updateData(value) {
          console.log(value);
      },
      getSelectedFood(food) {
          this.chosenFood = food;
      },
      getSelectedActivity(activity) {
          this.chosenActivity = activity;
      }
  },
  data() {
      return {
          tab: null,
          items: ["insulin", "food", "activities"],
          chosenFood: '',
          chosenActivity: '',
          datasets: [
              {
                  label: 'Glucose',
                  fill: 'start',
                  data: null,
                  backgroundColor: "rgba(54,73,93,.5)",
                  borderColor: "#36495d",
                  borderWidth: 3
              }
          ],
          labels: null,
          rendered: false
      }
  },
  created() {
    wrapper.get(URL, dataPromise => dataPromise).then(data => {
        this.labels = data.map(l => moment(l.date));
        this.datasets[0].data = data.map(d => d.value);
        this.rendered = true;
    });
  }
};
</script>

<style>
.unalloc {
  min-height: 40vh;
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
