<template>
    <v-navigation-drawer
        width="25%"
        v-model="showQueryMenu"
        app
        temporary
        absolute
        right
    >
        <v-container>
            <p class="title">Query Menu</p>

            <v-container class="section">
                <p class="removeMargin">Specify Time Frame:</p>
                <v-menu
                    ref="dateMenu"
                    v-model="dateMenu"
                    :close-on-content-click="false"
                    :return-value.sync="dates"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="dateRangeText"
                            label="Select start and end date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        range
                        v-model="dates"
                        no-title
                        scrollable
                        show-adjacent-months
                    >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="dateMenu = false">
                            Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.dateMenu.save(dates)"
                        >
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-menu>
                <v-menu
                    ref="timeMenu"
                    v-model="timeMenu"
                    :close-on-content-click="false"
                    :return-value.sync="timeRange"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="timeRangeText"
                            label="Select start and end time"
                            prepend-icon="mdi-clock"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-container class="timePickerContainer">
                        <vc-date-picker
                            v-model="timeRange"
                            mode="time"
                            :timezone="'utc'"
                            is-expanded
                            is-required
                            is-range
                            is24hr
                            class="timePicker"
                        />
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="timeMenu = false">
                            Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.timeMenu.save(timeRange)"
                        >
                            OK
                        </v-btn>
                    </v-container>
                </v-menu>
            </v-container>

            <v-container class="section">
                <p>Specify Glucose:</p>
                <v-row class="glucoseOptions">
                    <v-col>
                        <v-checkbox
                            class="removeMargin"
                            v-model="glucoseFilter.hypoGlucoseCheckbox"
                            :label="`Hypos`"
                            hide-details
                        ></v-checkbox>
                    </v-col>
                    <v-col>
                        <v-checkbox
                            class="removeMargin"
                            v-model="glucoseFilter.normalGlucoseCheckbox"
                            :label="`Normal`"
                            hide-details
                        ></v-checkbox>
                    </v-col>
                    <v-col>
                        <v-checkbox
                            class="removeMargin"
                            v-model="glucoseFilter.hyperGlucoseCheckbox"
                            :label="`Hypers`"
                            hide-details
                        ></v-checkbox>
                    </v-col>
                </v-row>
            </v-container>

            <v-container class="section">
                <p>Specify Activities:</p>
                <v-select
                    v-model="selectedActivities"
                    :items="activities"
                    label="Select activities"
                    multiple
                    chips
                    class="removeMargin"
                ></v-select>
            </v-container>

            <v-container class="section">
                <p>Specify Emotion:</p>
                <p class="text">
                    Happiness:
                    <v-icon
                        class="icon"
                        size="25"
                        v-on:click="selectHappiness('laugh', 2)"
                        v-bind:color="
                            selectedButtonHappiness === 'laugh'
                                ? 'blue darken-2'
                                : 'gray'
                        "
                    >
                        fas fa-laugh-beam
                    </v-icon>
                    <v-icon
                        class="icon"
                        size="25"
                        v-on:click="selectHappiness('smile', 1)"
                        v-bind:color="
                            selectedButtonHappiness === 'smile'
                                ? 'blue darken-2'
                                : 'gray'
                        "
                    >
                        fas fa-smile-beam
                    </v-icon>
                    <v-icon
                        class="icon"
                        size="25"
                        v-on:click="selectHappiness('angry', 0)"
                        v-bind:color="
                            selectedButtonHappiness === 'angry'
                                ? 'blue darken-2'
                                : 'gray'
                        "
                    >
                        fas fa-angry
                    </v-icon>
                </p>
                <p class="text">
                    Excitement:
                    <v-icon
                        class="icon"
                        size="25"
                        v-on:click="selectExcitement('excited', 2)"
                        v-bind:color="
                            selectedButtonExcitement === 'excited'
                                ? 'blue darken-2'
                                : 'gray'
                        "
                    >
                        fas fa-grin-stars
                    </v-icon>
                    <v-icon
                        class="icon"
                        size="25"
                        v-on:click="selectExcitement('smile-2', 1)"
                        v-bind:color="
                            selectedButtonExcitement === 'smile-2'
                                ? 'blue darken-2'
                                : 'gray'
                        "
                    >
                        fas fa-smile-beam
                    </v-icon>
                    <v-icon
                        class="icon"
                        size="25"
                        v-on:click="selectExcitement('tired', 0)"
                        v-bind:color="
                            selectedButtonExcitement === 'tired'
                                ? 'blue darken-2'
                                : 'gray'
                        "
                    >
                        fas fa-tired
                    </v-icon>
                </p>
            </v-container>

            <v-container class="section">
                <p>Specify Food:</p>
                <v-text-field
                    class="removeMargin"
                    v-model="foodFilter.foodName"
                    label="Enter Food Name"
                    required
                ></v-text-field>
                <v-checkbox
                    class="removeMargin"
                    v-model="foodFilter.breakfast"
                    :label="`Breakfast`"
                    hide-details
                ></v-checkbox>
                <v-checkbox
                    v-model="foodFilter.lunch"
                    :label="`Lunch`"
                    hide-details
                ></v-checkbox>
                <v-checkbox
                    v-model="foodFilter.dinner"
                    :label="`Dinner`"
                    hide-details
                ></v-checkbox>
                <v-checkbox
                    v-model="foodFilter.snack"
                    :label="`Snack`"
                    hide-details
                ></v-checkbox>
            </v-container>

            <v-btn color="primary" class="bttn" @click="sendQuery"> Filter </v-btn>
        </v-container>
    </v-navigation-drawer>
