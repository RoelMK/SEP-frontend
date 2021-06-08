<template>
    <div>
        <Navbar class="header"></Navbar>
        <div class="clearfix"></div>
        <div class="profile">
            <v-row>
                <v-col cols="12" md="3">
                    <ProfileInfo />
                    <br/><br/>
                    <SupervisorSettings />
                </v-col>
                <v-col cols="12" md="5">
                    <GlucoseSettings/>
                </v-col>
                <v-col cols="12" md="4">
                    <UploadData />
                    <br/><br/>
                    <EmotionSettings />
                    <br/><br/>
                    <FoodSettings />
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import ProfileInfo from "./profileComponents/ProfileInfo";
import UploadData from "./profileComponents/UploadData";
import FoodSettings from "./profileComponents/FoodSettings";
import EmotionSettings from "./profileComponents/EmotionSettings";
import GlucoseSettings from './profileComponents/GlucoseSettings';
import SupervisorSettings from './profileComponents/SupervisorSettings';
import Navbar from '@/components/Navbar.vue';

export default {
    name: "Dashboard",
    components: {
        ProfileInfo,
        UploadData,
        FoodSettings,
        EmotionSettings,
        GlucoseSettings,
        SupervisorSettings,
        Navbar
    },
};
</script>

<style>
.clearfix {
  height: 3vh;
  background-color: #F4FAFD;
}

.card {
  padding: 20px;
  background-color: white;
}

.profile {
  background-color: #F4FAFD;
  padding: 1% 2% 2% 2%;
  min-height: 93vh;
}

.full-height {
  height: 100%;
}
</style>