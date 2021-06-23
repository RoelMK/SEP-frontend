<template>
    <div id="dashboard">
        <Navbar class="header"></Navbar>
        <div class="clearfix"></div>
        <div class="main">
            <Cards />
            <v-row>
                <v-col class="wide-chart" cols="9">
                    <v-card id="overview-chart-container" elevation="2">
                        <v-progress-circular indeterminate color="primary" size="50" v-if="!rendered" />
                        <OverviewChart ref="overview" v-if="rendered && checkData" />
                        <v-container fill-height fluid v-if="!checkData && rendered">
                            <v-row align="center" justify="center">
                                <div class="d-block text-center">
                                    <p class="mb-0">No data is available for selected date</p>
                                    <p>Please try a different date</p>
                                    <v-btn
                                        v-on:click="$store.dispatch('showFilter', { show: true })"
                                    >
                                        Change filters
                                    </v-btn>
                                </div>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card class="full-height statistics" elevation="2">
                        <v-progress-circular indeterminate color="primary" size="50" v-if="!rendered" />
                        <Statistics v-if="rendered && checkData" />
                        <v-container fill-height fluid v-if="!checkData && rendered">
                            <v-row align="center" justify="center">
                                <div class="d-block text-center">
                                    <p>No statistics is available</p>
                                </div>
                            </v-row>
                        </v-container>
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
                        <Emotions v-on:emotions="updateEmotions" />
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import OverviewChart from '@/components/OverviewChart.vue';
import Statistics from '@/components/Statistics.vue';
import Emotions from '@/components/Emotions.vue';
import Legend from '@/components/Legend.vue';
import Navbar from '@/components/Navbar.vue';
import Cards from '@/components/Cards.vue';
import Upload from "@/repositories/Upload";
import Data from '@/repositories/Data.js';
import moment from 'moment';
import Auth from "../repositories/Auth";
import { mapState } from 'vuex';

export default {
    name: "Dashboard",
    components: {
        Statistics,
        Emotions,
        OverviewChart,
        Navbar,
        Legend,
        Cards,
    },
    computed: {
        ...mapState(['data', 'arousalIcon', 'valenceIcon']),
        checkData() {
            for (let item in this.data) {
                if (this.data[item].length > 0)
                    return true;
            }
            return false;
        }
    },
    data() {
        return {
            tab: null,
            items: ['insulin', 'food', 'activities'],
            chosenFood: { },
            chosenActivity: { activity: null, now: null },
            rendered: false,
            emotions: {
                valence: {
                    1: 'fas fa-angry',
                    2: 'fas fa-smile-beam',
                    3: 'fas fa-laugh-beam',
                },
                arousal: {
                    1: 'fas fa-tired',
                    2: 'fas fa-smile-beam',
                    3: 'fas fa-grin-stars',
                },
            },
        };
    },
    async created() {
        let reminder = localStorage.getItem("emotionReminder");
        let reminderCookie = this.$cookies.get("EMOTION_REMINDER");
        let reminderset = true;
        if (reminder && reminderCookie){
            reminderset = reminder == "true" &&
                reminderCookie != "true";
        }
        if (reminderset) {
            this.$toaster.showMessage({
                message: "Reminder: Enter Emotion Status!",
                color: "blue",
                btnColor: "white",
            });
            this.$cookies.set("EMOTION_REMINDER", true, "1d");
        }
        await Auth.getProfile(this.$cookies.get("JWT")).then(
            (resp) => {
                this.$store.commit("SET_USER", resp.data);
            },
            (error) => { console.log(error); }
        );

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
                endDate: moment().format('DD-MM-YYYY')
            };
            Data.fetch(config, this.$cookies.get("JWT")).then(
                async (res) => {
                    await this.$store.dispatch('setData', res.data);
                    await this.$store.dispatch('setDate', {
                        start: moment().format('DD-MM-YYYY'),
                        end: moment().format('DD-MM-YYYY')
                    });
                    if (this.data['mood'].length > 0) {
                        this.$store.dispatch('setEmotion', {
                            type: 'valence',
                            icon: this.emotions['valence'][
                                this.data['mood'][0].valence
                            ]
                        });
                        this.$store.dispatch('setEmotion', {
                            type: 'arousal',
                            icon: this.emotions['arousal'][
                                this.data['mood'][0].arousal
                            ]
                        });
                    }
                    this.rendered = true;
                },
                (err) => console.log(err)
            );
        } else {
            this.rendered = true;
        }
    },
    methods: {
        updateEmotions(parameters) {
            this.$store.dispatch('setEmotion', {
                type: 'valence',
                icon: this.emotions['valence'][parameters.valence]
            });
            this.$store.dispatch('setEmotion', {
                type: 'arousal',
                icon: this.emotions['arousal'][parameters.arousal]
            });
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
.emotions {
    display: flex;
    vertical-align: middle;
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
