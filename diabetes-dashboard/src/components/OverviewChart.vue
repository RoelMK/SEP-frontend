<template>
    <v-chart id="overview-chart" :option="options" autoresize />
</template>

<script>
import grid from '@/components/configurations/grid.js';
import xAxis from '@/components/configurations/xAxis.js';
import yAxis from '@/components/configurations/yAxis.js';
import visualMap from '@/components/configurations/visualMap.js';
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
                    trigger: 'axis',
                    formatter: this.prepareTooltip
                },
                axisPointer: {
                    link: {
                        xAxisIndex: 'all'
                    },
                },
                dataZoom: {
                    show: true,
                    showDetail: false,
                    xAxisIndex: [0, 1, 2, 3, 4],
                    bottom: '4%',
                },
                grid: grid,
                xAxis: xAxis,
                yAxis: yAxis,
                visualMap: visualMap,
                series: [
                    {
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        name: 'Glucose',
                        type: 'line',
                        symbol: 'none',
                        areaStyle: {
                            show: true,
                        },
                        data: this.prepareData(this.data, 'ts', 'value'),
                    },
                    {
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        name: 'Emotions',
                        type: 'scatter',
                        symbolSize: 20,
                        label: {
                            show: true,
                            formatter: 'M'
                        },
                        itemStyle: {
                            color: '#fff',
                            borderWidth: 1,
                            borderColor: '#26c0c0'
                        },
                        data: this.prepareData(
                            this.data,
                            'ts',
                            'valence',
                            'arousal'
                        ).map(d => {
                            if (d[1] === null || d[2] === null)
                                return [d[0], null];
                            return [d[0], (d[1] + d[2]) / 2, d[1], d[2]];
                        }),
                    },
                    {
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        name: 'Insulin',
                        itemStyle: {
                            color: '#a0a7e6',
                        },
                        barWidth: 3,
                        type: 'bar',
                        data: this.prepareData(this.data, 'ts', 'insulin'),
                    },
                    {
                        xAxisIndex: 3,
                        yAxisIndex: 3,
                        name: 'Carbs',
                        type: 'bar',
                        data: this.prepareData(this.data, 'ts', 'carbs', 'gi'),
                        barWidth: 5,
                        connectNulls: true,
                        symbol: 'none',
                        itemStyle: {
                            color: function({ data }) {
                                var index = data[2];
                                if (0 <= index <= 55)
                                    return '#a7d0cd';
                                else if (55 < index <= 69)
                                    return '#de8971';
                                else if (index > 69)
                                    return '#ce97b0';
                                else
                                    return '#ce97b0';
                            }
                        },
                    },
                    {
                        xAxisIndex: 4,
                        yAxisIndex: 4,
                        name: 'Heartbeat',
                        type: 'scatter',
                        itemStyle: {
                            color: '#f2b3c9',
                        },
                        symbolSize: 5,
                        z: 1,
                        data: this.prepareData(this.data, 'ts', 'heartbeat')
                    },
                    {
                        xAxisIndex: 4,
                        yAxisIndex: 4,
                        name: 'Exercises',
                        type: 'custom',
                        data: this.prepareData(
                            this.data, 'ts', 'intensity', 'duration'
                        ).map(d => {
                            if (d[1] === null)
                                return [d[0], null];
                            return [
                                d[0],
                                this.scaleValue(d[1], [1, 5], [0, 200]),
                                d[1]
                            ];
                        }),
                        renderItem: function (param, api) {
                            var point = api.coord(
                                [api.value(0), api.value(1)]
                            );
                            var endDate = moment(api.value(0))
                                .add(api.value(2))
                                .format("YYYY-MM-DDTHH:MM");
                            var end = api.coord([endDate, api.value(1)]);

                            const arr = [
                                {
                                    type: "line",
                                    shape: {
                                        x1: point[0],
                                        x2: end[0],
                                        y1: point[1],
                                        y2: end[1],
                                    },
                                    style: {
                                        fill: null,
                                        stroke: '#4b565b',
                                        lineWidth: 2,
                                    },
                                },
                                {
                                    type: "circle",
                                    shape: {
                                        cx: point[0],
                                        cy: point[1],
                                        r: 2,
                                    },
                                    style: {
                                        fill: null,
                                        stroke: '#4b565b',
                                        lineWidth: 2,
                                    },
                                },
                                {
                                    type: "circle",
                                    shape: {
                                        cx: end[0],
                                        cy: end[1],
                                        r: 2,
                                    },
                                    style: {
                                        fill: null,
                                        stroke: '#0c4271',
                                        lineWidth: 2,
                                    },
                                }
                            ];
                            return {
                                type: 'group',
                                children: arr
                            };
                        },
                    },
                ],
            },
            emotions: {
                valence: {
                    1: '<i class="fas fa-laugh-beam"></i>',
                    2: '<i class="fas fa-smile-beam"></i>',
                    3: '<i class="fas fa-angry"></i>'
                },
                arousal: {
                    1: '<i class="fas fa-grin-stars"></i>',
                    2: '<i class="fas fa-smile-beam"></i>',
                    3: '<i class="fas fa-tired"></i>'
                }
            },
        };
    },
    methods: {
        /**
         * Scale value to a certain range
         * @param  { int }      value Value to be scaled
         * @param  { from }     from Original range of the value
         * @param  { Array }    to Resulting range after scaling
         * @return
         */
        scaleValue(value, from, to) {
            var scale = (to[1] - to[0]) / (from[1] - from[0]);
            var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
            return ~~(capped * scale + to[0]);
        },
        /**
         * Set up received data in eCharts format
         * @param  { Object }   data Data object
         * @param  { Array }    properties Properties to be extracted from data
         * @return
         */
        prepareData(data, ...properties) {
            return data.map(d => properties.map(prop => d[prop]));
        },
        /**
         * Normalize data
         * @param  { Object }   val Value to be normalized
         * @param  { Object }   min Normalization range min
         * @param  { Object }   max Normalization range max
         * @return
         */
        normalizeData(val, max, min) {
            return (val - min) / (max - min);
        },
        /**
         * Set up received data in eCharts format
         * @param  { Object }   params Chart object parameters
         * @return
         */
        prepareTooltip(params) {
            // Set up tooltip container and append label
            var tooltip = '<div style="margin: 0px 0 0;">'
                + '<div style="color:#666; margin-bottom: 10px;">'
                + params[0].axisValueLabel + '</div>';
            // Iterate through tooltip elements and display
            // only those that have value
            params.forEach(({ marker, seriesName, value }) => {
                if (value[1] !== null) {
                    var val = value[1];
                    // Due to custom icon style background color
                    // is set to #fff hence need to set tooltip
                    // color
                    if (seriesName === 'Emotions') {
                        marker = marker.replace(
                            'background-color:#fff;',
                            'background-color:#26c0c0;'
                        );
                        // Set custom label for valence and arousal
                        tooltip += '<div>';
                        tooltip += '<span>' + marker + 'Valence'
                            + '</span><span style="float:right;'
                            + 'font-weight:bold;">'
                            + this.emotions.valence[value[2]] +'</span></div>';
                        val = this.emotions.arousal[value[3]];
                        seriesName = 'Arousal';
                    } else if (seriesName === 'Exercises') {
                        marker = marker.replace(
                            'background-color:#fac858;',
                            'background-color:#4b565b;'
                        );
                        val = value[2];
                    }
                    tooltip += '<div>';
                    tooltip += '<span>' + marker + seriesName
                        + '</span><span style="float:right;'
                        + 'font-weight:bold;">'
                        + val + '</span></div>';
                }
            });
            tooltip += '</div>';
            return tooltip;
        }
    }
};
</script>