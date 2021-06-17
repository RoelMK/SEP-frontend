<template>
    <v-card flat>
        <v-card-text class="statistics-container">
            <ul>
                <li>
                    A1C Est. <i class="text-caption">(last 3 months)</i>:
                    <span>{{ a1c }} {{ unitBG }}</span>
                </li>
                <li>
                    A1C Goal <i class="text-caption">(last 3 months)</i>:
                    <span>{{ a1cGoal }} {{ unitBG }}</span>
                </li>
                <li>
                    Long Insulin:
                    <span>{{ cumLongInsulin }} mg</span>
                </li>
                <li>
                    Short Insulin:
                    <span>{{ cumShortInsulin }} mg</span>
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
                    Calories Goal <i class="text-caption">(daily)</i>:
                    <span>{{ consumedCaloriesGoal }} kcal</span>
                </li>
                <li>
                    Burnt Calories:
                    <span>{{ cumBurntCarbs }} kcal</span>
                </li>
                <li>
                    Burnt Calories Goal <i class="text-caption">(daily)</i>:
                    <span>{{ burntCaloriesGoal }} kcal</span>
                </li>
                <li>
                    Steps:
                    <span>{{ cumSteps }}</span>
                </li>
                <li>
                    Average Glucose:
                    <span>{{ average() }} bpm</span>
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
        filteredData: function (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.cumulativeData = newValue;
            } else {
                this.cumulativeData = this.data;
            }
        },
    },
    data() {
        return {
            cumulativeData: [],
            cumLongInsulin: 0,
            cumShortInsulin: 0,
            cumCarbs: 0,
            cumConsumedCarbs: 0,
            cumBurntCarbs: 0,
            cumSteps: 0,
            avgHeartbeat: 0,
            a1c: 0,
            a1cGoal: 0,
            consumedCaloriesGoal: 0,
            burntCaloriesGoal: 0,
            unitBG: "mmol/L",
        };
    },
    methods: {
        totalCalories() {
            if(!this.cumulativeData.food) return 0;
            let totalCalories = 0;
            this.cumulativeData.food.forEach((element) => {
                totalCalories += element.calories ? element.calories : 0;
            });
            return totalCalories;
        },
        totalCarbs() {
            if(!this.cumulativeData.food) return 0;
            let totalCarbs = 0;
            this.cumulativeData.food.forEach((element) => {
                totalCarbs += element.carbohydrates ? element.carbohydrates : 0;
            });
            return totalCarbs;
        },
        average() {
            if(!this.cumulativeData.glucose) return 0;
            let estimate = 0;
            let count = this.cumulativeData.glucose.length;
            this.cumulativeData.glucose.forEach((element) => {
                estimate += element.glucoseLevel ? element.glucoseLevel : 0;
            });
            return estimate / count;
        },
        a1cCompute() {
            if(!this.cumulativeData.glucose) return 0;
            const a1cStart = moment().subtract(3, 'months');
            console.log(a1cStart);
            let estimate = 0;
            let count = this.cumulativeData.glucose.length;
            this.cumulativeData.glucose.forEach((element) => {
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

<style>
</style>