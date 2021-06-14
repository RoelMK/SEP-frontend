<template>
    <div id="dashboard">
        <Navbar class="header"></Navbar>
        <div class="clearfix"></div>
        <div class="main">
            <div class="row">
                <div class="leftColumn">
                    <v-card
                        height="100%"
                        id="overview-chart-container"
                        elevation="2"
                    >
                        <v-progress-circular
                            indeterminate
                            color="primary"
                            size="50"
                            v-if="!rendered"
                        />
                        <OverviewChart
                            ref="overview"
                            v-if="rendered"
                            :data="dataInit"
                            :itemTimeFrame="chosenItemTimeFrame"
                        />
                    </v-card>
                </div>
                <div class="rightColumn">
                    <v-card elevation="2" height="100%">
                        <v-card elevation="0">
                            <v-tabs v-model="tab">
                                <v-tab v-for="item in items" :key="item">
                                    {{ $t(item) }}
                                </v-tab>
                            </v-tabs>
                            <v-tabs-items v-model="tab">
                                <v-tab-item>
                                    <TableInsulinData/>
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
                                <v-tab-item>
                                    <EmotionTable
                                        @selectedEmotion="getSelectedEmotion"
                                    />
                                </v-tab-item>
                            </v-tabs-items>
                        </v-card>
                    </v-card>
                </div>
            </div>
            <div class="row">
                <div class="legend">
                    <v-card class="full-height legend-container" elevation="2">
                        <v-progress-circular
                            indeterminate
                            color="primary"
                            size="50"
                            v-if="!rendered"
                        />
                        <Legend v-if="rendered" />
                    </v-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import OverviewChart from "@/components/OverviewChart.vue";
import Legend from "@/components/Legend.vue";
import TableFoodData from "@/components/TableFoodData.vue";
import TableActivitiesData from "@/components/TableActivitiesData.vue";
import TableInsulinData from "@/components/TableInsulinData.vue";
import EmotionTable from "@/components/EmotionTable.vue";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { AxiosWrapper } from "@/helpers/wrapper.js";
import Data from "@/repositories/Data.js";
import { mapState } from "vuex";

const moment = extendMoment(Moment);
const wrapper = new AxiosWrapper();

// These URL's will be removed in the future
const URL =
    "https://gist.githubusercontent.com/nbalasovs/e212107367c65915668cf26e75d2ccfa/raw/14fde6559649d3fc5c6e2bd7d002e0000e50a54f/dummy.json";

export default {
    name: "History",
    components: {
        Navbar,
        TableFoodData,
        TableActivitiesData,
        TableInsulinData,
        EmotionTable,
        OverviewChart,
        Legend,
    },
    computed: {
        ...mapState(["data"]),
    },
    methods: {
        getSelectedFood(food) {
            let startTime = moment(food.time, "HH:mm")
                .subtract(2, "hours")
                .format("HH:mm");
            let endTime = moment(food.time, "HH:mm")
                .add(2, "hours")
                .format("HH:mm");
            let start = moment(
                moment(food.date + " " + startTime).format(
                    "MM-DD-YYYY HH:mm"
                )
            ).format("x");
            let end = moment(
                moment(food.date + " " + endTime).format(
                    "MM-DD-YYYY HH:mm"
                )
            ).format("x");

            this.chosenItemTimeFrame = {
                start,
                end,
                now: moment(),
            };
        },
        getSelectedActivity(activity) {
            let start = moment(
                moment(activity.startDate + " " + activity.startTime).format(
                    "MM-DD-YYYY HH:mm"
                )
            ).format("x");
            let end = moment(
                moment(activity.endDate + " " + activity.endTime).format(
                    "MM-DD-YYYY HH:mm"
                )
            ).format("x");

            this.chosenItemTimeFrame = {
                start,
                end,
                now: moment(),
            };
        },
        getSelectedEmotion(emotion) {
            let startTime = moment(emotion.time, "HH:mm")
                .subtract(2, "hours")
                .format("HH:mm");
            let endTime = moment(emotion.time, "HH:mm")
                .add(2, "hours")
                .format("HH:mm");
            let start = moment(
                moment(emotion.date + " " + startTime).format(
                    "MM-DD-YYYY HH:mm"
                )
            ).format("x");
            let end = moment(
                moment(emotion.date + " " + endTime).format(
                    "MM-DD-YYYY HH:mm"
                )
            ).format("x");

            this.chosenItemTimeFrame = {
                start,
                end,
                now: moment(),
            };
        },
    },
    watch: {
        data: function (newData) {
            this.dataInit = newData;
        },
    },
    data() {
        return {
            tab: null,
            items: ["insulin", "food", "activities", "emotions"],
            dataInit: null,
            rendered: false,
            // chosenInsulin: { insulin: null, now: null },
            // chosenFood: { food: null, now: null },
            // chosenActivity: { activity: null, now: null },
            // chosenEmotion: { emotion: null, now: null },
            chosenItemTimeFrame: null,
        };
    },
    created() {
        // TODO: Needs to be replaced after we get more data in the backend
        Data.testFetch().then(
            (res) => {
                this.dataInit = res.data;
                this.rendered = true;
            },
            (err) => console.log(err)
        );
        //console.log("Data: ");
        //console.log(this.dataInit);
    },
};
</script>

<style>
.full-height {
    height: 100%;
}
.main {
    background-color: #f4fafd;
    padding: 0 2% 0 2%;
}
.clearfix {
    height: 3vh;
    background-color: #f4fafd;
}
#overview-chart-container {
    height: 700px;
}
#overview-chart-container .v-progress-circular,
.legend-container .v-progress-circular {
    left: 50%;
    top: 45%;
}
.leftColumn {
    float: left;
    width: 56%;
    margin-right: 1%;
    margin-top: 1%;
}
.rightColumn {
    float: left;
    width: 42%;
    margin-left: 1%;
    margin-top: 1%;
}
.row:after {
    content: "";
    display: table;
    clear: both;
}
.legend {
    float: left;
    width: 100%;
    margin-top: 2%;
    margin-bottom: 2%;
}
.filterText {
    font-size: 0.75rem;
    color: rgba(0, 0, 0, 0.6);
    font-weight: bold;
}
.border {
    border-bottom: 1px solid gray;
}
.tableSection {
    margin-top: 2%;
}
.filterElement {
    margin: 0 10% 0 10%;
}
</style>