</template>

<script>
import moment from "moment";

export default {
    name: "Navbar",
    props: {
        show: Boolean,
    },
    data: () => ({
        showQueryMenu: false,
        dateMenu: false,
        timeMenu: false,
        dates: [new Date().toISOString().substr(0, 10)],
        timeRange: {
            start: moment.utc("00:00", "HH:mm"),
            end: moment.utc("23:00", "HH:mm"),
        },
        selectedButtonHappiness: null,
        selectedButtonExcitement: null,
        glucoseFilter: {
            hypoGlucoseCheckbox: false,
            normalGlucoseCheckbox: false,
            hyperGlucoseCheckbox: false,
        },
        selectedActivities: [],
        emotionFilter: {
            happiness: null,
            excitment: null,
        },
        foodFilter: {
            foodName: "",
            breakfast: false,
            lunch: false,
            dinner: false,
            snack: false,
        },
        activities: [
            "Walk",
            "Run",
            "Bike",
            "Soccer",
            "Basketball",
            "Volleyball",
            "Rugby",
            "Baseball",
            "Horse riding",
            "Athletics",
            "Swimming",
            "Water polo",
            "Surfing",
            "Golf",
            "Lacrosse",
            "Tennis",
            "Squash",
            "Badminton",
            "Table tennis",
            "Skiing",
            "Ice hockey",
            "Field hockey",
            "Ice skating",
            "Roller skating",
            "Fitness",
            "Yoga",
            "Aerobics",
            "Martial arts",
            "Dance",
            "Pool",
            "Darts",
            "Air hockey",
            "Bowling",
            "Chess",
            "Gymnastics",
            "Hike",
            "Mountainbike",
        ],
    }),
    computed: {
        // join the outermost dates in a string
        dateRangeText() {
            return this.dates.join(" ~ ");
        },
        // join the start and end times in a string
        timeRangeText() {
            return (
                moment.utc(this.timeRange.start).format("HH:mm") +
                "~" +
                moment.utc(this.timeRange.end).format("HH:mm")
            );
        },
    },
    methods: {
        /**
         * Set happiness level for the query and
         *  set the appropriate happiness emoji
         * @param  { String }   label name of the emoji
         * @param  { Integer }   value level of happiness
         * @return
         */
        selectHappiness(label, value) {
            this.selectedButtonHappiness = label;
            this.emotionFilter.happiness = value;
        },
        /**
         * Set excitement level for the query and
         *  set the appropriate excitement emoji
         * @param  { String }   label name of the emoji
         * @param  { Integer }   value level of excitement
         * @return
         */
        selectExcitement(label, value) {
            this.selectedButtonExcitement = label;
            this.emotionFilter.excitement = value;
        },
        /**
         * Method to send query to backend
         *  currently only closes the query menu
         * @return
         */
        sendQuery() {
            this.showQueryMenu = !this.showQueryMenu;
        },
    },
    // listen for changes in show prop to toggle the query menu
    watch: {
        show: function() {
            this.showQueryMenu = !this.showQueryMenu;
        }
    }
};
</script>

<style>
.title {
    text-align: center;
}
.section {
    font-size: 17px;
    padding-top: 1rem;
}
.text {
    color: gray;
}
.bttn {
    margin-top: 2rem;
    display: block;
}
.removeMargin {
    margin-top: 0;
    padding-top: 0;
}
.glucoseOptions {
    margin-bottom: 0.3rem;
}
.timePicker .vc-month {
    display: none;
}
.timePicker .vc-year {
    display: none;
}
.timePicker .vc-day {
    display: none;
}
.timePicker .vc-weekday {
    display: none;
}
.timePickerContainer {
    background: white;
}
.timePickerContainer button {
    margin-top: 0.8rem;
}
</style>