<template>
    <v-card flat>
        <v-card-text class="statistics-container">
            <StackedBarChart :data="data" />
            <ul>
                <li>
                    Average BG:
                    <span>{{ avgBG }} {{ unitBG }}</span>
                </li>
                <li>
                    Max BG:
                    <span>{{ maxBG }} {{ unitBG }}</span>
                </li>
                <li>
                    Min BG:
                    <span>{{ minBG }} {{ unitBG }}</span>
                </li>
            </ul>
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