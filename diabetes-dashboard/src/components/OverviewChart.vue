<template>
    <v-chart ref="overview" :option="options(data)" autoresize />
</template>

<script>
import grid from '@/components/configurations/grid.js';
import xAxis from '@/components/configurations/xAxis.js';
import yAxis from '@/components/configurations/yAxis.js';
import visualMap from '@/components/configurations/visualMap.js';
import legend from '@/components/configurations/legend.js';
import { mapState } from 'vuex';
import moment from 'moment';

export default {
    name: 'overviewChart',
    watch: {
        filteredData: function(value) {
            if (value.length <= 0) {
                this.$refs.overview.setOption(this.options(this.data));
            }
            else {
                this.$refs.overview.setOption(this.options(value));
            }
        },
        itemTimeFrame: {
            deep: true,
            handler(newTimeFrame) {
                if (newTimeFrame !== null) {
                    for (var i = 0; i <= 4; i++) {
                        this.options.xAxis[i]["min"] = newTimeFrame.start;
                        this.options.xAxis[i]["max"] = newTimeFrame.end;
                    }
                    this.$refs.overview.setOption(this.options);
                }
            },
        },
    },
    computed: {
        ...mapState(['filteredData', 'data']),
    },
    data() {
        return {
            emotions: {
                Valence: {
                    1: '<i class="fas fa-angry"></i>',
                    2: '<i class="fas fa-smile-beam"></i>',
                    3: '<i class="fas fa-laugh-beam"></i>'
                },
                Arousal: {
                    1: '<i class="fas fa-tired"></i>',
                    2: '<i class="fas fa-smile-beam"></i>',
                    3: '<i class="fas fa-grin-stars"></i>'
                }
            },
        };
    },
    methods: {
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
        },
        options(data) {
            return {
                legend: {
                    show: false,
                },
                toolbox: {
                    top: "1%",
                    right: "2%",
                    feature: {
                        saveAsImage: {
                            title: "Save",
                        },
                        myRestore: {
                            title: 'Reset',
                            icon: 'path://M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z',
                            iconStyle: {
                                color: '#666'
                            },
                            onclick: async () => {
                                this.$store.dispatch(
                                    'setFilteredData',
                                    []
                                );
                            }
                        },
                        myFilter: {
                            title: 'Add filters',
                            icon: 'path://M12 12V19.88C12.04 20.18 11.94 20.5 11.71 20.71C11.32 21.1 10.69 21.1 10.3 20.71L8.29 18.7C8.06 18.47 7.96 18.16 8 17.87V12H7.97L2.21 4.62C1.87 4.19 1.95 3.56 2.38 3.22C2.57 3.08 2.78 3 3 3H17C17.22 3 17.43 3.08 17.62 3.22C18.05 3.56 18.13 4.19 17.79 4.62L12.03 12H12M15 17H18V14H20V17H23V19H20V22H18V19H15V17Z',
                            onclick: () => {
                                this.$store.dispatch("showFilter", {
                                    show: true,
                                });
                            },
                        },
                    },
                },
                tooltip: {
                    trigger: "axis",
                    formatter: this.prepareTooltip,
                },
                axisPointer: {
                    link: {
                        xAxisIndex: "all",
                    },
                },
                dataZoom: {
                    show: true,
                    showDetail: false,
                    xAxisIndex: [0, 1, 2, 3, 4],
                    bottom: "4%",
                },
                grid: grid,
                xAxis: xAxis,
                yAxis: yAxis,
                visualMap: visualMap,
                series: [
                    {
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        name: "Glucose",
                        type: "line",
                        symbol: "none",
                        lineStyle: {
                            width: 3,
                        },
                        areaStyle: {
                            color: "#3F7CAC",
                            opacity: 0.2,
                        },
                        data: this.prepareData(
                            data,
                            'timestamp',
                            'glucoseLevel'
                        ),
                    },
                    {
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        name: "Emotions",
                        type: "scatter",
                        symbolSize: 20,
                        label: {
                            show: true,
                            formatter: "M",
                        },
                        itemStyle: {
                            color: "#fff",
                            borderWidth: 1,
                            borderColor: legend.sections[1].properties[0].color,
                        },
                        data: this.prepareData(
                            data,
                            'timestamp',
                            'valence',
                            'arousal'
                        ).map(d => {
                            if (d[1] === null || d[2] === null)
                                return [d[0], null];
                            return [
                                d[0],
                                (d[1] + d[2]) / 2,
                                {
                                    type: "Valence",
                                    value: d[1],
                                },
                                {
                                    type: "Arousal",
                                    value: d[2],
                                },
                            ];
                        }),
                    },
                    {
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        name: "Insulin",
                        itemStyle: {
                            color: legend.sections[2].properties[0].color,
                        },
                        barWidth: 3,
                        type: "bar",
                        data: this.prepareData(
                            data,
                            'timestamp',
                            'insulinAmount'
                        ),
                    },
                    {
                        xAxisIndex: 3,
                        yAxisIndex: 3,
                        name: "Carbs",
                        type: "bar",
                        barWidth: 5,
                        connectNulls: true,
                        symbol: "none",
                        data: this.prepareData(
                            data,
                            'timestamp',
                            'carbohydrates',
                            'carbohydrates',
                            'glycemic_index'
                        ),
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
                            data,
                            'timestamp',
                            'caloriesBurnt',
                            'duration'
                        ).map(d => {
                            if (d[1] === null)
                                return [d[0], null];
                            return [
                                d[0],
                                this.scaleValue(d[1], [1, 5], [0, 200]),
                                d[1],
                            ];
                        }),
                        renderItem: this.renderInterval,
                    },
                ],
            };
        },
    },
};
</script>