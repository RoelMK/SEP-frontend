<template>
    <div>
        <h4 class="center">Modify Emotion Settings:</h4>
        <hr />
        <v-row class="center">
            <v-col class="center">
                Do you want to be asked about your emotional status?
            </v-col>
            <v-col class="center">
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
.center {
  justify-content: center;
  align-items: center;
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>