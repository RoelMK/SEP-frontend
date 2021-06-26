<template>
    <v-card>
        <v-row class="mx-2">
            <v-col cols="12" class="gTitle">Emotion Settings</v-col>
        </v-row>
        <v-row class="mx-2" align="center">
            <v-col cols="9" class="fSize14">
                Remind me about my emotional status?
            </v-col>
            <v-col cols="3" class="my-0 py-0">
                <v-switch v-model="boolAsk"></v-switch>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    name: "EmotionSettings",
    data() {
        return {
            boolAsk: true,
        };
    },
    created() {
        // Set reminder options upon rendering the component
        let val = true;
        if (localStorage.getItem("emotionReminder") != null) {
            val = localStorage.getItem("emotionReminder") == "true";
            if (val == "true") {
                this.boolAsk = true;
            } else {
                this.boolAsk = false;
            }
        }
    },
    watch: {
        // Watch toggler for changes and save them in the local storage
        boolAsk: function() {
            localStorage.setItem("emotionReminder", this.boolAsk);
        }
    }
};
</script>

<style>
.gTitle {
    font-size: 15px;
    font-weight: bold;
}

.fSize14 {
    font-size: 14px
}
</style>