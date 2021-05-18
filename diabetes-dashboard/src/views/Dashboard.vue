<template>
    <div id="dashboard">
        <Header class="header"></Header>
        <div class="clearfix"></div>
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
                        <LineChart v-if="rendered" 
                            @filtered="updateData"
                            @displayDoughnut="getDisplayDoughnutStatus"
                            :data="data" 
                            :selectedActivity="chosenActivity"/>
                    </div>
                </v-col>
                <v-col v-else class="wide-chart" cols="12">
                    <div class="col1">
                        <LineChart v-if="rendered" 
                            @filtered="updateData"
                            @displayDoughnut="getDisplayDoughnutStatus"
                            :data="data" 
                            :selectedActivity="chosenActivity"/>
                    </div>
                </v-col>
                <v-col v-if="displayDoughnut" cols="3">
                    <div class="col1">
                        <DoughnutChart :datasets="this.data.datasets"/>
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
import DoughnutChart from '@/components/DoughnutChart.vue';
import Header from '@/components/Header.vue';
import moment from 'moment';
import { AxiosWrapper } from '@/helpers/wrapper.js';

const wrapper = new AxiosWrapper();

// These URL's will be removed in the future
const URL = 'https://gist.githubusercontent.com/nbalasovs/4e766292125780ce206e5790d46f2978/raw/19488c092c0f778f33c0a43c68542c5767c0c568/5min.json';
const TEST_URL = 'https://gist.githubusercontent.com/nbalasovs/e1b44f2e5dc7f2ded698994102afe225/raw/e0f6cd42c966747e7d505d61aa3f0c1c53e69642/20min.json';

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
    Header
  },
  methods: {
      // Test request that simulates receiving updated chart data, proper
      // documentation will be required
      // eslint-disable-next-line
      updateData(value) {
          wrapper.get(TEST_URL, dataPromise => dataPromise).then(data => {
              this.data.labels = data.map(l => moment(l.date));
              this.data.datasets[0].data = data.map(d => d.value);
              this.data.datasets[0].pointBackgroundColor = data.map(c => this.setColor(c.value));
          });
      },
      /**
        * Set point fill color
        * @param  { int }       value Data point
        * @return { string }
        */
      setColor(value) {
          if (value < 3.0) return 'rgb(218, 42, 61)';
          else if (3.0 <= value && value <= 3.8) return 'rgba(218, 42, 61, 0.2)';
          else if (3.9 <= value && value <= 10.0) return 'rgb(110, 158, 94)';
          else if (10.1 <= value && value <= 13.9) return 'rgb(250, 216, 71)';
          else return 'rgb(247, 179, 69)';
      },
      getSelectedFood(food) {
          this.chosenFood = food;
      },
      getSelectedActivity(activity) {
          this.chosenActivity = { activity: activity, now: moment() };
      },
      getDisplayDoughnutStatus(status) {
          this.displayDoughnut = status;
      }
  },
  data() {
      return {
          tab: null,
          items: ["insulin", "food", "activities"],
          chosenFood: { },
          chosenActivity: { activity: null, now: null },
          displayDoughnut: true,
          data: {
              labels: null,
              datasets: [
                  {
                      label: 'Glucose',
                      fill: {
                          target: 'start',
                          above: 'rgba(54,73,93,.2)'
                      },
                      data: null,
                      pointBackgroundColor: null,
                      radius: 4,
                      borderColor: "#36495d",
                      pointBorderWidth: 1,
                      borderWidth: 3
                  }
              ]
          },
          rendered: false
      }
  },
  created() {
    wrapper.get(URL, dataPromise => dataPromise).then(data => {
        this.data.labels = data.map(l => moment(l.date));
        this.data.datasets[0].data = data.map(d => d.value);
        this.data.datasets[0].pointBackgroundColor = data.map(c => this.setColor(c.value));
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
.clearfix {
  height: 3vh;
  background-color: #f2f2f2;
}
</style>
