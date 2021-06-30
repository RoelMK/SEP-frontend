<template>
    <div>
        <div class="clearfix"></div>
        <div class="profile">
            <v-row>
                <v-col cols="12" md="3">
                    <ProfileInfo class="marBot" />
                    <SupervisorSettings />
                </v-col>
                <v-col cols="12" md="5">
                    <GlucoseSettings/>
                </v-col>
                <v-col cols="12" md="4">
                    <UploadData class="marBot" />
                    <EmotionSettings class="marBot" />
                    <FoodSettings class="marBot" />
                    <UnitsSettings />
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import ProfileInfo from "@/components/ProfileInfo.vue";
import UploadData from "@/components/UploadData.vue";
import FoodSettings from "@/components/FoodSettings.vue";
import EmotionSettings from "@/components/EmotionSettings.vue";
import GlucoseSettings from '@/components/GlucoseSettings.vue';
import SupervisorSettings from '@/components/SupervisorSettings.vue';
import UnitsSettings from '@/components/UnitsSettings.vue';
import Auth from "../repositories/Auth";

export default {
    name: "Dashboard",
    components: {
        ProfileInfo,
        UploadData,
        FoodSettings,
        EmotionSettings,
        GlucoseSettings,
        SupervisorSettings,
        UnitsSettings
    },
    created() {
        Auth.getProfile(this.$cookies.get("JWT")).then(
            (resp) => {
                this.$store.commit("SET_USER", resp.data);
            },
            (error) => { console.log(error); }
        );
    }
};
</script>

<style>
.clearfix {
  height: 3vh;
  background-color: #F4FAFD;
}

.profile {
  background-color: #F4FAFD;
  padding: 1% 2% 2% 2%;
  min-height: 93vh;
}

.marBot {
    margin-bottom: 36px;
}
</style>