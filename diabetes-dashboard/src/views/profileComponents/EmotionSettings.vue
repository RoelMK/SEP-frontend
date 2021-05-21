<template>
    <div>
        <h4 class="">Modify Emotion Settings:</h4>
        <v-row class="">
            <v-col cols="9">
                Do you want to be asked about your emotional status?
            </v-col>
            <v-col cols="3">
                <v-switch v-model="boolAsk"></v-switch>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: "EmotionSettings",
    data() {
        return {
            boolAsk: true,
        };
    },
};
</script>

<style>
</style>