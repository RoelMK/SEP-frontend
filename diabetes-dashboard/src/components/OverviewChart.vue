<template>
    <div class="overview-chart-container">
        <v-chart id="overview-chart" :option="options" autoresize />
    </div>
</template>

<script>
import DATA from '../datasets/dummy_data.json';

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
                    trigger: 'axis',
                },
                axisPointer: {
                    link: {
                        xAxisIndex: 'all'
                    },
                },
                dataZoom: {
                    show: true,
                    xAxisIndex: [0, 1, 2, 3, 4],
                },
                grid: [
                    {
                        top: '8%',
                        bottom: '55%',
                        right: '2%',
                        left: '6%',
                    },
                    {
                        top: '45%',
                        bottom: 0,
                        right: '2%',
                        left: '6%',
                        height: '12%',
                    },
                    {
                        top: '57%',
                        bottom: 0,
                        right: '2%',
                        left: '6%',
                        height: '12%',
                    },
                    {
                        top: '69%',
                        bottom: 0,
                        right: '2%',
                        left: '6%',
                        height: '12%',
                    },
                    {
                        top: '81%',
                        bottom: 0,
                        right: '2%',
                        left: '6%',
                        height: '12%'
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
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: false
                        },
                        splitArea: {
                            show: true
                        },
                    },
                    {
                        show: true,
                        gridIndex: 2,
                        type: "time",
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: false
                        },
                        splitArea: {
                            show: true
                        },
                    },
                    {
                        show: true,
                        gridIndex: 3,
                        type: "time",
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: false
                        },
                        splitArea: {
                            show: true
                        },
                    },
                    {
                        show: true,
                        gridIndex: 4,
                        type: "time",
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: false
                        },
                        splitArea: {
                            show: true
                        },
                    },
                ],
                yAxis: [
                    {
                        gridIndex: 0,
                        name: 'Glucose',
                        nameTextStyle: {
                            fontSize: 14,
                            padding: [0, 0, 35, 0],
                        },
                        nameLocation: 'center',
                        nameGap: 5,
                        type: "value",
                        boundaryGap: [0, "100%"],
                    },
                    {
                        gridIndex: 1,
                        name: 'Insulin',
                        nameTextStyle: {
                            fontSize: 14,
                            padding: [0, 0, 35, 0],
                        },
                        nameLocation: 'center',
                        nameGap: 5,
                        type: "value",
                        splitLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        boundaryGap: [0, "100%"],
                    },
                    {
                        gridIndex: 2,
                        name: 'Carbs',
                        nameTextStyle: {
                            fontSize: 14,
                            padding: [0, 0, 35, 0],
                        },
                        nameLocation: 'center',
                        nameGap: 5,
                        type: "value",
                        splitLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        boundaryGap: [0, "100%"],
                    },
                    {
                        gridIndex: 3,
                        name: 'Exercises',
                        nameTextStyle: {
                            fontSize: 14,
                            padding: [0, 0, 35, 0],
                        },
                        nameLocation: 'center',
                        nameGap: 5,
                        type: "value",
                        splitLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        boundaryGap: [0, "100%"],
                    },
                    {
                        gridIndex: 4,
                        name: 'Emotions',
                        nameTextStyle: {
                            fontSize: 14,
                            padding: [0, 0, 35, 0],
                        },
                        nameLocation: 'center',
                        nameGap: 5,
                        type: "value",
                        splitLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
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
                        data: this.prepareGlucose(DATA),
                    },
                    {
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        name: "Insulin",
                        type: "bar",
                        data: this.prepareInsulin(DATA),
                    },
                    {
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        name: "Meal",
                        type: "bar",
                        data: this.prepareMeal(DATA),
                    },
                    {
                        xAxisIndex: 3,
                        yAxisIndex: 3,
                        name: "Exercises",
                        type: "line",
                        data: this.prepareExercies(DATA),
                    },
                    {
                        xAxisIndex: 4,
                        yAxisIndex: 4,
                        name: "Meal",
                        type: "bar",
                        data: this.prepareMeal(DATA),
                    }
                ],
            }
        };
    },
    mounted() {},
    methods: {
        prepareGlucose(data) {
            return data.map(d => [d.ts, d.value]);
        },
        prepareInsulin(data) {
            return data.map(d => [d.ts, d.insulin]);
        },
        prepareMeal(data) {
            return data.map(d => [d.ts, d.carbs]);
        },
        prepareExercies(data) {
            return data.map(d => [d.ts, d.intensity]);
        }
    }
};
</script>

<style scoped>
.overview-chart-container {
    height: 700px;
}
</style>