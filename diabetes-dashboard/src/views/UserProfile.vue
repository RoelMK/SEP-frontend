<template>
    <div>
        <Navbar class="header"></Navbar>
        <div class="profile">
            <v-row class="">
                <v-col class="" cols="12" md="6">
                    <v-container>
                        <div class="card"><ProfileInfo /></div>
                    </v-container>
                </v-col>
                <v-col class="" cols="12" md="6">
                    <v-container>
                        <v-card elevation="2" class="card"><UploadData/></v-card>
                    </v-container>
                    <v-container>
                        <div class="card"><EmotionSettings /></div>
                    </v-container>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import ProfileInfo from "./profileComponents/ProfileInfo";
import UploadData from "./profileComponents/UploadData";
import EmotionSettings from "./profileComponents/EmotionSettings";
import Navbar from '@/components/Navbar.vue';

export default {
    name: "Dashboard",
    components: {
        ProfileInfo,
        UploadData,
        EmotionSettings,
        Navbar
    },
};
</script>

<style>
.card {
  padding: 20px;
  background-color: white;
}
.profile {
  background-color: #f2f2f2;
  padding: 0 2% 0 2%;
  min-height: 93vh;
}
</style>