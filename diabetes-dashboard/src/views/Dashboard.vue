<template>
    <div id="dashboard">
        <Navbar class="header"></Navbar>
        <div class="clearfix"></div>
        <div class="main">
            <v-row>
                <v-col class="wide-chart" cols="9">
                    <v-card elevation="2">
                        <OverviewChart v-if="rendered" :data="data" />
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-container class="col1">
                        <v-card elevation="0">
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
                <v-col cols="12" md="6">
                    <div class="col1">
                        <Profile />
                    </div>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import Profile from "@/components/Profile.vue";
import TableFoodData from "@/components/TableFoodData.vue";
import TableActivitiesData from "@/components/TableActivitiesData.vue";
import TableInsulinData from "@/components/TableInsulinData.vue";
import OverviewChart from "@/components/OverviewChart.vue";
import Navbar from '@/components/Navbar.vue';
import moment from 'moment';
import { AxiosWrapper } from '@/helpers/wrapper.js';

const wrapper = new AxiosWrapper();

// These URL's will be removed in the future
const URL = 'https://gist.githubusercontent.com/nbalasovs/e212107367c65915668cf26e75d2ccfa/raw/0658bd3e1b54668f7349e902d920d253afb93e1e/dummy.json';

export default {
    name: "Dashboard",
    components: {
        Profile,
        TableFoodData,
        TableActivitiesData,
        TableInsulinData,
        OverviewChart,
        Navbar
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
        }
    },
    data() {
        return {
            data: null,
            tab: null,
            items: ["insulin", "food", "activities"],
            chosenFood: { },
            chosenActivity: { activity: null, now: null },
            rendered: false
        };
    },
    created() {
        wrapper.get(URL, dataPromise => dataPromise).then(data => {
            this.data = data.map(e => {
                return [moment(e.date).unix(), e.value];
            });
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
