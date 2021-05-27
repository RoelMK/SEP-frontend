<template>
    <v-container>
        <p>Average BG: {{ avgBG }} {{ unitBG }}</p>
        <p>Jitter in BG: {{ jitterBG }} {{ unitBG }}</p>
        <p>Max BG: {{ minBG }} {{ unitBG }}</p>
        <p>Min BG: {{ maxBG }} {{ unitBG }}</p>
    </v-container>
</template>

<script>
export default {
    name: "BGStatistics",
    data() {
        return {
            avgBG: 0,
            jitterBG: 0,
            minBG: 0,
            maxBG: 0,
            unitBG: "mmol/L",
        };
    },
};
</script>

<style>
</style>