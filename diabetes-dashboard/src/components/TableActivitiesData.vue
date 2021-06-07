<template>
    <div class="table">
        <v-data-table
            :headers="headers"
            :items="activities"
            item-key="name"
            :search="search"
            :hide-default-footer="true"
            elevation="0"
            @click:row="selectActivity"
        >
            <template v-slot:top>
                <v-container>
                    <v-row>
                        <v-col xs="10" sm="10" md="10" lg="10">
                            <v-text-field
                                v-model="search"
                                label="Search"
                            ></v-text-field>
                        </v-col>
                        <v-col><v-icon medium>mdi-plus</v-icon></v-col>
                    </v-row>
                </v-container>
            </template>

            <template v-slot:[`body.prepend`]>
                <tr>
                    <td></td>
                    <td>
                        <v-text-field
                            v-model="date"
                            type="string"
                            label="Before"
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                            v-model="startTime"
                            type="string"
                            label="Before"
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                            v-model="endTime"
                            type="string"
                            label="Before"
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                            v-model="calories"
                            type="number"
                            label="Less than"
                        ></v-text-field>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

export default {
    name: "TableActivitiesData",
    data() {
        return {
            headers: [
                {
                    text: "Activities",
                    value: "activity",
                },
                {
                    text: "Date",
                    value: "date",
                    filter: (value) => {
                        if (!this.date) return true;
                        return (
                            moment(value).format("L") <
                            moment(this.date).format("L")
                        );
                    },
                },
                {
                    text: "Start Time",
                    value: "startTime",
                    filter: (value) => {
                        if (!this.startTime) return true;
                        return (
                            moment(value, "HH:mm").format("HH:mm") <
                            moment(this.startTime, "HH:mm").format("HH:mm")
                        );
                    },
                },
                {
                    text: "End Time",
                    value: "endTime",
                    filter: (value) => {
                        if (!this.endTime) return true;
                        return (
                            moment(value, "HH:mm").format("HH:mm") <
                            moment(this.endTime, "HH:mm").format("HH:mm")
                        );
                    },
                },
                {
                    text: "Calories",
                    value: "calories",
                    filter: (value) => {
                        if (!this.calories) return true;
                        return value < this.calories;
                    },
                },
            ],
            search: "",
            activityName: "",
            date: "",
            startTime: "",
            endTime: "",
            calories: "",
            activities: [
                {
                    activity: "Run",
                    date: moment().subtract(1, "day").format("L"),
                    startTime: moment().subtract(24, "hours").format("HH:mm"),
                    endTime: moment()
                        .subtract(23, "hours")
                        .subtract(10, "minutes")
                        .format("HH:mm"),
                    calories: 159,
                },
                {
                    activity: "Yoga",
                    date: moment().subtract(1, "day").format("L"),
                    startTime: moment().subtract(20, "hours").format("HH:mm"),
                    endTime: moment()
                        .subtract(19, "hours")
                        .subtract(30, "minutes")
                        .format("HH:mm"),
                    calories: 100,
                },
                {
                    activity: "Chess",
                    date: moment().subtract(1, "day").format("L"),
                    startTime: moment().subtract(22, "hours").format("HH:mm"),
                    endTime: moment().subtract(21, "hours").format("HH:mm"),
                    calories: null,
                },
                {
                    activity: "Health check",
                    date: moment().format("L"),
                    startTime: moment().subtract(4, "hours").format("HH:mm"),
                    endTime: moment()
                        .subtract(3, "hours")
                        .subtract(30, "minutes")
                        .format("HH:mm"),
                    calories: null,
                },
                {
                    activity: "Ice hokey",
                    date: moment().format("L"),
                    startTime: moment().subtract(2, "hours").format("HH:mm"),
                    endTime: moment().subtract(1, "hours").format("HH:mm"),
                    calories: 349,
                },
            ],
        };
    },
    computed: {
    },
    methods: {
        selectActivity(activity) {
            this.$emit("selectedActivity", activity);
        },
    },
};
</script>

<style scoped>
.table {
    padding: 3%;
    height: auto;
    min-height: 40vh;
    width: 100%;
    overflow: auto;
}

.mdi-plus {
    border-radius: 50%;
    padding: 0.2rem;
    background: rgba(0, 0, 0, 0.15);
}
</style>
