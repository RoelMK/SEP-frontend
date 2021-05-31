<template>
    <v-card flat>
        <v-card-text class="statistics-container">
            <ul>
                <li>
                    Average BG:
                    <span>{{ avgBG }} {{ unitBG }}</span>
                </li>
                <li>
                    Jitter in BG:
                    <span>{{ jitterBG }} {{ unitBG }}</span>
                </li>
                <li>
                    Max BG:
                    <span>{{ maxBG }} {{ unitBG }}</span>
                </li>
                <li>
                    Min BG:
                    <span>{{ minBG }} {{ unitBG }}</span>
                </li>
            </ul>
        </v-card-text>
    </v-card>
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