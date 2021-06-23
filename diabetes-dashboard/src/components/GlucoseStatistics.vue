<template>
    <v-card flat>
        <v-card-text class="statistics-container">
            <StackedBarChart />
        </v-card-text>
    </v-card>
</template>

<script>
import StackedBarChart from '@/components/StackedBarChart.vue';

export default {
    name: "BGStatistics",
    components: {
        StackedBarChart
    },
    props: {
        data: {
            type: Array,
            default: null
        }
    },
    data() {
        return {
            avgBG: 0,
            minBG: 0,
            maxBG: 0,
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