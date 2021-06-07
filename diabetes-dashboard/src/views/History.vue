<template>
    <v-container>
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
                            <v-tab-item>
                                <EmotionTable
                                    @selectedActivity="getSelectedActivity"
                                />
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                </v-card>
            </v-col>
            <v-col> </v-col>
        </v-row>
    </v-container>
</template>

<script>
import TableFoodData from "@/components/TableFoodData.vue";
import TableActivitiesData from "@/components/TableActivitiesData.vue";
import TableInsulinData from "@/components/TableInsulinData.vue";
import EmotionTable from "@/components/EmotionTable.vue";
import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

export default {
    name: "History",
    components: {
        TableFoodData,
        TableActivitiesData,
        TableInsulinData,
        EmotionTable,
    },
    methods: {
        getSelectedFood(food) {
            this.chosenFood = food;
        },
        getSelectedActivity(activity) {
            this.chosenActivity = { activity: activity, now: moment() };
        },
    },
    data() {
        return {
            tab: null,
            items: ["insulin", "food", "activities", "emotions"],
            chosenFood: {},
            chosenActivity: { activity: null, now: null },
        };
    },
};
</script>

<style>
</style>