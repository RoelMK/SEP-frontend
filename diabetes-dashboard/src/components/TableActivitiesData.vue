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
            <template v-slot:[`body.prepend`]>
                <tr>
                    <td>
                        <v-text-field
                            v-model="name"
                            type="string"
                            label="Name"
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                            v-model="type"
                            type="string"
                            label="Type"
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                            v-model="startDate"
                            type="string"
                            label="Before"
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                            v-model="endDate"
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
                    <!-- <td>
                        <v-text-field
                            v-model="duration"
                            type="number"
                            label="Less"
                        ></v-text-field>
                    </td> -->
                    <td>
                        <v-text-field
                            v-model="calories"
                            type="number"
                            label="Less"
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
                    filter: (f) => {
                        return (f + "")
                            .toLowerCase()
                            .includes(this["name"].toLowerCase());
                    },
                    width: "10%"
                },
                {
                    text: "Type",
                    value: "type",
                    filter: (f) => {
                        return (f + "")
                            .toLowerCase()
                            .includes(this["type"].toLowerCase());
                    },
                    width: "10%"
                },
                {
                    text: "Start Date",
                    value: "startDate",
                    filter: (value) => {
                        if (!this.startDate) return true;
                        return (
                            moment(value).format("L") <
                            moment(this.startDate).format("L")
                        );
                    },
                    width: "10%"
                },
                {
                    text: "End Date",
                    value: "endDate",
                    filter: (value) => {
                        if (!this.endDate) return true;
                        return (
                            moment(value).format("L") <
                            moment(this.endDate).format("L")
                        );
                    },
                    width: "10%"
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
                    width: "10%"
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
                    width: "10%"
                },
                // {
                //     text: "Duration",
                //     value: "duration",
                //     filter: (value) => {
                //         if (!this.duration) return true;
                //         return value < this.duration;
                //     },
                //     width: "10%"
                // },
                {
                    text: "Calories",
                    value: "calories",
                    filter: (value) => {
                        if (!this.calories) return true;
                        return value < this.calories;
                    },
                    width: "10%"
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
