<template>
    <v-container class="line">
        <v-row class="filter-tools">
            <v-col id="filter-options" cols="4">
                <span v-on:click="updateGraph(null, '3h')">3H</span>
                <span v-on:click="updateGraph(null, '1h')">1H</span>
                <span v-on:click="updateGraph(null, '5m')">5M</span>
                <span>Intervals</span>
            </v-col>
            <v-col id="filter-options" cols="4">
                <span v-on:click="$emit('displayDoughnut', false)">Show Carbs |</span>
                <span v-on:click="$emit('displayDoughnut', true)">Show Glucose and Iron</span>
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

                        <vc-date-picker v-model="range" mode="dateTime" is-range  is-expanded is24hr is-required />
                        <div class="filter-buttons">
                            <v-btn medium tile depressed v-on:click="updateGraph(range, null)">Apply</v-btn>
                            <v-btn medium tile plain v-on:click="show = !show">Cancel</v-btn>
                        </div>
                    </div>
                </v-menu>
            </v-col>
        </v-row>
        <canvas id="lineChart"></canvas>
    </v-container>
</template>

<script>
import Chart from 'chart.js/auto';
import pluginZoom from 'chartjs-plugin-zoom';
import moment from 'moment';

import 'chartjs-adapter-moment';

Chart.register(pluginZoom);

export default {
    name: 'lineChart',
    props: {
        'data': Object,
        'selectedActivity': Object,
    },
    watch: {
        data: {
            deep: true,
            handler(newData) {
                if (newData === null) {
                    this.$emit("noDataDialog", true);
                } else {
                    this.displayNewData(newData);
                }
            }
        },
        selectedActivity: {
            deep: true,
            immediate:true,
            handler(newActivity) {
                if(newActivity.activity !== null){
                    let activity = newActivity.activity;
                    let start = moment(activity.date+" "+activity.startTime);
                    let end = moment(activity.date+" "+activity.endTime);
                    this.updateGraph({ start, end }, null);
                }
            }
        }
    },
    data() {
        return {
            title: null,
            chart: null,
            range: {
                start: null,
                end: null,
            },
            show: false,
            options: {
                type: 'line',
                data: { labels:this.data.labels, datasets: this.data.datasets.slice(0,2) },
                options: {
                    responsive: true,
                    lineTension: 0.4,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                minUnit: 'minute',
                            },
                            max: moment().valueOf(),
                            min: moment().subtract(5, 'minutes').valueOf()
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
                                enabled: true,
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
        }
    },
    mounted() {
        // Create chart
        const ctx = document.getElementById('lineChart');
        window.chart = new Chart(ctx, this.options);

        // Set title
        let x = window.chart.scales.x;
        let startDate = moment(x.min).format("DD/MM/YYYY HH:mm:ss");
        let endDate = moment(x.max).format("DD/MM/YYYY HH:mm:ss");
        this.title = `${startDate} - ${endDate}`;
    },

    methods: {
        /**
         * Update graph after filtering
         * @param  { Object }       range Range object containing start and end date/time
         * @param  { string }       preset Preset value used for the filtering
         * @return { boolean }
         */
        updateGraph(range, preset = null) {
            // If preset set filter accoring to the respective value
            if (preset) {
                range = { end: moment() };
                if (preset === '5m') {
                    range.start = moment().subtract(5, 'minutes');
                } else if (preset === '1h') {
                    range.start = moment().subtract(1, 'hours');
                } else if (preset === '3h') {
                    range.start = moment().subtract(3, 'hours');
                } else {
                    return false;
                }
            }

            // Check if both start and end date/time set
            if (range.start === null || range.end === null)
                return false;

            let startDate = moment(range.start);
            let endDate = moment(range.end);

            window.chart.options.scales.x.min = endDate.valueOf();
            window.chart.options.scales.x.max = startDate.valueOf();

            window.chart.update();

            this.title = `${startDate.format("DD/MM/YYYY HH:mm:ss")} - ${endDate.format("DD/MM/YYYY HH:mm:ss")}`;
            this.show = false;
            this.range = {
                start: null,
                end: null
            };

            return true;
        },
        /**
         * Sets the padding for interaction area
         * @param  { Object }       { chart, point } Object containing chart object and current mouse point
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
        filterSelectedArea(chart) {
            // Example of how we can retrieve labels in a graph after zooming
            let x = chart.scales.x;
            let startDate = moment(x.min).format("DD/MM/YYYY HH:mm:ss")
            let endDate = moment(x.max).format("DD/MM/YYYY HH:mm:ss")
            this.title = `${startDate} - ${endDate}`
        },
        /**
         * Update graph for input data
         * @param  { Object }       data Data object to be visualized in the chart
         * @return
         */
        displayNewData(data){
            window.chart.data = data;
            // reset time interval:
            // window.chart.options.scales.x.min = moment().subtract(5, 'minutes').valueOf();
            // window.chart.options.scales.x.max = moment().valueOf();
            
            //keep current time interval when switching data (without this it does not show anything):
            window.chart.options.scales.x.min = moment(window.chart.scales.x.min);
            window.chart.options.scales.x.max = moment(window.chart.scales.x.max);

            window.chart.update();

            // Set title
            let x = window.chart.scales.x;
            let startDate = moment(x.min).format("DD/MM/YYYY HH:mm:ss");
            let endDate = moment(x.max).format("DD/MM/YYYY HH:mm:ss");
            this.title = `${startDate} - ${endDate}`;
        }
    },
    beforeDestroy() {
        // Destroy chart object before leaving the view
        if (window.chart) window.chart.destroy();
    },
}
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
    text-decoration: none;
    cursor: auto;
}

.v-menu__content {
    box-shadow: none;
}
</style>