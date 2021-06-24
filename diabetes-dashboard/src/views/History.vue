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
                        <OverviewChart
                            ref="overview"
                        />
                    </v-card>
                </div>
                <div class="rightColumn">
                    <v-card elevation="2" height="52rem">
                        <v-card elevation="0">
                            <v-tabs v-model="tab">
                                <v-tab v-for="item in items" :key="item">
                                    {{ $t(item) }}
                                </v-tab>
                            </v-tabs>
                            <v-tabs-items v-model="tab">
                                <v-tab-item>
                                    <TableInsulinData
                                    />
                                </v-tab-item>
                                <v-tab-item>
                                    <TableFoodData
                                    />
                                </v-tab-item>
                                <v-tab-item>
                                    <TableActivitiesData
                                    />
                                </v-tab-item>
                                <v-tab-item>
                                    <EmotionTable
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
                        <Legend />
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
import { mapState } from "vuex";
import moment from 'moment';

export default {
    // name the view
    name: "History",
    // include the following components
    components: {
        Navbar,
        TableFoodData,
        TableActivitiesData,
        TableInsulinData,
        EmotionTable,
        OverviewChart,
        Legend,
    },
    // get data from store state
    computed: {
        ...mapState(["data"]),
    },
    data() {
        return {
            tab: null,
            // tab names
            items: ["insulin", "food", "activities", "emotions"],
        };
    },
    // if there is no data redirect user to main page
    created() {
        if (this.data.length <= 0)
            this.$router.push("/");
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
    width: 52%;
    margin-right: 1%;
    margin-top: 1%;
}
.rightColumn {
    float: left;
    width: 46%;
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
    width: 52%;
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