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
                        <v-progress-circular indeterminate color="primary" size="50" v-if="!rendered" />
                        <OverviewChart ref="overview" v-if="rendered" />
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card class="full-height statistics" elevation="2">
                        <v-progress-circular indeterminate color="primary" size="50" v-if="!rendered" />
                        <Statistics v-if="rendered" />
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
import OverviewChart from '@/components/OverviewChart.vue';
import Statistics from '@/components/Statistics.vue';
import EmotionsComponent from '@/components/EmotionsComponent.vue';
import Legend from '@/components/Legend.vue';
import Navbar from '@/components/Navbar.vue';
import Cards from '@/components/Cards.vue';
import Upload from "@/repositories/Upload";
import Data from '@/repositories/Data.js';
import activities from '@/components/configurations/queryProperties.js';
import moment from 'moment';
import Auth from "../repositories/Auth";
import { mapState } from 'vuex';

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
    computed: {
        ...mapState(['data'])
    },
    data() {
        return {
            tab: null,
            items: ['insulin', 'food', 'activities'],
            chosenFood: { },
            chosenActivity: { activity: null, now: null },
            rendered: false
        };
    },
    async created() {
        await Auth.getProfile(this.$cookies.get("JWT")).then(
            (resp) => {
                this.$store.commit("SET_USER", resp.data);
            },
            (error) => { console.log(error); }
        );
        if (
            this.$cookies.get("EMOTION_REMINDER") === null &&
            this.$store.getters.getEmotionReminderStatus &&
            localStorage.getItem("emotionReminder") == "true"
        ) {
            this.$toaster.showMessage({
                message: "Reminder: Enter Emotion Status!",
                color: "blue",
                btnColor: "white",
            });
            this.$cookies.set("EMOTION_REMINDER", true, "1d");
        }

        let nightscoutUrl = localStorage.getItem("nightscout_url");
        if (nightscoutUrl) {
            Upload.connectNightscout({ host: nightscoutUrl }).then(
                (resp) => {},
                (err) => {
                    console.log(err);
                }
            );
        }
        if (this.data.length <= 0) {
            const config = {
                startDate: moment().format('DD-MM-YYYY'),
                endDate: moment().format('DD-MM-YYYY'),
                exerciseTypes: activities[3].properties[0].properties
                    .map(d => d.toUpperCase()).join(','),
            };
            Data.fetch(config, this.$cookies.get("JWT")).then(
                async (res) => {
                    await this.$store.dispatch('setData', res.data);
                    await this.$store.dispatch('setDate', {
                        start: moment(),
                        end: moment()
                    });
                    this.rendered = true;
                },
                (err) => console.log(err)
            );
        } else {
            this.rendered = true;
        }
    }
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
.statistics .v-progress-circular,
.legend-container .v-progress-circular {
    left: 50%;
    top: 45%;
}
</style>
