<template>
    <v-app>
        <div class="main">
            <v-row class="col">
                <v-col class="col" cols="12" md="6">
                    <v-container>
                        <div class="col1"><ProfileInfo /></div>
                    </v-container>
                </v-col>
                <v-col class="col" cols="12" md="6">
                    <v-container>
                        <div class="col1"><GlucoseSettings /></div>
                    </v-container>
                </v-col>
            </v-row>
            <v-row class="col">
                <v-col class="col" cols="12" md="6">
                    <v-container>
                        <div class="col1"><EmotionSettings /></div>
                    </v-container>
                </v-col>
                <v-col class="col" cols="12" md="6">
                    <v-container>
                        <div class="col1"><FoodSettings /></div>
                    </v-container>
                </v-col>
            </v-row>
        </div>
    </v-app>
</template>

<script>
import ProfileInfo from "./profileComponents/ProfileInfo";
import GlucoseSettings from "./profileComponents/GlucoseSettings";
import EmotionSettings from "./profileComponents/EmotionSettings";
import FoodSettings from "./profileComponents/FoodSettings";

export default {
    name: "Dashboard",
    components: {
        ProfileInfo,
        GlucoseSettings,
        EmotionSettings,
        FoodSettings,
    },
};
</script>

<style>
.col {
  justify-content: center;
  align-items: center;
  display: flex;
}
.col1 {
  border-radius: 20px;
  left: 3%;
  right: 3%;
  background-color: white;
}
.main {
  background-color: #f2f2f2;
  padding: 0 2% 0 2%;
}
</style>