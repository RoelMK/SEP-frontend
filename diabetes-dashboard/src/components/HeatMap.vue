<template>
    <v-container class="heatmap">
        <canvas id="heatmap"></canvas>
    </v-container>
</template>

<script>
import Chart from "chart.js/auto";
import moment from 'moment';
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";

Chart.register(MatrixController, MatrixElement);

const TEST_DATA = [
    2070,3493,1000,750,2070,2000,4500,2070,3493,1000,750,2070,
    2000,4500,349,988,3043,3400,5000,120,6304,876,5000,120,6304,
    500,1020,634,8706,5020,1207
];
const TEST_LABELS = [
    moment("2020-12-31"),moment("2021-01-01"),moment("2021-01-02"),
    moment("2021-01-03"),moment("2021-01-04"),moment("2021-01-05"),
    moment("2021-01-06"),moment("2021-01-07"),moment("2021-01-08"),
    moment("2021-01-09"),moment("2021-01-10"),moment("2021-01-11"),
    moment("2021-01-12"),moment("2021-01-13"),moment("2021-01-14"),
    moment("2021-01-15"),moment("2021-01-16"),moment("2021-01-17"),
    moment("2021-01-18"),moment("2021-01-19"),moment("2021-01-20"),
    moment("2021-01-21"),moment("2021-01-22"),moment("2021-01-23"),
    moment("2021-01-24"),moment("2021-01-25"),moment("2021-01-26"),
    moment("2021-01-27"),moment("2021-01-28"),moment("2021-01-29"),
    moment("2021-01-30")
];

export default {
    name: "heatMap",
    props: {
        'data': {
            type: Object,
            default: null
        }
    },
    mounted() {
        const heatmapContext = document.getElementById('heatmap');
        new Chart(heatmapContext, this.options);
    },
    data() {
        return {
            options: {
                type: 'matrix',
                data: {
                    datasets: [
                        {
                            data: this.prepareData(TEST_DATA, TEST_LABELS),
                            backgroundColor: 'rgba(71, 183,132,.5)',
                            borderColor: 'rgba(54,73,93,.5)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(71, 183,132,.8)',
                            hoverBorderColor: 'rgba(54,73,93,.8)',
                            width(c) {
                                const a = c.chart.chartArea || {};
                                const nt = c.chart.scales.x.ticks.length;
                                return (a.right - a.left) / nt;
                            },
                            height(c) {
                                const a = c.chart.chartArea || {};
                                const nt = c.chart.scales.y.ticks.length;
                                return (a.bottom - a.top) / nt;
                            },
                        }
                    ]
                },
                options: {
                    responsive: false,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            displayColors: false,
                            callbacks: {
                                title() {
                                    return '';
                                },
                                label(context) {
                                    const v = context.dataset
                                        .data[context.dataIndex];
                                    return [
                                        'd: ' + v.d, 'v: ' + v.v.toFixed(2)
                                    ];
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            type: 'time',
                            position: 'top',
                            offset: true,
                            isoWeekDay: 1,
                            time: {
                                unit: 'day',
                                parser: 'd',
                                displayFormats: {
                                    day: 'dd'
                                }
                            },
                            reverse: true,
                            grid: {
                                display: false,
                                drawBorder: false,
                                tickMarkLength: 0
                            }
                        },
                        y: {
                            type: 'time',
                            left: 'left',
                            offset: true,
                            time: {
                                unit: 'week',
                                round: 'week',
                                isoWeekDay: 1,
                                displayFormats: {
                                    week: 'w'
                                }
                            },
                            ticks: {
                                maxRotation: 0,
                                autoSkip: true,
                                padding: 1
                            },
                            grid: {
                                display: false,
                                drawBorder: false,
                                tickMarkLength: 0
                            },
                            title: {
                                display: false
                            }
                        }
                    }
                }
            },
        };
    },
    methods: {
        prepareData(entries, labels) {
            var arr = [];
            for (let i = 0; i < entries.length; i++) {
                arr.push({
                    x: String(labels[i].day() + 1),
                    y: labels[i].format("YYYY-MM-DD"),
                    d: labels[i].format("YYYY-MM-DD"),
                    v: entries[i]
                });
            }
            return arr;
        }
    },
};
</script>
