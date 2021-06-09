<template>
    <div class="table">
        <v-data-table
            :headers="headers"
            :items="desserts"
            elevation="0"
            @click:row="selectFood"
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
                            label="<="
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                            v-model="date"
                            type="string"
                            label="<="
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                            v-model="carbs"
                            type="string"
                            label="<="
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                            v-model="calories"
                            type="string"
                            label="<="
                        ></v-text-field>
                    </td>
                    <!-- <td>
                        <v-text-field
                            v-model="glycemicIndex"
                            type="string"
                            label="<="
                        ></v-text-field>
                    </td> -->
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
    name: "TableFoodData",
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
                    text: "Time",
                    value: "time",
                    sortable: false,
                    filter: (value) => {
                        if (!this.time) return true;
                        return (
                            moment(value, "HH:mm").format("HH:mm") <=
                            moment(this.time, "HH:mm").format("HH:mm")
                        );
                    },
                },
                {
                    text: "Date",
                    value: "date",
                    sortable: false,
                    filter: (value) => {
                        if (!this.date) return true;
                        return (
                            moment(value).format("L") <=
                            moment(this.date).format("L")
                        );
                    },
                },
                {
                    text: "Carbs (g)",
                    value: "carbs",
                    sortable: false,
                    filter: (value) => {
                        if (!this.carbs) return true;
                        return value <= this.carbs;
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
            glycemicIndex: "",
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
</style>
