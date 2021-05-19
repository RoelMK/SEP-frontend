<template>
    <v-container class="line">
        <v-row class="filter-tools">
            <v-col id="filter-options" cols="8">
                <span v-on:click="updateChart(180)">3H</span>
                <span v-on:click="updateChart(60)">1H</span>
                <span v-on:click="updateChart(5)">5M</span>
                <span v-on:click="resetZoom()">Reset</span>
            </v-col>
            <v-col id="date-filter" cols="4">
                <v-menu v-model="show" :close-on-content-click="false" offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on">
                            <v-icon medium>mdi-calendar</v-icon>
                            <p>{{ title }}</p>
                        </div>
                    </template>
                    <div class="menu-content">
                        <vc-date-picker v-model="range" mode="dateTime"
                                        is-range
                                        is-expanded
                                        is24hr
                                        is-required
                        />
                        <div class="filter-buttons">
                            <v-btn medium tile depressed v-on:click="updateChart(null, range)">
                                Apply
                            </v-btn>
                            <v-btn medium tile plain v-on:click="show = !show">Cancel</v-btn>
                        </div>
                    </div>
                </v-menu>
            </v-col>
        </v-row>
        <canvas id="line-chart"></canvas>
    </v-container>
</template>

<script>
import Chart from 'chart.js/auto';
import pluginZoom from 'chartjs-plugin-zoom';
import pluginAnnotation from 'chartjs-plugin-annotation';
import moment from 'moment';

import 'chartjs-adapter-moment';

Chart.register(pluginAnnotation);
Chart.register(pluginZoom);

export default {
    name: 'lineChart',
    props: {
        'data': {
            type: Object,
            default: null
        },
        'selectedActivity': {
            type: Object,
            default: null
        }
    },
    watch: {
        data: {
            deep: true,
            handler(newValue) {
                const chart = window.lineChart;
                chart.data = newValue;
                chart.update();
                this.title = this.updateTitle(chart);
            }
        },
        selectedActivity: {
            deep: true,
            immediate:true,
            handler: function() {
                if(this.selectedActivity.activity !== null){
                    let activity = this.selectedActivity.activity;
                    let start = moment(activity.date+" "+activity.startTime);
                    let end = moment(activity.date+" "+activity.endTime);
                    this.updateGraph(this.chart, { start, end }, null);
                }
            }
        }
    },
    data() {
        return {
            title: null,
            range: {
                start: null,
                end: null,
            },
            show: false,
            options: {
                type: 'line',
                data: this.data,
                options: {
                    responsive: true,
                    lineTension: 0.4,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                minUnit: 'minute',
                            }
                        },
                        y: {
                            min: 0,
                            max: 20,
                            ticks: {
                                stepSize: 0.1
                            }
                        }
                    },
                    plugins: {
                        zoom: {
                            pan: {
                                enabled: false,
                                mode: "x",
                                modifierKey: "shift",
                                onPanStart: this.setInteractionArea,
                                onPanComplete: this.filterSelectedArea
                            },
                            zoom: {
                                enabled: true,
                                drag: true,
                                mode: "x",
                                onZoomStart: this.setInteractionArea,
                                onZoomComplete: this.filterSelectedArea
                            },
                        },
                        filler: {
                            propagate: false,
                        },
                    },
                    interaction: {
                        intersect: false,
                    }
                }
            }
        };
    },
    mounted() {
        // Create chart
        const ctx = document.getElementById('line-chart');
        window.lineChart = new Chart(ctx, this.options);

        this.title = this.updateTitle(window.lineChart);
    },

    methods: {
        /**
         * Update chart's title
         * @param  { int }       minutes Pre-defined interval in minutes
         * @param  { Object }    filter  Date/time interval
         * @return
         */
        updateChart(minutes, filter = null) {
            let range = { start: null, end: null };
            if (minutes) {
                range.start = moment().subtract(minutes, 'minutes');
                range.end = moment();
            } else {
                range.start = moment(filter.start);
                range.end = moment(filter.end);
            }

            if (range.start && range.end) {
                this.$emit('filtered', range);
                this.title = this.updateTitle(window.lineChart);
                return;
            }

            return;
        },
        /**
         * Update chart's title
         * @param  { Object }       chart Chart object
         * @return { string }
         */
        updateTitle(chart) {
            let x = chart.scales.x;
            let startDate = moment(x.min).format("DD/MM/YYYY HH:mm:ss");
            let endDate = moment(x.max).format("DD/MM/YYYY HH:mm:ss");
            return `${startDate} - ${endDate}`;
        },
        /**
         * Reset chart's zoom
         */
        resetZoom() {
            let chart = window.lineChart;
            chart.resetZoom();
            this.title = this.updateTitle(chart);
        },
        /**
         * Sets the padding for interaction area
         * @param  { Object }   { chart, point } Object containing chart
         * object and current mouse point
         * @return { boolean }
         */
        setInteractionArea({ chart, point }) {
            const area = chart.chartArea;
            const h = area.height * 0.01;
            if (point.y < area.top + h)
                return false;
        },
        /**
         * Return selected labels for further filtering. Should be modified in the future
         * @param  { Object }       chart Chart object
         * @return
         */
        /**
         * Update graph for input data
         * @param  { Object }       chart Chart object
         * @param  { Object }       data Data object to be visualized in the chart
         * @return
         */
        displayChartX(chart, data){
            chart.data.datasets = data;
            // reset time interval:
            // chart.options.scales.x.min = moment().subtract(5, 'minutes').valueOf();
            // chart.options.scales.x.max = moment().valueOf();

            //keep current time interval:
            chart.options.scales.x.min = moment(chart.scales.x.min);
            chart.options.scales.x.max = moment(chart.scales.x.max);

            chart.update();

            // Set title
            let x = chart.scales.x;
            let startDate = moment(x.min).format("DD/MM/YYYY HH:mm:ss");
            let endDate = moment(x.max).format("DD/MM/YYYY HH:mm:ss");
            this.title = `${startDate} - ${endDate}`;
        },
        filterSelectedArea(chart) {
            this.title = this.updateTitle(chart);
        }
    }
};
</script>

<style scoped>
.filterTools {
    font-size: .9rem
}

.v-menu__content {
    margin-top: .8rem;
}

.filter-buttons {
    background-color: #fff;
    border-left: 1px solid #cbd5e0;
    border-right: 1px solid #cbd5e0;
    border-bottom: 1px solid #cbd5e0;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    text-align: start;
}

.filter-buttons button {
    margin: .6rem;
}

.menu-content .vc-container {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: none;
}

#date-filter div {
    display: flex;
}

#date-filter i {
    font-size: 1.3rem;
    padding-right: .4rem;
}

#filter-options {
    text-align: start;
}

#filter-options span {
    padding: 0 .2rem;
}

#filter-options span:hover {
    text-decoration: underline;
    cursor: pointer;
}

#filter-options span:nth-child(4) {
    border-left: 1px solid rgba(0, 0, 0, .35);
    font-weight: bold;
}

.v-menu__content {
    box-shadow: none;
}
</style>