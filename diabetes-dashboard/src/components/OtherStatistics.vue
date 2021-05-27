<template>
    <v-container>
        <p>Cumulative Long Insulin: {{ cumLongInsulin }} mg</p>
        <p>Cumulative Short Insulin: {{ cumShortInsulin }} mg</p>
        <p>Cumulative Carbs: {{ cumCarbs }} g</p>
        <p>Cumulative Consumed Calories: {{ cumConsumedCarbs }} kcal</p>
        <p>Cumulative Burnt Calories: {{ cumBurntCarbs }} kcal</p>
        <p>Cumulative Steps: {{ cumSteps }}</p>
        <p>Average Heartbeat: {{ avgHeartbeat }} bpm</p>
        <hr>
        <p>Current A1C: {{ a1c }} {{ unitBG }}</p>
        <v-data-table
            :headers="headers"
            :items="metrics"
            :hide-default-footer="true"
            class="elevation-1"
        ></v-data-table>
    </v-container>
</template>

<script>
export default {
    name: "OtherStatistics",
    data() {
        return {
            cumLongInsulin: 0,
            cumShortInsulin: 0,
            cumCarbs: 0,
            cumConsumedCarbs: 0,
            cumBurntCarbs: 0,
            cumSteps: 0,
            avgHeartbeat: 0,
            a1c: 0,
            unitBG: 'mmol/L',

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