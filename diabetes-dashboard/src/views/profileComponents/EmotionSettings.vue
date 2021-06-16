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
            boolAsk: false,
        };
    },
    created() {
        let val = localStorage.getItem("emotionReminder");
        console.log("value: " + val);
        if (val == "true") {
            this.boolAsk = true;
        } else {
            this.boolAsk = false;
        }
    },
    watch: {
        boolAsk: function() {
            console.log(this.boolAsk);
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