<template>
    <v-chart
        ref="overview"
        v-on:datazoom="$emit('propchanged', [$event.start, $event.end])"
        :option="options(data)"
        autoresize
    />
</template>

<script>
import grid from "@/components/configurations/grid.js";
import xAxis from "@/components/configurations/xAxis.js";
import yAxis from "@/components/configurations/yAxis.js";
import visualMap from "@/components/configurations/visualMap.js";
import legend from "@/components/configurations/legend.js";
import { mapState } from "vuex";
import moment from "moment";

export default {
    name: "overviewChart",
    watch: {
        // Check if data was filtered
        // In case it was filtered use filteredData object
        // Otherwise use data object
        filteredData: function(newValue, oldValue) {
            if (newValue !== oldValue) {
                setTimeout(() => {
                    this.$refs.overview.setOption(this.options(newValue));
                }, 500);
            } else {
                this.$refs.overview.setOption(this.options(this.data));
            }
        },
        // Check if time frame was selected in the table in the
        // History view
        newTimeFrame: function (value) {
            if (value !== null) {
                var newOptions = this.$refs.overview.getOption();
                for (var i = 0; i <= grid.length - 1; i++) {
                    newOptions.xAxis[i]["min"] = value.start;
                    newOptions.xAxis[i]["max"] = value.end;
                }
                this.$refs.overview.setOption(newOptions);
            }
        },
    },
    computed: {
        ...mapState(["filteredData", "data", "newTimeFrame"]),
    },
    methods: {
        /**
         * Scale value to a certain range
         * @param  { number }           value Value to be scaled
         * @param  { Array<number> }    from Original range of the value
         * @param  { Array<number> }    to Resulting range after scaling
         * @return { number }
         */
        scaleValue(value, from, to) {
            var scale = (to[1] - to[0]) / (from[1] - from[0]);
            var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
            return ~~(capped * scale + to[0]);
        },
        /**
         * Set up provided data to eCharts format
         * @param  { any }              data Data object
         * @param  { string }           model property inside data object to iterate through
         * @param  { Array<string> }    properties Properties to be extracted from data
         * @return { Array<Array<any>> }
         */
        prepareData(data, model, ...properties) {
            return data[model].map((d) => properties.map((prop) => d[prop]));
        },
        /**
         * Create tooltip body
         * @param  { string }   marker marker HTML
         * @param  { string }   name   name of item label
         * @param  { number }   value  value of item label
         * @return { string }
         */
        createTooltipBody(marker, name, value) {
            return `
                <div style="min-width: 150px">
                    ${marker}
                    <span>${name}</span>
                    <span class="float-right font-weight-bold">
                    ${value}</span>
                </div>`;
        },
        /**
         * Set up received data in eCharts format
         * @param  { any }   params Chart object parameters
         * @return { string }
         */
        prepareTooltip(params) {
            var tooltip = `<span class="mb-3">
                ${params[0].axisValueLabel}</span>`;
            for (let param of params) {
                var name = param.seriesName;
                var value = param.value.length > 3
                    ? param.value[3]
                    : param.value.length > 2 ? param.value[2] : param.value[1];
                var color =
                    typeof param.borderColor === "undefined"
                        ? param.color
                        : param.borderColor;
                var marker = param.marker.replace(/#.{3,};/i, `${color};`);
                var axisValue = param.axisValue;
                if (value !== null) {
                    if (axisValue === params[0].axisValue) {
                        if (typeof value === 'object') {
                            for (let prop of param.value.slice(2)) {
                                var propType = prop.type.toLowerCase();
                                var classes = this.$store.state
                                    .valueToEmotion[propType][prop.value];
                                tooltip += this.createTooltipBody(
                                    marker,
                                    prop.type,
                                    `<i class="${classes}"></i>`
                                );
                            }
                        } else {
                            tooltip += this.createTooltipBody(
                                marker, name, value);
                        }
                    }
                }
            }
            return tooltip;
        },
        /**
         * Create custom eCharts shape to represent interval
         * to display duration of the activity
         * @param  { any }   params Chart object parameters
         * @param  { any }   api    Chart object instance
         * @return { any }
         */
        renderInterval(params, api) {
            var start = api.coord([api.value(0), api.value(1)]);
            var endDate = moment(api.value(0))
                .add(api.value(4), 'seconds')
                .format("YYYY-MM-DDTHH:MM");
            var end = api.coord([endDate, api.value(1)]);

            return {
                type: "group",
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
                            stroke: api.visual("color"),
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
                        style: api.visual(),
                    },
                ],
            };
        },
        /**
         * Create dummy points in the glucose data to align
         * axis pointer in the overview visualization
         * @param  { any }          glucose Glucose data
         * @param  { Array<any> }   data Array containing other data models,
         * for example, insulin, exercise, carbs
         * @return { any }
         */
        alignGluconeData(glucose, ...data) {
            var glucoseTimestamps = glucose.map(d => d[0]);
            for (let d in data) {
                const dataTimestamps = data[d].map(f => f[0]);
                if (dataTimestamps.length <= 0) continue;
                for (let t in dataTimestamps) {
                    if (!glucoseTimestamps.includes(dataTimestamps[t])) {
                        var dummy = new Array(glucose[0].length).fill(null);
                        dummy[0] = dataTimestamps[t];
                        glucose.push(dummy);
                    }
                }
            }
            return glucose;
        },
        /**
         * Convert string to float
         * @param  { string }   str string that is going to be converted to float
         * @return { number }
         */
        parseRangeString(str) {
            return str.match(/\d+\.?\d+/gi).map(d => parseFloat(d));
        },
        /**
         * Create tooltip entry from data value and append provided units
         * @param  { string }   str string that is going to be converted to float
         * @param  { number }   idx index of the data value used in eCharts format
         * @param  { string }   units units which are going to be appended to data value
         * @return { string }
         */
        addUnits(data, idx, units) {
            for (let d in data) {
                const value = data[d][idx];
                if (value !== null)
                    data[d].push(`${value} ${units}`);
            }
            return data;
        },
        /**
         * Find min and max timestamps in the data object
         * @param  { any }   data Data object containing all models, e.t.c. insulin, glucose, ...
         * @return { Array<number> }
         */
        findMinMax(data) {
            var timestamps = [];
            for (let prop in data) {
                for (let idx in data[prop]) {
                    try {
                        timestamps.push(data[prop][idx].timestamp);
                    } catch {
                        continue;
                    }
                }
            }
            return [
                Math.min.apply(null, timestamps),
                Math.max.apply(null, timestamps)
            ];
        },
        /**
         * Creates options object which is used to generate eCharts object
         * @param  { any }   data data object
         * @return { any }
         */
        options(data) {
            const arr = data['glucose'];
            // Check whether fetched data contains glucose property
            // Otherwise return empty object
            if (typeof arr !== 'undefined') {
                var minMax = [null, null];
                const mood = this.prepareData(
                    data,
                    'mood',
                    'timestamp',
                    'valence',
                    'arousal'
                ).map(d => {
                    if (d[1] === null || d[2] === null)
                        return [d[0], null];
                    return [
                        d[0],
                        (d[1] + d[2]) / 2,
                        { type: "Valence", value: d[1] },
                        { type: "Arousal", value: d[2] }
                    ];
                });
                const insulin = this.prepareData(
                    data,
                    'insulin',
                    'timestamp',
                    'insulinAmount'
                );
                const carbs = this.prepareData(
                    data,
                    'food',
                    'timestamp',
                    'carbohydrates',
                    'glycemic_index'
                ).map(i => {
                    if (i[2] === null) i[2] = 200;
                    return i;
                });
                const exercise = this.prepareData(
                    data,
                    'exercise',
                    'timestamp',
                    'calories',
                    'duration'
                ).map(d => {
                    if (d[1] === null)
                        return [d[0], null];
                    return [
                        d[0],
                        this.scaleValue(d[1], [1, 5], [0, 200]),
                        d[1],
                        d[1],
                        d[2]
                    ];
                });

                // Check whether there are glucose entries in fetched data
                if (arr.length > 0) {
                    minMax = this.findMinMax(data);
                    this.$emit('minmaxchanged', minMax);
                    var glucose = this.prepareData(
                        data,
                        'glucose',
                        'timestamp',
                        'glucoseLevel'
                    );
                    glucose = this.alignGluconeData(
                        glucose,
                        mood,
                        insulin,
                        carbs,
                        exercise
                    );
                }
                // User settings provided in the profile view
                // to color different glucose conditions
                const ranges = (localStorage.getItem('normalRange') === null)
                    ? null
                    : {
                        veryLowValue: this.parseRangeString(
                            localStorage.getItem('veryLowValue')
                        ),
                        lowRange: this.parseRangeString(
                            localStorage.getItem('lowRange')
                        ),
                        normalRange: this.parseRangeString(
                            localStorage.getItem('normalRange')
                        ),
                        highRange: this.parseRangeString(
                            localStorage.getItem('highRange')
                        ),
                        veryHighValue: this.parseRangeString(
                            localStorage.getItem('veryHighValue')
                        )
                    };
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
                                icon: 'path://M3.8,33.4 M47,18.9h9.8V8.7 M56.3,20.1 C52.1,9,40.5,0.6,26.8,2.1C12.6,3.7,1.6,16.2,2.1,30.6 M13,41.1H3.1v10.2 M3.7,39.9c4.2,11.1,15.8,19.5,29.5,18 c14.2-1.6,25.2-14.1,24.7-28.5',
                                onclick: () => {
                                    this.$store.commit(
                                        'UPDATE_FILTERED_DATA',
                                        []
                                    );
                                    this.$refs.overview.dispatchAction({
                                        type: 'dataZoom',
                                        start: 0,
                                        end: 100,
                                    });
                                    this.$refs.overview.setOption(
                                        this.options(this.data)
                                    );
                                }
                            },
                            myFilter: {
                                title: 'Add filters',
                                icon: 'path://M12 12V19.88C12.04 20.18 11.94 20.5 11.71 20.71C11.32 21.1 10.69 21.1 10.3 20.71L8.29 18.7C8.06 18.47 7.96 18.16 8 17.87V12H7.97L2.21 4.62C1.87 4.19 1.95 3.56 2.38 3.22C2.57 3.08 2.78 3 3 3H17C17.22 3 17.43 3.08 17.62 3.22C18.05 3.56 18.13 4.19 17.79 4.62L12.03 12H12M15 17H18V14H20V17H23V19H20V22H18V19H15V17Z',
                                onclick: () => {
                                    this.$store.commit("SHOW_FILTER", {
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
                    dataZoom: [
                        {
                            type: 'slider',
                            show: true,
                            showDetail: true,
                            minValueSpan: 300 * 1000,
                            labelFormatter: function (value) {
                                return moment(value).format('YY-MM-DD HH:mm');
                            },
                            xAxisIndex: [0, 1, 2, 3, 4],
                            left: '8%',
                            right: '8%',
                            bottom: "4%",
                        }
                    ],
                    grid: grid,
                    xAxis: xAxis(...minMax),
                    yAxis: yAxis,
                    visualMap: visualMap(ranges),
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
                            data: this.addUnits(glucose, 1, 'mmol/L')
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
                                borderColor: legend.sections[1]
                                    .properties[0].color,
                            },
                            data: mood
                        },
                        {
                            xAxisIndex: 2,
                            yAxisIndex: 2,
                            name: "Insulin",
                            itemStyle: {
                                color: legend.sections[2].properties[0].color,
                            },
                            barWidth: 5,
                            type: "bar",
                            data: this.addUnits(insulin, 1, 'units')
                        },
                        {
                            xAxisIndex: 3,
                            yAxisIndex: 3,
                            name: "Carbs",
                            type: "bar",
                            barWidth: 5,
                            symbol: "none",
                            data: this.addUnits(carbs, 1, 'carbs')
                        },
                        {
                            xAxisIndex: 4,
                            yAxisIndex: 4,
                            name: 'Burnt Calories',
                            type: 'custom',
                            itemStyle: {
                                color: legend.sections[4].properties[1].color,
                                borderWidth: 2,
                            },
                            data: exercise,
                            renderItem: this.renderInterval
                        },
                    ],
                };
            } else {
                return {};
            }
        },
    },
};
</script>