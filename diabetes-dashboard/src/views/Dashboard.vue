<template>
    <div id="dashboard">
        <Navbar class="header"></Navbar>
        <div class="clearfix"></div>
        <div class="main">
            <v-row>
                <v-col cols="12" sm="6" md="6" lg="6" class="pb-0">
                    <p>23 May 2021</p>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6" class="rightAligned pb-0">
                    <p>00:00 - 24:00</p>
                </v-col>
            </v-row>
            <Cards />
            <v-row>
                <v-col class="wide-chart" cols="8">
                    <v-card class="overview-chart-container" elevation="2">
                        <v-progress-circular indeterminate color="primary" size="50" v-if="!rendered" />
                        <OverviewChart v-if="rendered" :data="data" />
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <v-card class="full-height" elevation="2">
                        <Statistics />
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col md="8">
                    <v-card elevation="2">
                        <v-card elevation="0">
                            <v-tabs v-model="tab">
                                <v-tab v-for="item in items" :key="item">
                                    {{ $t(item) }}
                                </v-tab>
                            </v-tabs>
                            <v-tabs-items v-model="tab">
                                <v-tab-item>
                                    <TableInsulinData />
                                </v-tab-item>
                                <v-tab-item>
                                    <TableFoodData
                                        @selectedFood="getSelectedFood"
                                    />
                                </v-tab-item>
                                <v-tab-item>
                                    <TableActivitiesData
                                        @selectedActivity="getSelectedActivity"
                                    />
                                </v-tab-item>
                            </v-tabs-items>
                        </v-card>
                    </v-card>
                </v-col>
                <v-col col="3">
                    <v-card elevation="2">
                        <EmotionsComponent />
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import OverviewChart from '@/components/OverviewChart.vue';
import Statistics from "@/components/Statistics.vue";
import EmotionsComponent from "@/components/EmotionsComponent.vue";
import TableFoodData from "@/components/TableFoodData.vue";
import TableActivitiesData from "@/components/TableActivitiesData.vue";
import TableInsulinData from "@/components/TableInsulinData.vue";
import Navbar from '@/components/Navbar.vue';
import { AxiosWrapper } from '@/helpers/wrapper.js';
import Cards from '@/components/Cards.vue';

const wrapper = new AxiosWrapper();

// These URL's will be removed in the future
const URL = 'https://gist.githubusercontent.com/nbalasovs/e212107367c65915668cf26e75d2ccfa/raw/f5b7bff5d5a87b8af1b23bec3059b400f189559a/dummy.json';

export default {
    name: 'Dashboard',
    components: {
        Statistics,
        EmotionsComponent,
        TableFoodData,
        TableActivitiesData,
        TableInsulinData,
        OverviewChart,
        Navbar,
        Cards
    },
    data() {
        return {
            data: null,
            tab: null,
            items: ['insulin', 'food', 'activities'],
            chosenFood: { },
            chosenActivity: { activity: null, now: null },
            rendered: false
        };
    },
    created() {
        wrapper.get(URL, dataPromise => dataPromise).then(data => {
            this.data = data;
            this.rendered = true;
        });
    }
};
</script>

<style>
.unalloc {
    min-height: 40vh;
}
.full-height {
  height: 100%;
}
.main {
  background-color: #F4FAFD;
  padding: 0 2% 0 2%;
}
.clearfix {
  height: 3vh;
  background-color: #F4FAFD;
}
.rightAligned {
    text-align: right;
}
.overview-chart-container {
    height: 700px;
}
.overview-chart-container .v-progress-circular {
    left: 50%;
    top: 45%;
}
</style>
