<template>
    <v-card flat>
        <v-card-text class="statistics-container">
            <StackedBarChart />
            <ul>
            </ul>
        </v-card-text>
    </v-card>
</template>

<script>
import StackedBarChart from '@/components/StackedBarChart.vue';

export default {
    // name component
    name: "BGStatistics",
    // state components used in this component
    components: {
        StackedBarChart
    },
    // state props used in component
    props: {
        data: {
            type: Array,
            default: null
        }
    },
    data() {
        return {
            // store average blood glucose
            avgBG: 0,
            // store minimum blood glucose
            minBG: 0,
            // store maximum blood glucose
            maxBG: 0,
            // store blood glucose unit
            unitBG: "mmol/L",
        };
    },
};
</script>

<style scoped>
.statistics-container .echarts {
    height: 270px;
}
</style>