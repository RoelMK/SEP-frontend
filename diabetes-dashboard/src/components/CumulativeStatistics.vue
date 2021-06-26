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
        // watch filteredData for changes
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
    data() {
        return {
            cumulativeData: [],
            // declare unit
            unitBG: "mmol/L",
        };
    },
    methods: {
        // method to compute total calories
        totalCalories() {
            if (!this.cumulativeData.food) return 0;
            let totalCalories = 0;
            this.cumulativeData.food.forEach((element) => {
                totalCalories += element.calories ? element.calories : 0;
            });
            return totalCalories;
        },
        // method to compute total carbs
        totalCarbs() {
            if (!this.cumulativeData.food) return 0;
            let totalCarbs = 0;
            this.cumulativeData.food.forEach((element) => {
                totalCarbs += element.carbohydrates ? element.carbohydrates : 0;
            });
            return totalCarbs;
        },
        // method to compute total inulin based on type
        totalInsulin(insulinType) {
            if (!this.cumulativeData.insulin) return 0;
            let totalInsulin = 0;
            this.cumulativeData.insulin.forEach((element) => {
                totalInsulin += element.insulinType == insulinType ? 1 : 0;
            });
            return totalInsulin;
        },
        // method to compute total burnt calories
        totalBurntCalories() {
            if (!this.cumulativeData.activities) return 0;
            let totalBurnt = 0;
            this.cumulativeData.activities.forEach((element) => {
                totalBurnt += element.calories;
            });
            return totalBurnt;
        },
        // method to compute average glucose
        averageGlucose() {
            if (!this.cumulativeData.glucose) return 0;
            let total = 0;
            let count = this.cumulativeData.glucose.length;
            this.cumulativeData.glucose.forEach((element) => {
                total += element.glucoseLevel ? element.glucoseLevel : 0;
            });
            return total / count;
        },
        // method to compute max glucose
        maxGlucose() {
            // check for existence
            if (!this.cumulativeData.glucose) return 0;
            // calculate max
            let max = 0;
            this.cumulativeData.glucose.forEach((element) => {
                max = element.glucoseLevel > max ? element.glucoseLevel : max;
            });
            return max;
        },
        // method to compute min glucose
        minGlucose() {
            // check for existence and length
            if (!this.cumulativeData.glucose || this.cumulativeData.length == 0)
                return 0;

            //calculate min
            let min = this.cumulativeData.glucose[0].glucoseLevel;
            this.cumulativeData.glucose.forEach((element) => {
                min = element.glucoseLevel < min ? element.glucoseLevel : min;
            });
            return min;
        },
        // method to compute A1C estimate
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
        // get "filteredData", "data" from store state
        ...mapState(["filteredData", "data"]),
    },
    created() {
        // update cumulativeData based on data from the store state
        // if filteredData has contents use that to update cumulativeData
        if (this.filteredData > 0) {
            this.cumulativeData = this.filteredData;
        } else {
            // otherwise use data
            this.cumulativeData = this.data;
        }
    },
};
</script>

<style></style>
