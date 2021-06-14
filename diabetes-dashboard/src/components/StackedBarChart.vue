<template>
    <v-chart :option="options" />
</template>

<script>
import legend from '@/components/configurations/legend.js';
import moment from 'moment';

export default {
    name: "stackedBarChart",
    props: {
        data: {
            type: Array,
            default: null
        }
    },
    watch: {
        data: function() {
            this.$refs.overview.setOption(this.options);
        }
    },
    computed: {
        computeTimeDistribution() {
            const total = this.data.length;
            var [vLow, low, normal, high, vHigh] = [[], [], [], [], []];

            for (let i = 0; i < this.data.length - 2; i++) {
                var i1 = this.data[i];
                var i2 = this.data[i + 1];

                if (0 < i1.glucoseLevel && i1.glucoseLevel < 2.9)
                    vLow.push(i2.timestamp - i1.timestamp);
                else if (3.0 < i1.glucoseLevel && i1.glucoseLevel < 3.8)
                    low.push(i2.timestamp - i1.timestamp);
                else if (3.9 < i1.glucoseLevel && i1.glucoseLevel < 10.0)
                    normal.push(i2.timestamp - i1.timestamp);
                else if (10.1 < i1.glucoseLevel && i1.glucoseLevel < 13.9)
                    high.push(i2.timestamp - i1.timestamp);
                else if (14 < i1.glucoseLevel)
                    vHigh.push(i2.timestamp - i1.timestamp);
            }

            const toHours = function(time) {
                var temp = moment.duration(time);
                return temp.hours() + temp.minutes();
            };

            const sumArray = function(arr) {
                if (arr.length > 0)
                    return arr.reduce((a, b) => a + b);
                return 0;
            };

            const calcPercentage = function(arr, total) {
                console.log(arr, total);
                return Math.round((arr.length / total) * 1000) / 100;
            };
            return [
                [calcPercentage(vLow, total), toHours(sumArray(vLow))],
                [calcPercentage(low, total), toHours(sumArray(low))],
                [calcPercentage(normal, total), toHours(sumArray(normal))],
                [calcPercentage(high, total), toHours(sumArray(high))],
                [calcPercentage(vHigh, total), toHours(sumArray(vHigh))]
            ];
        },
        options() {
            return {
                tooltip: {
                    trigger: 'item',
                    position: 'right',
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
                            color: legend.sections[0].properties[0].color
                        },
                        data: [this.computeTimeDistribution[0][0]]
                    },
                    {
                        name: 'Low',
                        type: 'bar',
                        stack: 'init',
                        barWidth: 50,
                        itemStyle: {
                            color: legend.sections[0].properties[1].color
                        },
                        data: [this.computeTimeDistribution[1][0]]
                    },
                    {
                        name: 'Normal',
                        type: 'bar',
                        stack: 'init',
                        barWidth: 50,
                        itemStyle: {
                            color: legend.sections[0].properties[2].color
                        },
                        data: [this.computeTimeDistribution[2][0]]
                    },
                    {
                        name: 'High',
                        type: 'bar',
                        stack: 'init',
                        barWidth: 50,
                        itemStyle: {
                            color: legend.sections[0].properties[3].color
                        },
                        data: [this.computeTimeDistribution[3][0]]
                    },
                    {
                        name: 'Very High',
                        type: 'bar',
                        stack: 'init',
                        barWidth: 50,
                        itemStyle: {
                            color: legend.sections[0].properties[4].color
                        },
                        data: [this.computeTimeDistribution[4][0]]
                    }
                ],
            };
        }
    },
};
</script>

<style scoped></style>