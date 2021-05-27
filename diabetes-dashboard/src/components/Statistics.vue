<template>
    <v-container>
        <v-card elevation="0">
            <v-tabs v-model="tab">
                <v-tab v-for="item in items" :key="item">
                    {{ item }}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <BloodGlucoseStatistics />
                </v-tab-item>
                <v-tab-item>
                    <OtherStatistics />
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-container>
</template>

<script>
import BloodGlucoseStatistics from "@/components/BloodGlucoseStatistics.vue";
import OtherStatistics from "@/components/OtherStatistics.vue";

export default {
    name: "Statistics",
    components: {
        BloodGlucoseStatistics,
        OtherStatistics,
    },
    data() {
        return {
            tab: null,
            items: ["blood glucose", "other"],
        };
    },
};
</script>

<style>
</style>