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
                    formatter: function(params) {
                        var tooltip = '<div style="margin: 0px 0 0;">'
                            + '<div style="color:#666; margin-bottom: 10px;">'
                            + params[0].axisValueLabel + '</div>';
                        params.forEach(({ marker, seriesName, value }) => {
                            if (value[1] !== null) {
                                var val = value[1];
                                if (seriesName === 'Emotions') {
                                    marker = marker.replace(
                                        'background-color:#fff;',
                                        'background-color:#91cc75;'
                                    );
                                } else if (seriesName === 'Exercises') {
                                    marker = marker.replace(
                                        'background-color:#fff;',
                                        'background-color:#0c4271;'
                                    );
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
                },
                axisPointer: {
                    link: {
                        xAxisIndex: 'all'
                    },
                },
                dataZoom: {
                    show: true,
                    showDetail: false,
                    xAxisIndex: [0, 1, 2, 3],
                    bottom: '3%',
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
                        height: '15%',
                    },
                    {
                        top: '60%',
                        bottom: 0,
                        right: '2%',
                        left: '6%',
                        height: '15%',
                    },
                    {
                        top: '75%',
                        bottom: 0,
                        right: '2%',
                        left: '6%',
                        height: '15%',
                    },
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
                        name: 'Events',
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
                        gridIndex: 3,
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
                        data: this.prepareData(DATA, 'ts', 'value'),
                    },
                    {
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        name: "Emotions",
                        type: "scatter",
                        symbolSize: 20,
                        label: {
                            show: true,
                            formatter: 'M'
                        },
                        itemStyle: {
                            color: '#fff',
                            borderWidth: 1,
                            borderColor: '#91cc75'
                        },
                        data: this.prepareData(
                            DATA,
                            'ts',
                            'valence',
                            'arousal'
                        ).map(d => {
                            if (d[1] === null || d[2] === null)
                                return [d[0], null];
                            return [
                                d[0],
                                this.normalizeData((d[1] + d[2]) / 2, 5, 0)
                            ];
                        }),
                    },
                    {
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        name: "Exercises",
                        type: "scatter",
                        symbolSize: 20,
                        label: {
                            show: true,
                            formatter: 'E'
                        },
                        itemStyle: {
                            color: '#fff',
                            borderWidth: 1,
                            borderColor: '#0c4271',
                        },
                        data: this.prepareData(DATA, 'ts', 'intensity')
                            .map(d => {
                                if (d[1] === null)
                                    return [d[0], null];
                                return [d[0], this.normalizeData(d[1], 5, 0)];
                            }),
                    },
                    {
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        name: "Insulin",
                        itemStyle: {
                            color: '#ce97b0',
                        },
                        type: "bar",
                        data: this.prepareData(DATA, 'ts', 'insulin'),
                    },
                    {
                        xAxisIndex: 3,
                        yAxisIndex: 3,
                        name: "Carbs",
                        type: "scatter",
                        data: this.prepareData(DATA, 'ts', 'carbs', 'type'),
                        symbolSize: 14,
                        itemStyle: {
                            color: function({ data }) {
                                var type = data[2];
                                switch (type) {
                                case 'Breakfast':
                                    return '#de8971';
                                case 'Lunch':
                                    return '#7b6079';
                                case 'Snack':
                                    return '#a7d0cd';
                                case 'Dinner':
                                    return '#867ae9';
                                default:
                                    return null;
                                }
                            }
                        }
                    },
                ],
            }
        };
    },
    mounted() {},
    methods: {
        prepareData(data, ...properties) {
            return data.map(d => properties.map(prop => d[prop]));
        },
        normalizeData(val, max, min) {
            return (val - min) / (max - min);
        }
    }
};
</script>

<style scoped>
.overview-chart-container {
    height: 700px;
}
</style>