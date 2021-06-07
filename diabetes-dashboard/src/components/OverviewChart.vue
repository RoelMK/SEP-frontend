<template>
    <v-chart :option="options" autoresize />
</template>

<script>
import grid from '@/components/configurations/grid.js';
import xAxis from '@/components/configurations/xAxis.js';
import yAxis from '@/components/configurations/yAxis.js';
import visualMap from '@/components/configurations/visualMap.js';
import legend from '@/components/configurations/legend.js';
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
                legend: {
                    show: false
                },
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
                        lineStyle: {
                            width: 3,
                        },
                        areaStyle: {
                            color: '#3F7CAC',
                            opacity: 0.2,
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
                            borderColor: legend.sections[1].properties[0].color
                        },
                        data: this.prepareData(
                            this.data,
                            'ts',
                            'valence',
                            'arousal'
                        ).map(d => {
                            if (d[1] === null || d[2] === null)
                                return [d[0], null];
                            return [
                                d[0],
                                (d[1] + d[2]) / 2,
                                {
                                    type: 'Valence',
                                    value: d[1]
                                },
                                {
                                    type: 'Arousal',
                                    value: d[2]
                                }
                            ];
                        }),
                    },
                    {
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        name: 'Insulin',
                        itemStyle: {
                            color: legend.sections[2].properties[0].color,
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
                        barWidth: 5,
                        connectNulls: true,
                        symbol: 'none',
                        data: this.prepareData(
                            this.data,
                            'ts',
                            'carbs',
                            'carbs',
                            'gi'
                        ),
                    },
                    {
                        xAxisIndex: 4,
                        yAxisIndex: 4,
                        name: 'Heartbeat',
                        type: 'scatter',
                        itemStyle: {
                            color: legend.sections[4].properties[0].color,
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
                        itemStyle: {
                            color: legend.sections[4].properties[1].color,
                            borderWidth: 2,
                        },
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
                        renderItem:  this.renderInterval,
                    },
                ],
            },
            emotions: {
                Valence: {
                    1: '<i class="fas fa-laugh-beam"></i>',
                    2: '<i class="fas fa-smile-beam"></i>',
                    3: '<i class="fas fa-angry"></i>'
                },
                Arousal: {
                    1: '<i class="fas fa-grin-stars"></i>',
                    2: '<i class="fas fa-smile-beam"></i>',
                    3: '<i class="fas fa-tired"></i>'
                }
            },
        };
    },
    methods: {
        check() {
            this.$refs.hello.dispatchAction({
                type: 'selectDataRange',
                visualMapIndex: 0,
                selected: {
                    0: false,
                    1: false,
                    2: false
                }
            });
        },
        /**
         * Scale value to a certain range
         * @param  { int }      value Value to be scaled
         * @param  { Array }     from Original range of the value
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
         * Create tooltip body
         * @param  { String }   marker marker HTML
         * @param  { String }   name   name of item label
         * @param  { String }   value  value of item label
         * @return
         */
        createTooltipBody(marker, name, value) {
            return `
                <div>
                    ${marker}
                    <span>${name}</span>
                    <span class="float-right font-weight-bold">
                    ${value}</span>
                </div>`;
        },
        /**
         * Set up received data in eCharts format
         * @param  { Object }   params Chart object parameters
         * @return
         */
        prepareTooltip(params) {
            var tooltip = `<span class="mb-3">
                ${params[0].axisValueLabel}</span>`;
            for (let param of params) {
                var name = param.seriesName;
                var value = (param.value.length > 2) ?
                    param.value[2] : param.value[1];
                var color = (typeof param.borderColor === 'undefined') ?
                    param.color : param.borderColor;
                var marker = param.marker.replace(/#.{3,};/i, `${color};`);

                if (value !== null) {
                    if (typeof value === 'object') {
                        for (let prop of param.value.slice(2)) {
                            tooltip += this.createTooltipBody(
                                marker,
                                prop.type,
                                this.emotions[prop.type][prop.value]
                            );
                        }
                    } else {
                        tooltip += this.createTooltipBody(marker, name, value);
                    }
                }
            }
            return tooltip;
        },
        /**
         * Create custom eCharts shape
         * @param  { Object }   params Chart object parameters
         * @param  { Object }   api    Chart object instance
         * @return
         */
        renderInterval(params, api) {
            var start = api.coord(
                [api.value(0), api.value(1)]
            );
            var endDate = moment(api.value(0))
                .add(api.value(2))
                .format("YYYY-MM-DDTHH:MM");
            var end = api.coord([endDate, api.value(1)]);

            return {
                type: 'group',
                children: [
                    {
                        type: "line",
                        shape: {
                            x1: start[0],
                            x2: end[0],
                            y1: start[1],
                            y2: end[1],
                        },
                        style: {
                            stroke: api.visual('color'),
                            lineWidth: 2,
                        },
                    },
                    {
                        type: "circle",
                        shape: {
                            cx: start[0],
                            cy: start[1],
                            r: 2,
                        },
                        style: api.visual(),
                    },
                    {
                        type: "circle",
                        shape: {
                            cx: end[0],
                            cy: end[1],
                            r: 2,
                        },
                        style: api.visual()
                    }
                ]
            };
        }
    }
};
</script>