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
                            <Profile :selectedFoodItem="chosenFood" :selectedActivity="chosenActivity.activity"/>
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
                <v-col v-if="displayDoughnut" class="wide-chart" cols="9">
                    <div class="col1">
                        <LineChart
                        @displayDoughnut="getDisplayDoughnutStatus"
                        @noDataDialog="getNoDataDialogStatus"
                        :data="{ datasets: this.datasets.slice(0, 2), labels: this.labels }"
                        :selectedActivity="chosenActivity"/>
                    </div>
                </v-col>
                <v-col v-else class="wide-chart" cols="12">
                    <div class="col1">
                        <LineChart 
                        @displayDoughnut="getDisplayDoughnutStatus" 
                        @noDataDialog="getNoDataDialogStatus" 
                        :data="{ datasets: this.datasets.slice(2, 3), labels: this.labels }" 
                        :selectedActivity="chosenActivity"/>
                    </div>
                </v-col>
                <v-col v-if="displayDoughnut" cols="3">
                    <div class="col1">
                        <DoughnutChart 
                        @noDataDialog="getNoDataDialogStatus" 
                        :data="this.datasets.slice(0, 1)"/>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="wide-chart" cols="12">
                    <div class="col1">
                        <ScatterPlot
                        @noDataDialog="getNoDataDialogStatus" 
                        :data="{ datasets: this.datasets.slice(3, 4), labels: this.labels }"/>
                    </div>
                </v-col>
            </v-row>

            <v-dialog v-model="displayNoDataDialog" max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline"><p style="font-size: 18px">There is no data in this time frame!</p></span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="displayNoDataDialog = false">OK</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
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
import DoughnutChart from '@/components/DoughnutChart.vue';
import ScatterPlot from '@/components/ScatterChart.vue';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

// For testing purposes
const rr = moment.range(moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm'), moment().format("YYYY-MM-DD HH:mm"));
const arr = Array.from(rr.by("minutes"));

export default {
  name: "Dashboard",
  components: {
    Glucose,
    Profile,
    TableFoodData,
    TableActivitiesData,
    TableInsulinData,
    LineChart,
    DoughnutChart,
    ScatterPlot,
  },
  methods: {
      getSelectedFood(food) {
          this.chosenFood = food;
      },
      getSelectedActivity(activity) {
          this.chosenActivity = { activity: activity, now: moment() };
      },
      getDisplayDoughnutStatus(status) {
          this.displayDoughnut = status;
      },
      getNoDataDialogStatus(status) {
          this.displayNoDataDialog = status;
      }
  },
  data() {
      return {
          tab: null,
          items: ["insulin", "food", "activities"],
          chosenFood: { },
          chosenActivity: { activity: null, now: null },
          displayDoughnut: true,
          displayNoDataDialog: false,
          labels: arr.map(date => moment(date)),
          datasets: [  
            {
                label: 'Glucose',
                fill: 'start',
                data: Array.from({length: arr.length}, () => Math.floor(Math.random() * 20)),
                backgroundColor: "rgba(54,73,93,.5)",
                borderColor: "#36495d",
                borderWidth: 3
            },
            {
                label: 'Iron',
                fill: 'start',
                data: Array.from({length: arr.length}, () => Math.floor(Math.random() * 20)),
                backgroundColor: "rgba(71, 183,132,.5)",
                borderColor: "#47b784",
                borderWidth: 3
            },
            {
                label: 'Carbs',
                fill: 'start',
                data: Array.from({length: arr.length}, () => Math.floor(Math.random() * 20)),
                backgroundColor: "rgba(255, 255, 0, .5)",
                borderColor: "#abab07",
                borderWidth: 3
            },
            {
                label: 'Hypos/Hypers',
                data: Array.from({length: arr.length}, () => Math.floor(Math.random() * 20)),
                backgroundColor: "rgba(54,73,93,.5)",
                borderColor: "#36495d",
                borderWidth: 3
            },
        ]
      }
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
