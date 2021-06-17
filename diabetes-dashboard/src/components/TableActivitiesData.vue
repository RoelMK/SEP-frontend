<template>
    <div class="table">
        <div>
            <tr>
                <td class="border">
                    <div class="filterElement">
                        <span class="filterText">Start Date</span>
                        <v-select
                            v-model="startDateFilter"
                            :items="items"
                            class="pt-0 pb-0 selector"
                        ></v-select>
                    </div>
                </td>
                <td class="border">
                    <div class="filterElement">
                        <span class="filterText">End Date</span>
                        <v-select
                            v-model="endDateFilter"
                            :items="items"
                            class="pt-0 pb-0 selector"
                        ></v-select>
                    </div>
                </td>
                <td class="border">
                    <div class="filterElement">
                        <span class="filterText">Start Time</span>
                        <v-select
                            v-model="startTimeFilter"
                            :items="items"
                            class="pt-0 pb-0 selector"
                        ></v-select>
                    </div>
                </td>
                <td class="border">
                    <div class="filterElement">
                        <span class="filterText">End Time</span>
                        <v-select
                            v-model="endTimeFilter"
                            :items="items"
                            class="pt-0 pb-0 selector"
                        ></v-select>
                    </div>
                </td>
                <td class="border">
                    <div class="filterElement">
                        <span class="filterText">Calories (kcal)</span>
                        <v-select
                            v-model="caloriesFilter"
                            :items="items"
                            class="pt-0 pb-0 selector"
                        ></v-select>
                    </div>
                </td>
            </tr>
        </div>

        <v-data-table
            :headers="headers"
            :items="activities"
            elevation="0"
            @click:row="selectActivity"
            class="tableSection"
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
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                            v-model="endDate"
                            type="string"
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                            v-model="startTime"
                            type="string"
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                            v-model="endTime"
                            type="string"
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                            v-model="calories"
                            type="string"
                        ></v-text-field>
                    </td>
                    <td></td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";

export default {
    name: "TableActivitiesData",
    watch: {
        filteredData: function (value) {
            if (value.length > 0) {
                this.exercises = this.convertExercises(value.exercises);
            } else {
                this.exercises = this.convertExercises(this.data.exercises);
            }
        },
    },
    data() {
        return {
            items: ["<=", ">=", "="],
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
                        if (this.startDateFilter === "<=") {
                            return (
                                moment(value).format("L") <=
                                moment(this.startDate).format("L")
                            );
                        } else if (this.startDateFilter === ">=") {
                            return (
                                moment(value).format("L") >=
                                moment(this.startDate).format("L")
                            );
                        } else {
                            return (
                                moment(value).format("L") ==
                                moment(this.startDate).format("L")
                            );
                        }
                    },
                },
                {
                    text: "End Date",
                    value: "endDate",
                    sortable: false,
                    filter: (value) => {
                        if (!this.endDate) return true;
                        if (this.endDateFilter === "<=") {
                            return (
                                moment(value).format("L") <=
                                moment(this.endDate).format("L")
                            );
                        } else if (this.endDateFilter === ">=") {
                            return (
                                moment(value).format("L") >=
                                moment(this.endDate).format("L")
                            );
                        } else {
                            return (
                                moment(value).format("L") ===
                                moment(this.endDate).format("L")
                            );
                        }
                    },
                },
                {
                    text: "Start Time",
                    value: "startTime",
                    sortable: false,
                    filter: (value) => {
                        if (!this.startTime) return true;
                        if (this.startTimeFilter === "<=") {
                            return (
                                moment(value, "HH:mm").format("HH:mm") <=
                                moment(this.startTime, "HH:mm").format("HH:mm")
                            );
                        } else if (this.startTimeFilter === ">=") {
                            return (
                                moment(value, "HH:mm").format("HH:mm") >=
                                moment(this.startTime, "HH:mm").format("HH:mm")
                            );
                        } else {
                            return (
                                moment(value, "HH:mm").format("HH:mm") ==
                                moment(this.startTime, "HH:mm").format("HH:mm")
                            );
                        }
                    },
                },
                {
                    text: "End Time",
                    value: "endTime",
                    sortable: false,
                    filter: (value) => {
                        if (!this.endTime) return true;
                        if (this.endTimeFilter === "<=") {
                            return (
                                moment(value, "HH:mm").format("HH:mm") <=
                                moment(this.endTime, "HH:mm").format("HH:mm")
                            );
                        } else if (this.endTimeFilter === ">=") {
                            return (
                                moment(value, "HH:mm").format("HH:mm") >=
                                moment(this.endTime, "HH:mm").format("HH:mm")
                            );
                        } else {
                            return (
                                moment(value, "HH:mm").format("HH:mm") ==
                                moment(this.endTime, "HH:mm").format("HH:mm")
                            );
                        }
                    },
                },
                {
                    text: "Calories (kcal)",
                    value: "calories",
                    sortable: false,
                    filter: (value) => {
                        if (!this.calories) return true;
                        if (this.caloriesFilter === "<=") {
                            return value <= this.calories;
                        } else if (this.caloriesFilter === ">=") {
                            return value >= this.calories;
                        } else {
                            return value == this.calories;
                        }
                    },
                },
                {
                    text: "Duration",
                    value: "duration",
                    sortable: false,
                },
            ],
            name: "",
            type: "",
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
            calories: "",
            startDateFilter: "",
            endDateFilter: "",
            startTimeFilter: "",
            endTimeFilter: "",
            caloriesFilter: "",

            exercises: [],
        };
    },
    computed: {
        ...mapState(["filteredData", "data"]),
    },
    methods: {
        selectActivity(activity) {
            this.$emit("selectedActivity", activity);
        },
        convertExercises(data) {
            return data.map((f) => ({
                name: f.name,
                type: f.type,
                startDate: moment(new Date(f.timestamp)).format("L"),
                endDate: moment(
                    moment(new Date(f.timestamp)).add(f.duration, "seconds")
                ).format("L"),
                startTime: moment(new Date(f.timestamp)).format("HH:mm"),
                endTime: moment(
                    moment(new Date(f.timestamp)).add(f.duration, "seconds")
                ).format("HH:mm"),
                calories: f.calories !== null ? f.calories : 0,
                activityId: f.activityId,
                duration:
                    f.duration !== null
                        ? Math.round((f.duration / 3600) * 10) / 10
                        : 0,
            }));
        },
    },
    created() {
        console.log(this.data);
        if (this.filteredData > 0) {
            this.exercises = this.convertExercises(this.filteredData.exercises);
        } else {
            this.exercises = this.convertExercises(this.data.exercises);
        }
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
.selector {
    width: 7.5rem;
}
</style>