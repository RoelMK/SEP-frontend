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
        /**
         * Creates options object which is used to generate eCharts object
         * @param  { any }   data data object
         * @return { any }
         */
        options(data) {
            var encode = {
                x: 0,
                y: 1,
                tooltip: [2, 3]
            };
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
                    data: ['Distribution'],
                },
                yAxis: {
                    show: false,
                    type: 'value'
                },
                // For each series entry we calculate time distribution for
                // glucose level condition
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
                            `${this.computeTimeDistribution(data)[0][1]} hours`
                        ]],
                        encode: encode
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
                            `${this.computeTimeDistribution(data)[1][1]} hours`
                        ]],
                        encode: encode
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
                            `${this.computeTimeDistribution(data)[2][1]} hours`
                        ]],
                        encode: encode
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
                            `${this.computeTimeDistribution(data)[3][1]} hours`
                        ]],
                        encode: encode
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
                            `${this.computeTimeDistribution(data)[4][1]} hours`
                        ]],
                        encode: encode
                    }
                ],
            };
        },
        /**
         * Computes time distribution of glucose data
         * @param  { any }              data data object
         * @return { Array<Array<number>> }
         */
        computeTimeDistribution(data) {
            const total = data['glucose']
                .filter(f => f.glucoseLevel !== null).length;
            var [vLow, low, normal, high, vHigh] = [[], [], [], [], []];

            for (let i = 0; i < data['glucose'].length - 2; i++) {
                var i1 = data['glucose'][i];
                var i2 = data['glucose'][i + 1];

                // Check whether current and next point are within
                // specified interval in order to calculate total
                // time for specific condition
                if (0 < i1.glucoseLevel && i1.glucoseLevel < 2.9)
                    vLow.push(moment.duration(
                        moment(i1.timestamp)
                            .diff(moment(i2.timestamp))).asHours()
                    );
                else if (3.0 < i1.glucoseLevel && i1.glucoseLevel < 3.8)
                    low.push(moment.duration(
                        moment(i1.timestamp)
                            .diff(moment(i2.timestamp))).asHours()
                    );
                else if (3.9 < i1.glucoseLevel && i1.glucoseLevel < 10.0)
                    normal.push(moment.duration(
                        moment(i1.timestamp)
                            .diff(moment(i2.timestamp))).asHours()
                    );
                else if (10.1 < i1.glucoseLevel && i1.glucoseLevel < 13.9)
                    high.push(moment.duration(
                        moment(i1.timestamp)
                            .diff(moment(i2.timestamp))).asHours()
                    );
                else if (14 < i1.glucoseLevel)
                    vHigh.push(moment.duration(
                        moment(i1.timestamp)
                            .diff(moment(i2.timestamp))).asHours()
                    );
            }

            // Round number to 2 decimal places
            const round = function(value) {
                return Math.round(value * 100) / 100;
            };

            // Sum elements within array
            const sumArray = function(arr) {
                if (arr.length > 0)
                    return arr.reduce((a, b) => a + b);
                return 0;
            };

            // Calculate percentage of time distribution
            const calcPercentage = function(arr, total) {
                return Math.round((arr.length / total) * 10000) / 100;
            };

            // Output array containing array tuples with [percentage, hours]
            return [
                [calcPercentage(vLow, total), round(sumArray(vLow))],
                [calcPercentage(low, total), round(sumArray(low))],
                [calcPercentage(normal, total), round(sumArray(normal))],
                [calcPercentage(high, total), round(sumArray(high))],
                [calcPercentage(vHigh, total), round(sumArray(vHigh))]
            ];
        },
    }
};
</script>