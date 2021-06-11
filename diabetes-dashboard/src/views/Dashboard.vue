<template>
    <div id="dashboard">
        <Navbar class="header"></Navbar>
        <div class="clearfix"></div>
        <div class="main">
            <v-row>
                <v-col cols="12" sm="6" md="6" lg="6" class="pb-0">
                    <p>23 May 2021</p>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6" class="rightAligned pb-0">
                    <p>00:00 - 24:00</p>
                </v-col>
            </v-row>
            <Cards />
            <v-row>
                <v-col class="wide-chart" cols="9">
                    <v-card id="overview-chart-container" elevation="2">
                        <v-progress-circular
                            indeterminate
                            color="primary"
                            size="50"
                            v-if="!rendered"
                        />
                        <OverviewChart
                            ref="overview"
                            v-if="rendered"
                            :data="data"
                        />
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card class="full-height" elevation="2">
                        <Statistics :data="data" />
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col md="9">
                    <v-card class="full-height legend-container" elevation="2">
                        <v-progress-circular
                            indeterminate
                            color="primary"
                            size="50"
                            v-if="!rendered"
                        />
                        <Legend v-if="rendered" />
                    </v-card>
                </v-col>
                <v-col col="3">
                    <v-card class="full-height" elevation="2">
                        <EmotionsComponent />
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import OverviewChart from "@/components/OverviewChart.vue";
import Statistics from "@/components/Statistics.vue";
import EmotionsComponent from "@/components/EmotionsComponent.vue";
import Legend from "@/components/Legend.vue";
import Navbar from "@/components/Navbar.vue";
import { AxiosWrapper } from "@/helpers/wrapper.js";
import Cards from "@/components/Cards.vue";

import Upload from "../repositories/Upload";

const wrapper = new AxiosWrapper();

// These URL's will be removed in the future
const URL =
    "https://gist.githubusercontent.com/nbalasovs/e212107367c65915668cf26e75d2ccfa/raw/14fde6559649d3fc5c6e2bd7d002e0000e50a54f/dummy.json";

export default {
    name: "Dashboard",
    components: {
        Statistics,
        EmotionsComponent,
        OverviewChart,
        Navbar,
        Legend,
        Cards,
    },
    data() {
        return {
            data: null,
            rendered: false,
        };
    },
    created() {
        // when there is no cookie and the user wants to be reminded
        // display reminder and set cookie
        if (
            this.$cookies.get("EMOTION_REMINDER") === null &&
            this.$store.getters.getEmotionReminderStatus
        ) {
            this.$toaster.showMessage({
                message: "Reminder: Enter Emotion Status!",
                color: "blue",
                btnColor: "white",
            });
            this.$cookies.set("EMOTION_REMINDER", true, "1d");
        }

        wrapper
            .get(URL, (dataPromise) => dataPromise)
            .then((data) => {
                this.data = data;
                this.rendered = true;
            });
        let nightscoutUrl = localStorage.getItem("nightscout_url");
        if (nightscoutUrl) {
            Upload.connectNightscout({ host: nightscoutUrl }).then(
                (resp) => {},
                (err) => {
                    console.log(err);
                }
            );
        }
    },
};
</script>

<style>
.unalloc {
    min-height: 40vh;
}
.full-height {
    height: 100%;
}
.main {
    background-color: #f4fafd;
    padding: 0 2% 0 2%;
}
.clearfix {
    height: 3vh;
    background-color: #f4fafd;
}
.rightAligned {
    text-align: right;
}
#overview-chart-container {
    height: 700px;
}
#overview-chart-container .v-progress-circular,
.legend-container .v-progress-circular {
    left: 50%;
    top: 45%;
}
</style>
