<template>
    <v-card flat>
        <v-card-text class="statistics-container">
            <ul>
                <li>
                    Cumulative Long Insulin:
                    <span>{{ cumLongInsulin }} mg</span>
                </li>
                <li>
                    Cumulative Short Insulin:
                    <span>{{ cumShortInsulin }} mg</span>
                </li>
                <li>
                    Cumulative Carbs:
                    <span>{{ cumCarbs }} g</span>
                </li>
                <li>
                    Cumulative Consumed Calories:
                    <span>{{ cumConsumedCarbs }} kcal</span>
                </li>
                <li>
                    Cumulative Burnt Calories:
                    <span>{{ cumBurntCarbs }} kcal</span>
                </li>
                <li>
                    Cumulative Steps:
                    <span>{{ cumSteps }}</span>
                </li>
                <li>
                    Cumulative Average Heartbeat:
                    <span>{{ avgHeartbeat }} bpm</span>
                </li>
            </ul>
            <v-data-table
                :headers="headers"
                :items="metrics"
                :hide-default-footer="true"
                class="elevation-0 pt-5"
            ></v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "CumulativeStatistics",
    data() {
        return {
            cumLongInsulin: 0,
            cumShortInsulin: 0,
            cumCarbs: 0,
            cumConsumedCarbs: 0,
            cumBurntCarbs: 0,
            cumSteps: 0,
            avgHeartbeat: 0,
            unitBG: "mmol/L",

            headers: [
                {
                    text: "Metric",
                    align: "start",
                    sortable: false,
                    value: "name",
                },
                { text: "Q1", value: "q1" },
                { text: "Q2", value: "q2" },
                { text: "Q3", value: "q3" },
                { text: "Q4", value: "q4" },
            ],
            metrics: [
                {
                    name: "Avg. BG",
                    q1: 159,
                    q2: 6.0,
                    q3: 24,
                    q4: 4.0,
                },
                {
                    name: "A1C",
                    q1: 159,
                    q2: 6.0,
                    q3: 24,
                    q4: 4.0,
                },
            ],
        };
    },
};
</script>

<style>
</style>