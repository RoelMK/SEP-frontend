<template>
    <v-chart id="stacked-bar-chart" :option="options" />
</template>

<script>
export default {
    name: "stackedBarChart",
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
                    trigger: 'item',
                },
                grid: {
                    height: 200,
                    width: '20%',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: '10%',
                },
                legend: {
                    orient: 'vertical',
                    selectedMode: false,
                    top: '25%',
                    left: '35%',
                },
                xAxis: {
                    type: 'category',
                    show: false,
                    data: ['Glucose Time Distribution'],
                },
                yAxis: {
                    show: false,
                    type: 'value'
                },
                series: [
                    {
                        name: 'Very Low',
                        type: 'bar',
                        stack: 'init',
                        barWidth: 50,
                        itemStyle: {
                            color: '#A63A50'
                        },
                        data: [10]
                    },
                    {
                        name: 'Low',
                        type: 'bar',
                        stack: 'init',
                        barWidth: 5,
                        itemStyle: {
                            color: '#C3423F'
                        },
                        data: [10]
                    },
                    {
                        name: 'Normal',
                        type: 'bar',
                        stack: 'init',
                        barWidth: 5,
                        itemStyle: {
                            color: '#6CAE75'
                        },
                        data: [60]
                    },
                    {
                        name: 'High',
                        type: 'bar',
                        stack: 'init',
                        barWidth: 5,
                        itemStyle: {
                            color: '#FFD046'
                        },
                        data: [10]
                    },
                    {
                        name: 'Very High',
                        type: 'bar',
                        stack: 'init',
                        barWidth: 5,
                        itemStyle: {
                            color: '#F3A712'
                        },
                        data: [10]
                    }
                ],
            },
        };
    },
};
</script>

<style scoped></style>