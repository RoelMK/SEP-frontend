<template>
    <v-chart ref="stacked" :option="options(data)" />
</template>

<script>
import legend from '@/components/configurations/legend.js';
import { mapState } from 'vuex';
import moment from 'moment';

export default {
    name: "stackedBarChart",
    watch: {
        filteredData: function(value) {
            if (value.length <= 0) {
                this.$refs.stacked.setOption(this.options(this.data));
            }
            else {
                this.$refs.stacked.setOption(this.options(value));
            }
        },
    },
    computed: {
        ...mapState(['filteredData', 'data']),
    },
    methods: {
        options(data) {
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
                    data: ['Very High', 'High', 'Normal', 'Low', 'Very Low']
                },
                xAxis: {
                    type: 'category',
                    show: false,
                    data: ['Time Distribution'],
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
                        data: [[
                            0,
                            this.computeTimeDistribution(data)[0][0],
                            `${this.computeTimeDistribution(data)[0][0]}%`,
                            `${this.computeTimeDistribution(data)[0][1]} min`
                        ]],
                        encode: {
                            x: 0,
                            y: 1,
                            tooltip: [2, 3]
                        },
                    },
                    {
                        name: 'Low',
                        type: 'bar',
                        stack: 'init',
                        barWidth: 50,
                        itemStyle: {
                            color: legend.sections[0].properties[1].color
                        },
                        data: [[
                            0,
                            this.computeTimeDistribution(data)[1][0],
                            `${this.computeTimeDistribution(data)[1][0]}%`,
                            `${this.computeTimeDistribution(data)[1][1]} min`
                        ]],
                        encode: {
                            x: 0,
                            y: 1,
                            tooltip: [2, 3]
                        },
                    },
                    {
                        name: 'Normal',
                        type: 'bar',
                        stack: 'init',
                        barWidth: 50,
                        itemStyle: {
                            color: legend.sections[0].properties[2].color,
                        },
                        data: [[
                            0,
                            this.computeTimeDistribution(data)[2][0],
                            `${this.computeTimeDistribution(data)[2][0]}%`,
                            `${this.computeTimeDistribution(data)[2][1]} min`
                        ]],
                        encode: {
                            x: 0,
                            y: 1,
                            tooltip: [2, 3]
                        },
                    },
                    {
                        name: 'High',
                        type: 'bar',
                        stack: 'init',
                        barWidth: 50,
                        itemStyle: {
                            color: legend.sections[0].properties[3].color
                        },
                        data: [[
                            0,
                            this.computeTimeDistribution(data)[3][0],
                            `${this.computeTimeDistribution(data)[3][0]}%`,
                            `${this.computeTimeDistribution(data)[3][1]} min`
                        ]],
                        encode: {
                            x: 0,
                            y: 1,
                            tooltip: [2, 3]
                        },
                    },
                    {
                        name: 'Very High',
                        type: 'bar',
                        stack: 'init',
                        barWidth: 50,
                        itemStyle: {
                            color: legend.sections[0].properties[4].color
                        },
                        data: [[
                            0,
                            this.computeTimeDistribution(data)[4][0],
                            `${this.computeTimeDistribution(data)[4][0]}%`,
                            `${this.computeTimeDistribution(data)[4][1]} min`
                        ]],
                        encode: {
                            x: 0,
                            y: 1,
                            tooltip: [2, 3]
                        },
                    }
                ],
            };
        },
        computeTimeDistribution(data) {
            const total = data
                .filter(f => f.glucoseLevel !== null).length;
            var [vLow, low, normal, high, vHigh] = [[], [], [], [], []];

            for (let i = 0; i < data.length - 2; i++) {
                var i1 = data[i];
                var i2 = data[i + 1];

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
                return Math.round((arr.length / total) * 10000) / 100;
            };
            return [
                [calcPercentage(vLow, total), toHours(sumArray(vLow))],
                [calcPercentage(low, total), toHours(sumArray(low))],
                [calcPercentage(normal, total), toHours(sumArray(normal))],
                [calcPercentage(high, total), toHours(sumArray(high))],
                [calcPercentage(vHigh, total), toHours(sumArray(vHigh))]
            ];
        },
    }
};
</script>

<style scoped></style>