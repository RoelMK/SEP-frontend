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
            :items="exercises"
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
    // component name
    name: "TableActivitiesData",
    // watch filteredData for changes
    watch: {
        filteredData: function (value) {
            // if filteredData has contents
            if (value.length > 0) {
                // update exercises using it
                this.exercises = this.convertExercises(value.exercise);
            } else {
                // otherwise update exercises using data
                this.exercises = this.convertExercises(this.data.exercise);
            }
        },
    },
    data() {
        return {
            // local filter operators
            items: ["<=", ">=", "="],
            // table headers
            headers: [
                // name header
                {
                    text: "Name",
                    value: "name",
                    sortable: false,
                    // filter on name
                    filter: (f) => {
                        return (f + "")
                            .toLowerCase()
                            .includes(this["name"].toLowerCase());
                    },
                },
                // type header
                {
                    text: "Type",
                    value: "type",
                    sortable: false,
                    // filter on type
                    filter: (f) => {
                        return (f + "")
                            .toLowerCase()
                            .includes(this["type"].toLowerCase());
                    },
                },
                // start date header
                {
                    text: "Start Date",
                    value: "startDate",
                    width: "17%",
                    sortable: false,
                    // filter start date based on chosen filter operator and value
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
                // end date header
                {
                    text: "End Date",
                    value: "endDate",
                    width: "17%",
                    sortable: false,
                    // filter end date based on chosen filter operator and value
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
                // start time header
                {
                    text: "Start Time",
                    value: "startTime",
                    sortable: false,
                    // filter start time based on chosen filter operator and value
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
                // end time header
                {
                    text: "End Time",
                    value: "endTime",
                    sortable: false,
                    // filter end time based on chosen filter operator and value
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
                // calories header
                {
                    text: "Calories (kcal)",
                    value: "calories",
                    sortable: false,
                    // filter calories based on chosen filter operator and value
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
                // duration header
                {
                    text: "Dur.",
                    value: "duration",
                    sortable: false,
                },
            ],
            // name of exercise
            name: "",
            // type of exercise
            type: "",
            // start date of exercise
            startDate: "",
            // end date of exercise
            endDate: "",
            // start time of exercise
            startTime: "",
            // end time of exercise
            endTime: "",
            // calories of exercise
            calories: "",
            // chosen start date filter
            startDateFilter: "",
            // chosen end date filter
            endDateFilter: "",
            // chosen start time filter
            startTimeFilter: "",
            // chosen end time filter
            endTimeFilter: "",
            // chosen calories filter
            caloriesFilter: "",
            // exercises
            exercises: [],
        };
    },
    computed: {
        // get "filteredData", "data" from store state
        ...mapState(["filteredData", "data"]),
    },
    methods: {
        /**
         * Handle row click action
         * @param  { any }    activity activity object
         * @return { void }
         */
        selectActivity(activity) {
            let start = moment(
                moment(
                    activity.startDate + " " + activity.startTime,
                    "yyyy-MM-DD HH:mm"
                ).subtract(2, "hours")
            ).format("YYYY-MM-DDTHH:mm");
            let end = moment(
                moment(
                    activity.endDate + " " + activity.endTime,
                    "yyyy-MM-DD HH:mm"
                ).add(2, "hours")
            ).format("YYYY-MM-DDTHH:mm");
            this.$store.dispatch("setNewTimeFrame", {
                start,
                end,
                now: moment(),
            });
        },
        /**
         * Convert initial data object to a structure used in a table
         * @param  { any }    data data object
         * @return { void }
         */
        convertExercises(data) {
            return data.map((f) => ({
                name: f.name,
                type: f.type,
                startDate: moment(new Date(f.timestamp)).format("yyyy-MM-DD"),
                endDate: moment(
                    moment(new Date(f.timestamp)).add(f.duration, "seconds")
                ).format("yyyy-MM-DD"),
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
    width: 8rem;
}
</style>