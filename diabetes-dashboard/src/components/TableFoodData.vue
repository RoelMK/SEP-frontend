<template>
    <div class="table">
        <div>
            <tr>
                <td class="border">
                    <div class="filterElement">
                        <span class="filterText">Time</span>
                        <v-select
                            v-model="timeFilter"
                            :items="items"
                            class="pt-0 pb-0 selector"
                        ></v-select>
                    </div>
                </td>
                <td class="border">
                    <div class="filterElement">
                        <span class="filterText">Date</span>
                        <v-select
                            v-model="dateFilter"
                            :items="items"
                            class="pt-0 pb-0 selector"
                        ></v-select>
                    </div>
                </td>
                <td class="border">
                    <div class="filterElement">
                        <span class="filterText">Carbs (g)</span>
                        <v-select
                            v-model="carbsFilter"
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
            :items="food"
            elevation="0"
            @click:row="selectFood"
            class="tableSection"
        >
            <template v-slot:[`body.prepend`]>
                <tr>
                    <td>
                        <v-text-field
                            v-model="type"
                            type="string"
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                            v-model="time"
                            type="string"
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                            v-model="date"
                            type="string"
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                            v-model="carbs"
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
    // name component
    name: "TableFoodData",
    //watch filteredData for changes
    watch: {
        filteredData: function (value) {
            // if filteredData has contents
            if (value.length > 0) {
                // update food using it
                this.food = this.convertFood(value.food);
            } else {
                // otherwise update food using data
                this.food = this.convertFood(this.data.food);
            }
        },
    },
    data() {
        return {
            // local filter operators
            items: ["<=", ">=", "="],
            // table headers
            headers: [
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
                // time header
                {
                    text: "Time",
                    value: "time",
                    sortable: false,
                    // filter time based on chosen filter operator and value
                    filter: (value) => {
                        if (!this.time) return true;
                        if (this.timeFilter === "<=") {
                            return (
                                moment(value, "HH:mm").format("HH:mm") <=
                                moment(this.time, "HH:mm").format("HH:mm")
                            );
                        } else if (this.timeFilter === ">=") {
                            return (
                                moment(value, "HH:mm").format("HH:mm") >=
                                moment(this.time, "HH:mm").format("HH:mm")
                            );
                        } else {
                            return (
                                moment(value, "HH:mm").format("HH:mm") ==
                                moment(this.time, "HH:mm").format("HH:mm")
                            );
                        }
                    },
                },
                // date header
                {
                    text: "Date",
                    value: "date",
                    sortable: false,
                    // filter date based on chosen filter operator and value
                    filter: (value) => {
                        if (!this.date) return true;
                        if (this.dateFilter === "<=") {
                            return (
                                moment(value).format("L") <=
                                moment(this.date).format("L")
                            );
                        } else if (this.dateFilter === ">=") {
                            return (
                                moment(value).format("L") >=
                                moment(this.date).format("L")
                            );
                        } else {
                            return (
                                moment(value).format("L") ===
                                moment(this.date).format("L")
                            );
                        }
                    },
                },
                // carbs header
                {
                    text: "Carbs (g)",
                    value: "carbs",
                    sortable: false,
                    // filter carbs based on chosen filter operator and value
                    filter: (value) => {
                        if (!this.carbs) return true;
                        if (this.carbsFilter === "<=") {
                            return value <= this.carbs;
                        } else if (this.carbsFilter === ">=") {
                            return value >= this.carbs;
                        } else {
                            return value == this.carbs;
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
                // GI headers
                {
                    text: "GI",
                    value: "glycemicIndex",
                    sortable: false,
                    // filter GI based on chosen filter operator and value
                    filter: (value) => {
                        if (!this.glycemicIndex) return true;
                        return value <= this.glycemicIndex;
                    },
                },
            ],
            // store food data
            food: [],
            // name of food
            name: "",
            // type of food
            type: "",
            // time of food
            time: "",
            // date of food
            date: "",
            // carbs of food
            carbs: "",
            // calories of food
            calories: "",
            // glycemic index of food
            glycemicIndex: "",
            // chosen time filter operator
            timeFilter: "",
            // chosen date filter operator
            dateFilter: "",
            // chosen carbs filter operator
            carbsFilter: "",
            // chosen calories filter operator
            caloriesFilter: "",
        };
    },
    computed: {
        // get "filteredData", "data" from store state
        ...mapState(["filteredData", "data"]),
    },
    methods: {
        /**
         * Handle row click action
         * @param  { any }    food food object
         * @return { void }
         */
        selectFood(food) {
            let startTime = moment(food.time, "HH:mm")
                .subtract(2, "hours")
                .format("HH:mm");
            let endTime = moment(food.time, "HH:mm")
                .add(2, "hours")
                .format("HH:mm");
            let start = moment(
                moment(food.date + " " + startTime, "yyyy-MM-DD HH:mm")
            ).format("YYYY-MM-DDTHH:mm");
            let end = moment(
                moment(food.date + " " + endTime, "yyyy-MM-DD HH:mm")
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
        convertFood(data) {
            return data.map((f) => ({
                type: f.meal_type !== null ? f.meal_type : "-",
                carbs: f.carbohydrates,
                calories: f.calories !== null ? f.calories : 0,
                glycemicIndex: f.glycemic_index !== null ? f.glycemic_index : 0,
                date: moment(new Date(f.timestamp))
                    .format("yyyy-MM-DD")
                    .toString(),
                time: moment(new Date(f.timestamp)).format("HH:mm").toString(),
                id: f.activityId,
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
    width: 9.8rem;
}
</style>
