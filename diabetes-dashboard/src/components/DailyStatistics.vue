<template>
    <v-card flat>
        <v-card-text class="statistics-container">
            <ul>
                <li>
                    Daily Average Glucose:
                    <span>{{ dailyAvgGlucose }} {{ unitBG }}</span>
                </li>
                <li>
                    Daily Long Insulin Intake:
                    <span>{{ dailyLongInsulin }} mg</span>
                </li>
                <li>
                    Daily Short Insulin Intake:
                    <span>{{ dailyShortInsulin }} mg</span>
                </li>
                <li>
                    A1C Estimate:
                    <span>{{ a1c }} {{ unitBG }}</span>
                </li>
                <li>
                    A1C Goal:
                    <span>{{ a1cGoal }} {{ unitBG }}</span>
                </li>
                <li>
                    Daily Consumed Calories:
                    <span>{{ dailyConsumedCalories }} kcal</span>
                </li>
                <li>
                    Consumed Calories Goal:
                    <span>{{ consumedCaloriesGoal }} kcal</span>
                </li>
                <li>
                    Daily Carbs:
                    <span>{{ dailyCarbs }} g</span>
                </li>
                <li>
                    Daily Burnt Calories:
                    <span>{{ dailyBurntCalories }} kcal</span>
                </li>
                <li>
                    Burnt Calories Goal:
                    <span>{{ burntCaloriesGoal }} kcal</span>
                </li>
                <li>
                    Daily Steps:
                    <span>{{ dailySteps }}</span>
                </li>
                <li>
                    Daily Average Heartbeat:
                    <span>{{ dailyHeartbeat }} bpm</span>
                </li>
            </ul>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "DailyStatistics",
    data() {
        return {
            dailyAvgGlucose: 0,
            dailyLongInsulin: 0,
            dailyShortInsulin: 0,
            a1c: 0,
            a1cGoal: 0,
            dailyConsumedCalories: 0,
            consumedCaloriesGoal: 0,
            dailyCarbs: 0,
            dailyBurntCalories: 0,
            burntCaloriesGoal: 0,
            unitBG: "mmol/L",
            dailySteps: 0,
            dailyHeartbeat: 0,
        };
    },
};
</script>

<style>
</style>