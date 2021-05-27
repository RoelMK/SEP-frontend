<template>
    <div class="overview-chart-container">
        <v-chart id="overview-chart" :option="options" autoresize />
    </div>
</template>

<script>
import GLUCOSE from '../datasets/glucose.json';
import MEAL from '../datasets/meal.json';
import moment from 'moment';

export default {
    name: 'overviewChart',
    props: {
        data: {
            type: Array,
            default: null
        }
    },
    data() {
        return {
            options: {
                tooltip: {
                    trigger: 'axis'
                },
                axisPointer: {
                    link: {xAxisIndex: 'all'},
                },
                grid: [
                    {
                        bottom: "40%",
                    },
                    {
                        top: "60%"
                    }
                ],
                xAxis: [
                    {
                        gridIndex: 0,
                        type: "time",
                        position: 'top',
                        offset: 10,
                        boundaryGap: false,
                        splitArea: {
                            show: true
                        },
                    },
                    {
                        show: true,
                        gridIndex: 1,
                        type: "time",
                        splitArea: {
                            show: true,
                        },
                        axisLabel: {
                            show: false
                        },
                        min: moment(GLUCOSE[0].ts).unix(),
                        max: moment(GLUCOSE[GLUCOSE.length - 1].ts).unix()
                    },
                ],
                yAxis: [
                    {
                        gridIndex: 0,
                        type: "value",
                        boundaryGap: [0, "100%"],
                    },
                    {
                        gridIndex: 1,
                        type: "value",
                        boundaryGap: [0, "100%"],
                    },
                ],
                visualMap: {
                    type: "piecewise",
                    show: false,
                    splitNumber: 4,
                    seriesIndex: 0,
                    pieces: [
                        { min: 151, max: 200 },
                        { min: 101, max: 150 },
                        { min: 51, max: 100 },
                        { min: 0, max: 50 },
                    ],
                },
                series: [
                    {
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        name: "Glucose",
                        type: "line",
                        symbol: "none",
                        areaStyle: {},
                        data: this.prepareData(GLUCOSE),
                    },
                    {
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        name: "Meal",
                        type: "bar",
                        data: this.prepareMeal(MEAL),
                    }
                ],
            }
        };
    },
    mounted() {},
    methods: {
        prepareData(data) {
            return data.map(d => [moment(d.ts).unix(), d.value]);
        },
        prepareMeal(data) {
            return data.map(d => [moment(d.ts).unix(), d.carbs]);
        }
    }
};
</script>

<style scoped>
.overview-chart-container {
    height: 800px;
}
</style>