<template>
    <v-card flat>
        <v-card-text class="statistics-container">
            <ul v-if="data['glucose'].length > 0 || filteredData['glucose'].length > 0">
                <li>
                    A1C Est. <i class="text-caption">(last 3 months)</i>:
                    <span>{{ a1cCompute().toFixed(2) }} {{ unitBG }}</span>
                </li>
                <li>
                    Long Insulin:
                    <span>{{ totalInsulin(1) }} mg</span>
                </li>
                <li>
                    Short Insulin:
                    <span>{{ totalInsulin(0) }} mg</span>
                </li>
                <li>
                    Carbs:
                    <span>{{ totalCarbs() }} g</span>
                </li>
                <li>
                    Calories:
                    <span>{{ totalCalories() }} kcal</span>
                </li>
                <li>
                    Burnt Calories:
                    <span>{{ totalBurntCalories() }} kcal</span>
                </li>
                <li>
                    Average Glucose:
                    <span>{{ averageGlucose().toFixed(2) }} {{ unitBG }}</span>
                </li>
                <li>
                    Min Glucose:
                    <span>{{ minGlucose() }} {{ unitBG }}</span>
                </li>
                <li>
                    Max Glucose:
                    <span>{{ maxGlucose() }} {{ unitBG }}</span>
                </li>
            </ul>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
    // name component
    name: "CumulativeStatistics",
    watch: {
        // Check whether data was filtered
        // Use filteredData if that is the case
        // Otherwise use data object
        filteredData: function (value) {
            // if filteredData has contents
            if (this.filteredData > 0) {
                // update cumulativeData using it
                this.cumulativeData = value;
            } else {
                // otherwise update cumulativeData using data
                this.cumulativeData = this.data;
            }
        },
    },
    props: {
        proportions: {
            type: Array,
            default: null
        },
        minMax: {
            type: Array,
            default: null
        },
    },
    computed: {
        ...mapState(["filteredData", "data"]),
    },
    created() {
        if (this.filteredData > 0) {
            this.cumulativeData = this.filteredData;
        } else {
            this.cumulativeData = this.data;
        }
    },
    data() {
        return {
            cumulativeData: [],
            unitBG: "mmol/L"
        };
    },
    methods: {
        /**
         * Get start and end timestamps to filter statistics
         * @return { Array<number> }
         */
        getStartEnd(){
            const start = this.minMax[0]
                + (this.minMax[1] - this.minMax[0]) * this.proportions[0] /100;
            const end = this.minMax[0]
                + (this.minMax[1] - this.minMax[0]) * this.proportions[1] /100;
            return [start, end];
        },
        /**
         * Calculate total calories within selected range
         * @return { number }
         */
        totalCalories() {
            if (!this.cumulativeData.food) return 0;
            this.getStartEnd();
            let totalCalories = 0;
            var localData = JSON.parse(JSON.stringify(this.cumulativeData));
            var datetime = this.getStartEnd();
            localData.food.filter(f => {
                return f.timestamp<= datetime[1] && f.timestamp >= datetime[0];
            }).forEach((element) => {
                totalCalories += element.calories ? element.calories : 0;
            });
            return totalCalories;
        },
        /**
         * Calculate total carbohydrates within selected range
         * @return { number }
         */
        totalCarbs() {
            if (!this.cumulativeData.food) return 0;
            let totalCarbs = 0;
            var localData = JSON.parse(JSON.stringify(this.cumulativeData));
            var datetime = this.getStartEnd();
            localData.food.filter(f => {
                return f.timestamp <= datetime[1] &&f.timestamp >= datetime[0];
            }).forEach((element) => {
                totalCarbs += element.carbohydrates ? element.carbohydrates : 0;
            });
            return totalCarbs;
        },
        /**
         * Calculate total insulin within selected range
         * @param { number }    insulinType Type of insulin that is going to be calculated
         * @return { number }
         */
        totalInsulin(insulinType) {
            if (!this.cumulativeData.insulin) return 0;
            let totalInsulin = 0;
            var localData = JSON.parse(JSON.stringify(this.cumulativeData));
            var datetime = this.getStartEnd();
            localData.insulin.filter(f => {
                return f.timestamp <= datetime[1] &&f.timestamp >= datetime[0];
            }).forEach((element) => {
                totalInsulin
                    += element.insulinType == insulinType
                        ? element.insulinAmount
                        : 0;
            });
            return totalInsulin;
        },
        /**
         * Calculate total calories within selected range
         * @return { number }
         */
        totalBurntCalories() {
            if (!this.cumulativeData.activities) return 0;
            let totalBurnt = 0;
            var localData = JSON.parse(JSON.stringify(this.cumulativeData));
            var datetime = this.getStartEnd();
            localData.exercise.filter(f => {
                return f.timestamp <= datetime[1] &&f.timestamp >= datetime[0];
            }).forEach((element) => {
                totalBurnt += element.calories;
            });
            return totalBurnt;
        },
        /**
         * Calculate average glucose within selected range
         * @return { number }
         */
        averageGlucose() {
            if (!this.cumulativeData.glucose) return 0;
            let total = 0;
            let count = this.cumulativeData.glucose.length;
            var localData = JSON.parse(JSON.stringify(this.cumulativeData));
            var datetime = this.getStartEnd();
            localData.glucose.filter(f => {
                return f.timestamp <= datetime[1] &&f.timestamp >= datetime[0];
            }).forEach((element) => {
                total += element.glucoseLevel ? element.glucoseLevel : 0;
            });
            return total / count;
        },
        /**
         * Calculate max glucose value within selected range
         * @return { number }
         */
        maxGlucose() {
            // check for existence
            if (!this.cumulativeData.glucose) return 0;
            // calculate max
            let max = 0;
            var localData = JSON.parse(JSON.stringify(this.cumulativeData));
            var datetime = this.getStartEnd();
            localData.glucose.filter(f => {
                return f.timestamp <= datetime[1] &&f.timestamp >= datetime[0];
            }).forEach((element) => {
                max = element.glucoseLevel > max ? element.glucoseLevel : max;
            });
            return max;
        },
        /**
         * Calculate min glucose value within selected range
         * @return { number }
         */
        minGlucose() {
            // check for existence and length
            if (!this.cumulativeData.glucose || this.cumulativeData.length == 0)
                return 0;
            //calculate min
            let min = this.cumulativeData.glucose[0].glucoseLevel;
            var localData = JSON.parse(JSON.stringify(this.cumulativeData));
            var datetime = this.getStartEnd();
            localData.glucose.filter(f => {
                return f.timestamp <= datetime[1] &&f.timestamp >= datetime[0];
            }).forEach((element) => {
                min = element.glucoseLevel < min ? element.glucoseLevel : min;
            });
            return min;
        },
        /**
         * Calculate A1C. If selected range is less than 3 months
         * use all glucose values. Otherwise use only last 3 months
         * @return { number }
         */
        a1cCompute() {
            if (!this.cumulativeData.glucose) return 0;
            // in 13 digits
            const a1cStart = moment().subtract(3, "months").unix() * 1000;
            const dataA1C = this.cumulativeData.glucose.filter(function (
                element
            ) {
                return element.timestamp >= a1cStart;
            });
            if (!dataA1C) return 0;
            let estimate = 0;
            let count = dataA1C.length;
            dataA1C.forEach((element) => {
                estimate += element.glucoseLevel ? element.glucoseLevel : 0;
            });
            return estimate / count;
        },
    }
};
</script>

<style></style>
