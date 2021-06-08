<template>
    <div class="table">
        <v-data-table
            :headers="headers"
            :items="activities"
            :search="search"
            elevation="0"
            @click:row="selectActivity"
        >
            <template v-slot:[`body.prepend`]>
                <tr>
                    <td>
                        <v-text-field
                            v-model="name"
                            type="string"
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                            v-model="type"
                            type="string"
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                            v-model="startDate"
                            type="string"
                            label="<="
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                            v-model="endDate"
                            type="string"
                            label="<="
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                            v-model="startTime"
                            type="string"
                            label="<="
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                            v-model="endTime"
                            type="string"
                            label="<="
                        ></v-text-field>
                    </td>
                    <!-- <td>
                        <v-text-field
                            v-model="duration"
                            type="string"
                            label="<="
                        ></v-text-field>
                    </td> -->
                    <td>
                        <v-text-field
                            v-model="calories"
                            type="string"
                            label="<="
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
                    text: "Name",
                    value: "name",
                    sortable: false,
                    filter: (f) => {
                        return (f + "")
                            .toLowerCase()
                            .includes(this["name"].toLowerCase());
                    },
                },
                {
                    text: "Type",
                    value: "type",
                    sortable: false,
                    filter: (f) => {
                        return (f + "")
                            .toLowerCase()
                            .includes(this["type"].toLowerCase());
                    },
                },
                {
                    text: "Start Date",
                    value: "startDate",
                    sortable: false,
                    filter: (value) => {
                        if (!this.startDate) return true;
                        return (
                            moment(value).format("L") <=
                            moment(this.startDate).format("L")
                        );
                    },
                },
                {
                    text: "End Date",
                    value: "endDate",
                    sortable: false,
                    filter: (value) => {
                        if (!this.endDate) return true;
                        return (
                            moment(value).format("L") <=
                            moment(this.endDate).format("L")
                        );
                    },
                },
                {
                    text: "Start Time",
                    value: "startTime",
                    sortable: false,
                    filter: (value) => {
                        if (!this.startTime) return true;
                        return (
                            moment(value, "HH:mm").format("HH:mm") <=
                            moment(this.startTime, "HH:mm").format("HH:mm")
                        );
                    },
                },
                {
                    text: "End Time",
                    value: "endTime",
                    sortable: false,
                    filter: (value) => {
                        if (!this.endTime) return true;
                        return (
                            moment(value, "HH:mm").format("HH:mm") <=
                            moment(this.endTime, "HH:mm").format("HH:mm")
                        );
                    },
                },
                {
                    text: "Calories (kcal)",
                    value: "calories",
                    sortable: false,
                    filter: (value) => {
                        if (!this.calories) return true;
                        return value <= this.calories;
                    },
                },
            ],
            search: "",
            name: "",
            type: "",
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
            duration: "",
            calories: "",

            activities: [
                {
                    name: "Run",
                    type: "Physical",
                    startDate: moment().subtract(1, "day").format("L"),
                    endDate: moment().subtract(1, "day").format("L"),
                    startTime: moment().subtract(24, "hours").format("HH:mm"),
                    endTime: moment()
                        .subtract(23, "hours")
                        .subtract(10, "minutes")
                        .format("HH:mm"),
                    //duration: 50,
                    calories: 159,
                },
                {
                    name: "Walk",
                    type: "Physical",
                    startDate: moment().subtract(1, "day").format("L"),
                    endDate: moment().subtract(1, "day").format("L"),
                    startTime: moment().subtract(24, "hours").format("HH:mm"),
                    endTime: moment()
                        .subtract(23, "hours")
                        .subtract(10, "minutes")
                        .format("HH:mm"),
                    //duration: 50,
                    calories: 159,
                },
                {
                    name: "Cycling",
                    type: "Physical",
                    startDate: moment().subtract(1, "day").format("L"),
                    endDate: moment().subtract(1, "day").format("L"),
                    startTime: moment().subtract(24, "hours").format("HH:mm"),
                    endTime: moment()
                        .subtract(23, "hours")
                        .subtract(10, "minutes")
                        .format("HH:mm"),
                    //duration: 50,
                    calories: 159,
                },
                {
                    name: "Cycling and walking",
                    type: "Physical",
                    startDate: moment().subtract(1, "day").format("L"),
                    endDate: moment().subtract(1, "day").format("L"),
                    startTime: moment().subtract(24, "hours").format("HH:mm"),
                    endTime: moment()
                        .subtract(23, "hours")
                        .subtract(10, "minutes")
                        .format("HH:mm"),
                    //duration: 50,
                    calories: 600,
                },
            ],
        };
    },
    computed: {},
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
