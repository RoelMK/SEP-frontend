<template>
    <div class="table">
        <div>
            <tr>
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
                        <span class="filterText">Time</span>
                        <v-select
                            v-model="timeFilter"
                            :items="items"
                            class="pt-0 pb-0 selector"
                        ></v-select>
                    </div>
                </td>
            </tr>
        </div>

        <v-data-table :headers="headers" :items="emotions" elevation="0">
            <template v-slot:[`body.prepend`]>
                <tr>
                    <td>
                        <v-select
                            v-model="happinessFilter"
                            :items="emotionValues"
                        >
                            <template v-slot:selection="slotProps">
                                <v-icon size="25" color="blue darken-1">
                                    {{ displayHappiness(slotProps.item) }}
                                </v-icon>
                            </template>
                            <template v-slot:item="slotProps">
                                <v-icon size="25" color="blue darken-1">
                                    {{ displayHappiness(slotProps.item) }}
                                </v-icon>
                            </template>
                        </v-select>
                    </td>
                    <td>
                        <v-select
                            v-model="excitementFilter"
                            :items="emotionValues"
                        >
                            <template v-slot:selection="slotProps">
                                <v-icon size="25" color="blue darken-1">
                                    {{ displayExcitement(slotProps.item) }}
                                </v-icon>
                            </template>
                            <template v-slot:item="slotProps">
                                <v-icon size="25" color="blue darken-1">
                                    {{ displayExcitement(slotProps.item) }}
                                </v-icon>
                            </template>
                        </v-select>
                    </td>
                    <td>
                        <v-text-field
                            v-model="date"
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
                        <v-icon @click="dialog = true"> mdi-plus </v-icon>
                    </td>
                </tr>
            </template>

            <template v-slot:item="{ item }">
                <tr @click="selectEmotion(item)">
                    <td width="10%">
                        <v-icon size="25" color="blue darken-1">
                            {{ displayHappiness(item.happiness) }}
                        </v-icon>
                    </td>
                    <td width="10%">
                        <v-icon size="25" color="blue darken-1">
                            {{ displayExcitement(item.excitement) }}
                        </v-icon>
                    </td>
                    <td width="10%">
                        {{ item.date }}
                    </td>
                    <td width="10%">
                        {{ item.time }}
                    </td>
                    <td width="10%">
                        <v-icon small @click="editItem(item)">
                            mdi-pencil
                        </v-icon>
                        <!-- <v-icon small @click="deleteItem(item.id)">
                            mdi-minus
                        </v-icon> -->
                    </td>
                </tr>
            </template>

            <template v-slot:top>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }} </span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <p class="ml-0 pl-0">
                                        Happiness:
                                        <v-icon
                                            class="icon"
                                            size="25"
                                            v-on:click="
                                                editedItem.happiness = 3
                                            "
                                            v-bind:color="
                                                editedItem.happiness === 3
                                                    ? 'blue darken-2'
                                                    : 'gray'
                                            "
                                        >
                                            fas fa-laugh-beam
                                        </v-icon>
                                        <v-icon
                                            class="icon"
                                            size="25"
                                            v-on:click="
                                                editedItem.happiness = 2
                                            "
                                            v-bind:color="
                                                editedItem.happiness === 2
                                                    ? 'blue darken-2'
                                                    : 'gray'
                                            "
                                        >
                                            fas fa-smile-beam
                                        </v-icon>
                                        <v-icon
                                            class="icon"
                                            size="25"
                                            v-on:click="
                                                editedItem.happiness = 1
                                            "
                                            v-bind:color="
                                                editedItem.happiness === 1
                                                    ? 'blue darken-2'
                                                    : 'gray'
                                            "
                                        >
                                            fas fa-angry
                                        </v-icon>
                                    </p>
                                </v-row>
                                <v-row>
                                    <p class="ml-0 pl-0">
                                        Excitement:
                                        <v-icon
                                            class="icon"
                                            size="25"
                                            v-on:click="
                                                editedItem.excitement = 3
                                            "
                                            v-bind:color="
                                                editedItem.excitement === 3
                                                    ? 'blue darken-2'
                                                    : 'gray'
                                            "
                                        >
                                            fas fa-grin-stars
                                        </v-icon>
                                        <v-icon
                                            class="icon"
                                            size="25"
                                            v-on:click="
                                                editedItem.excitement = 2
                                            "
                                            v-bind:color="
                                                editedItem.excitement === 2
                                                    ? 'blue darken-2'
                                                    : 'gray'
                                            "
                                        >
                                            fas fa-smile-beam
                                        </v-icon>
                                        <v-icon
                                            class="icon"
                                            size="25"
                                            v-on:click="
                                                editedItem.excitement = 1
                                            "
                                            v-bind:color="
                                                editedItem.excitement === 1
                                                    ? 'blue darken-2'
                                                    : 'gray'
                                            "
                                        >
                                            fas fa-tired
                                        </v-icon>
                                    </p>
                                </v-row>
                                <v-row>
                                    <HistoryDatePicker
                                        @selectedDate="getSelectedDate"
                                        :date="editedItem.date"
                                    />
                                </v-row>
                                <v-row>
                                    <HistoryTimePicker
                                        @selectedTime="getSelectedTime"
                                        :time="editedItem.time"
                                    />
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">
                                Cancel
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <!-- <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="headline">
                            <p style="font-size: 18px">
                                Are you sure you want to delete this emotion
                                input?
                            </p>
                        </v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="closeDelete"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="deleteItemConfirm"
                            >
                                OK
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog> -->
            </template>
        </v-data-table>
    </div>
