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
    name: "CumulativeStatistics",
    watch: {
        filteredData: function (value) {
            if (this.filteredData > 0) {
                this.cumulativeData = value;
            } else {
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
    data() {
        return {
            cumulativeData: [],
            unitBG: "mmol/L"
        };
    },
    methods: {
        getStartEnd(){
            const start = this.minMax[0]
                + (this.minMax[1] - this.minMax[0]) * this.proportions[0] /100;
            const end = this.minMax[0]
                + (this.minMax[1] - this.minMax[0]) * this.proportions[1] /100;
            return [start, end];
        },
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
};
</script>

<style></style>
