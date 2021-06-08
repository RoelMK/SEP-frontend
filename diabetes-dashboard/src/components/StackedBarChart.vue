<template>
    <v-chart :option="options" />
</template>

<script>
import legend from '@/components/configurations/legend.js';

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
                    data: ['Very High', 'High', 'Normal', 'Low', 'Very Low']
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
                            color: legend.sections[0].properties[0].color
                        },
                        data: [10]
                    },
                    {
                        name: 'Low',
                        type: 'bar',
                        stack: 'init',
                        barWidth: 50,
                        itemStyle: {
                            color: legend.sections[0].properties[1].color
                        },
                        data: [10]
                    },
                    {
                        name: 'Normal',
                        type: 'bar',
                        stack: 'init',
                        barWidth: 50,
                        itemStyle: {
                            color: legend.sections[0].properties[2].color
                        },
                        data: [60]
                    },
                    {
                        name: 'High',
                        type: 'bar',
                        stack: 'init',
                        barWidth: 50,
                        itemStyle: {
                            color: legend.sections[0].properties[3].color
                        },
                        data: [10]
                    },
                    {
                        name: 'Very High',
                        type: 'bar',
                        stack: 'init',
                        barWidth: 50,
                        itemStyle: {
                            color: legend.sections[0].properties[4].color
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