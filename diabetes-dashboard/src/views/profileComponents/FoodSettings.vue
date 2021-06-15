<template>
    <v-card>
        <v-row class="mx-2">
            <v-col cols="12" class="gTitle">Food Settings</v-col>
        </v-row>
        <v-row class="mx-2">
            <v-col cols="12" md="6" class="customCol">
                <v-text class="fSize14">Consumed Calories Goal</v-text>
                <v-text-field value="1800"/>
            </v-col>
            <v-col cols="12" md="6" class="customCol">
                <v-text class="fSize14">Burned Calories Goal</v-text>
                <v-text-field value="2000"/>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    name: "FoodSettings",
    data() {
        return {
            goalConsumedCalories: '',
            goalBurntCalories: '',
        };
    },
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

.customCol {
    display: flex;
    flex-direction: column;
}

/* .button {
  background-color: #008cba;
  border-radius: 12px;
  padding: 6px 18px;
  color: white;
} */
</style>