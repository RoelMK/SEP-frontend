<template>
    <v-container>
        <v-card elevation="0">
            <v-tabs fixed-tabs v-model="tab">
                <v-tab v-for="item in items" :key="item">
                    {{ item }}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <GlucoseStatistics />
                </v-tab-item>
                <v-tab-item>
                    <CumulativeStatistics />
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-container>
</template>

<script>
import GlucoseStatistics from "@/components/GlucoseStatistics.vue";
import CumulativeStatistics from "@/components/CumulativeStatistics.vue";

export default {
    name: "Statistics",
    components: {
        GlucoseStatistics,
        CumulativeStatistics,
    },
    data() {
        return {
            tab: null,
            items: ["glucose", "cumulative"],
        };
    },
};
</script>

<style>
.statistics-container {
    padding-top: 2rem;
}
.statistics-container ul {
    list-style: none;
    padding-left: 0;
}
.statistics-container li {
    font-size: 1rem;
    padding-bottom: 0.8rem;
}
.statistics-container li span {
    font-weight: bold;
}
</style>