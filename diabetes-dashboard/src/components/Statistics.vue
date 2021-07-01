<template>
    <v-container>
        <v-card elevation="0">
            <v-tabs fixed-tabs v-model="tab">
                <v-tab>Glucose</v-tab>
                <v-tab>Cumulative</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <v-card flat>
                        <v-card-text class="statistics-container">
                            <StackedBarChart />
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <CumulativeStatistics :minMax="minMax" :proportions="proportions" />
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-container>
</template>

<script>
import StackedBarChart from '@/components/StackedBarChart.vue';
import CumulativeStatistics from "@/components/CumulativeStatistics.vue";

export default {
    // set name of component
    name: "Statistics",
    // specify components used in this component
    components: {
        StackedBarChart,
        CumulativeStatistics,
    },
    // Use these props to adjust statistics to a data slider value
    props: {
        minMax: {
            type: Array,
            default: null
        },
        proportions: {
            type: Array,
            default: null
        },
    },
    data() {
        // Keeps track of the currently displayed tab
        return {
            tab: null,
        };
    },
};
</script>

<style>
.statistics-container {
    padding-top: 2rem;
}
.statistics-container ul {
    list-style: none;
    padding-left: 0;
}
.statistics-container li {
    font-size: 1rem;
    padding-bottom: 0.8rem;
}
.statistics-container li span {
    font-weight: bold;
}
.statistics-container .echarts {
    height: 270px;
}
</style>