</template>

<script>
import moment from "moment";
import { emotionMixin } from "@/helpers/emotionMixin.js";
import HistoryDatePicker from "@/components/HistoryDatePicker.vue";
import HistoryTimePicker from "@/components/HistoryTimePicker.vue";

export default {
    name: "EmotionTable",
    mixins: [emotionMixin],
    components: {
        HistoryDatePicker,
        HistoryTimePicker,
    },
    data() {
        return {
            items: ["<=", ">=", "="],
            emotionValues: ["", 1, 2, 3],
            dateMenu: false,
            timeMenu: false,
            // must be modified when we use real data
            headers: [
                {
                    text: "Happiness",
                    value: "happiness",
                    sortable: false,
                    filter: (value) => {
                        if (this.happinessFilter === "") return true;
                        return value === this.happinessFilter;
                    },
                },
                {
                    text: "Excitement",
                    value: "excitement",
                    sortable: false,
                    filter: (value) => {
                        if (this.excitementFilter === "") return true;
                        return value === this.excitementFilter;
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
                    text: "Actions",
                    value: "actions",
                    sortable: false,
                },
            ],
            date: "",
            time: "",
            dialog: false,
            //dialogDelete: false,
            editing: false,
            editedItem: {
                happiness: 0,
                excitement: 0,
                date: "",
                time: "",
                id: -1,
            },
            defaultItem: {
                happiness: 0,
                excitement: 0,
                date: "",
                time: "",
                id: -1,
            },
            timeFilter: "",
            dateFilter: "",
            happinessFilter: "",
            excitementFilter: "",

            emotions: [
                {
                    happiness: 2,
                    excitement: 2,
                    date: "07/30/2021",
                    time: "16:00",
                    id: 0,
                },
                {
                    happiness: 3,
                    excitement: 3,
                    date: "07/07/2011",
                    time: "18:00",
                    id: 1,
                },
                {
                    happiness: 1,
                    excitement: 1,
                    date: "07/07/2017",
                    time: "16:00",
                    id: 2,
                },
                {
                    happiness: 1,
                    excitement: 2,
                    date: "07/07/2018",
                    time: "18:00",
                    id: 3,
                },
                {
                    happiness: 1,
                    excitement: 3,
                    date: "08/22/2020",
                    time: "18:00",
                    id: 4,
                },
                {
                    happiness: 2,
                    excitement: 1,
                    date: "06/12/2019",
                    time: "16:00",
                    id: 5,
                },
                {
                    happiness: 1,
                    excitement: 1,
                    date: "07/07/2014",
                    time: "18:00",
                    id: 6,
                },
                {
                    happiness: 1,
                    excitement: 2,
                    date: "07/07/2015",
                    time: "18:00",
                    id: 7,
                },
                {
                    happiness: 2,
                    excitement: 1,
                    date: "07/07/2019",
                    time: "16:00",
                    id: 8,
                },
                {
                    happiness: 2,
                    excitement: 1,
                    date: "06/07/2020",
                    time: "18:00",
                    id: 9,
                },
                {
                    happiness: 2,
                    excitement: 2,
                    date: "06/06/2020",
                    time: "18:00",
                    id: 10,
                },
            ],
        };
    },
    // state getters you need to use
    computed: {
        formTitle() {
            return this.editing === false
                ? "New Emotion Input"
                : "Edit Emotion Input";
        },
        convertDate() {
            if (this.editedItem.date)
                return moment(this.editedItem.date).format("DD/MM/YYYY");
            else return "Select Date";
        },
        convertTime() {
            if (this.editedItem.time) {
                return moment
                    .utc(this.editedItem.time, "HH:mm")
                    .format("HH:mm");
            } else return "Select Time";
        },
    },
    methods: {
        getSelectedDate(date) {
            this.editedItem.date = date;
        },
        getSelectedTime(time) {
            this.editedItem.time = time;
        },
        selectEmotion(emotion) {
            this.$emit("selectedEmotion", emotion);
        },
        displayHappiness(happiness) {
            if (happiness === 1) {
                return "fas fa-angry";
            } else if (happiness === 2) {
                return "fas fa-smile-beam";
            } else if (happiness === 3) {
                return "fas fa-laugh-beam";
            } else {
                return "";
            }
        },
        displayExcitement(excitement) {
            if (excitement === 1) {
                return "fas fa-tired";
            } else if (excitement === 2) {
                return "fas fa-smile-beam";
            } else if (excitement === 3) {
                return "fas fa-grin-stars";
            } else {
                return "";
            }
        },
        checkEmotionInput(editing) {
            // no need to check id here
            if (
                this.editedItem.happiness === 0 ||
                this.editedItem.excitement === 0 ||
                this.editedItem.date === "" ||
                this.editedItem.time === ""
            ) {
                this.$toaster.showMessage({
                    message: "Enter all options!",
                    color: "dark",
                    btnColor: "pink",
                });
            } else {
                let date = moment(this.editedItem.date)
                    .format("MM/DD/YYYY")
                    .toString();
                let time = moment
                    .utc(this.editedItem.time, "HH:mm")
                    .format("HH:mm")
                    .toString();
                let parameters = {
                    timestamp: moment(
                        moment(date + " " + time).format("MM-DD-YYYY HH:mm")
                    ).format("x"),
                    arousal: this.editedItem.excitement,
                    valence: this.editedItem.happiness,
                };

                if (editing) {
                    parameters["activityId"] = this.editedItem.id;
                    parameters["modify"] = true;
                }
                this.postEmotion(parameters);
            }
        },
        editItem(item) {
            this.editedItem = Object.assign({}, item);
            //this.editedItem.originalId = item.id;
            this.dialog = true;
            this.editing = true;
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editing = false;
            });
        },
        save() {
            this.checkEmotionInput(this.editing);
            this.close();
        },
        // deleteItem(id) {
        //     //this.editedItem.originalId = id;
        //     this.dialogDelete = true;
        // },
        // deleteItemConfirm() {
        //     this.closeDelete();
        // },
        // closeDelete() {
        //     this.dialogDelete = false;
        //     this.$nextTick(() => {
        //         this.editedItem = Object.assign({}, this.defaultItem);
        //     });
        // },
    },
};
</script>

<style>
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
    margin-left: 12px;
    background: rgba(0, 0, 0, 0.15);
}
.mdi-pencil {
    border-radius: 50%;
    padding: 0.2rem;
    background: rgba(0, 0, 0, 0.15);
    margin-left: 15px;
}
.icon {
    margin-left: 15px;
}
.selector {
    width: 18rem;
}
</style>