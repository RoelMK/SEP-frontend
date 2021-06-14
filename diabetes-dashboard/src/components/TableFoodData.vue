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
            :items="desserts"
            elevation="0"
            @click:row="selectFood"
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
                    <!-- <td>
                        <v-text-field
                            v-model="glycemicIndex"
                            type="string"
                        ></v-text-field>
                    </td> -->
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import moment from "moment";

export default {
    name: "TableFoodData",
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
                    text: "Time",
                    value: "time",
                    sortable: false,
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
                {
                    text: "Date",
                    value: "date",
                    sortable: false,
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
                {
                    text: "Carbs (g)",
                    value: "carbs",
                    sortable: false,
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
                // {
                //     text: "GI",
                //     value: "glycemicIndex",
                //     sortable: false,
                //     filter: (value) => {
                //         if (!this.glycemicIndex) return true;
                //         return value <= this.glycemicIndex;
                //     },
                // },
            ],
            desserts: [
                {
                    name: "Frozen Yoghurt",
                    type: "Dessert",
                    time: "16:00",
                    date: moment("2027-04-10").format("L"),
                    carbs: 24,
                    calories: 4,
                    glycemicIndex: 1,
                },
                {
                    name: "Ice cream sandwich",
                    type: "Dessert",
                    time: "12:00",
                    date: moment("2027-04-10").format("L"),
                    carbs: 24,
                    calories: 4,
                    glycemicIndex: 1,
                },
                {
                    name: "Eclair",
                    type: "Dessert",
                    time: "19:00",
                    date: moment("2027-04-10").format("L"),
                    carbs: 24,
                    calories: 4,
                    glycemicIndex: 1,
                },
                {
                    name: "Cupcake",
                    type: "Dessert",
                    time: moment().subtract(5, "hours").format("HH:mm"),
                    date: moment().subtract(1, "day").format("L"),
                    carbs: 24,
                    calories: 4,
                    glycemicIndex: 1,
                },
                {
                    name: "Gingerbread",
                    type: "Dessert",
                    time: moment().subtract(5, "hours").format("HH:mm"),
                    date: moment().subtract(1, "day").format("L"),
                    carbs: 24,
                    calories: 4,
                    glycemicIndex: 1,
                },
                {
                    name: "Eclair",
                    type: "Dessert",
                    time: moment().subtract(5, "hours").format("HH:mm"),
                    date: moment().subtract(1, "day").format("L"),
                    carbs: 24,
                    calories: 4,
                    glycemicIndex: 1,
                },
                {
                    name: "Cupcake",
                    type: "Dessert",
                    time: moment().subtract(5, "hours").format("HH:mm"),
                    date: moment().subtract(1, "day").format("L"),
                    carbs: 24,
                    calories: 4,
                    glycemicIndex: 1,
                },
                {
                    name: "Gingerbread",
                    type: "Dessert",
                    time: moment().subtract(5, "hours").format("HH:mm"),
                    date: moment().subtract(1, "day").format("L"),
                    carbs: 24,
                    calories: 4,
                    glycemicIndex: 1,
                },
                {
                    name: "Frozen Yoghurt",
                    type: "Dessert",
                    time: moment().subtract(5, "hours").format("HH:mm"),
                    date: moment().subtract(1, "day").format("L"),
                    carbs: 24,
                    calories: 4,
                    glycemicIndex: 1,
                },
                {
                    name: "Ice cream sandwich",
                    type: "Dessert",
                    time: moment().subtract(5, "hours").format("HH:mm"),
                    date: moment().subtract(1, "day").format("L"),
                    carbs: 24,
                    calories: 4,
                    glycemicIndex: 1,
                },
                {
                    name: "Eclair",
                    type: "Dessert",
                    time: moment().subtract(5, "hours").format("HH:mm"),
                    date: moment().subtract(1, "day").format("L"),
                    carbs: 24,
                    calories: 4,
                    glycemicIndex: 1,
                },
                {
                    name: "Cupcake",
                    type: "Dessert",
                    time: moment().subtract(5, "hours").format("HH:mm"),
                    date: moment().subtract(1, "day").format("L"),
                    carbs: 24,
                    calories: 4,
                    glycemicIndex: 1,
                },
                {
                    name: "Gingerbread",
                    type: "Dessert",
                    time: moment().subtract(5, "hours").format("HH:mm"),
                    date: moment().subtract(1, "day").format("L"),
                    carbs: 24,
                    calories: 4,
                    glycemicIndex: 1,
                },
                {
                    name: "Eclair",
                    type: "Dessert",
                    time: moment().subtract(5, "hours").format("HH:mm"),
                    date: moment().subtract(1, "day").format("L"),
                    carbs: 24,
                    calories: 4,
                    glycemicIndex: 1,
                },
                {
                    name: "Cupcake",
                    type: "Dessert",
                    time: moment().subtract(5, "hours").format("HH:mm"),
                    date: moment().subtract(1, "day").format("L"),
                    carbs: 24,
                    calories: 4,
                    glycemicIndex: 1,
                },
                {
                    name: "Gingerbread",
                    type: "Dessert",
                    time: moment().subtract(5, "hours").format("HH:mm"),
                    date: moment().subtract(1, "day").format("L"),
                    carbs: 24,
                    calories: 4,
                    glycemicIndex: 1,
                },
            ],
            name: "",
            type: "",
            time: "",
            date: "",
            carbs: "",
            calories: "",
            //glycemicIndex: "",
            timeFilter: "",
            dateFilter: "",
            carbsFilter: "",
            caloriesFilter: "",
        };
    },
    computed: {},
    methods: {
        selectFood(food) {
            this.$emit("selectedFood", food);
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
    width: 9.3rem;
}
</style>
