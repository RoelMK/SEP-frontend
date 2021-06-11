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

        <v-data-table :headers="headers" :items="getEmotions" elevation="0">
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
                        <v-icon small @click="deleteItem(item.id)">
                            mdi-minus
                        </v-icon>
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
                                    <v-menu
                                        ref="dateMenu"
                                        v-model="dateMenu"
                                        :close-on-content-click="false"
                                        :return-value.sync="editedItem.date"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <v-text-field
                                                v-model="convertDate"
                                                label="Select date"
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-container
                                            class="datePickerContainer"
                                        >
                                            <vc-date-picker
                                                v-model="editedItem.date"
                                                mode="date"
                                                is-required
                                                is24hr
                                                class="datePicker"
                                            />
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                text
                                                color="primary"
                                                @click="dateMenu = false"
                                            >
                                                Cancel
                                            </v-btn>
                                            <v-btn
                                                text
                                                color="primary"
                                                @click="
                                                    $refs.dateMenu.save(
                                                        editedItem.date
                                                    )
                                                "
                                            >
                                                OK
                                            </v-btn>
                                        </v-container>
                                    </v-menu>
                                </v-row>
                                <v-row>
                                    <v-menu
                                        ref="timeMenu"
                                        v-model="timeMenu"
                                        :close-on-content-click="false"
                                        :return-value.sync="editedItem.time"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <v-text-field
                                                v-model="convertTime"
                                                label="Select time"
                                                prepend-icon="mdi-clock"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-container
                                            class="timePickerContainer"
                                        >
                                            <vc-date-picker
                                                v-model="editedItem.time"
                                                mode="time"
                                                :timezone="'utc'"
                                                is-required
                                                is24hr
                                                class="timePicker"
                                            />
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                text
                                                color="primary"
                                                @click="timeMenu = false"
                                            >
                                                Cancel
                                            </v-btn>
                                            <v-btn
                                                text
                                                color="primary"
                                                @click="
                                                    $refs.timeMenu.save(
                                                        editedItem.time
                                                    )
                                                "
                                            >
                                                OK
                                            </v-btn>
                                        </v-container>
                                    </v-menu>
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

                <v-dialog v-model="dialogDelete" max-width="500px">
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
                </v-dialog>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import { emotionMixin } from "@/helpers/emotionMixin.js";

export default {
    name: "EmotionTable",
    mixins: [emotionMixin],
    // must match data values from json
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
            dialogDelete: false,
            editing: false,
            editedItem: {
                happiness: 0,
                excitement: 0,
                date: "",
                time: "",
            },
            defaultItem: {
                happiness: 0,
                excitement: 0,
                date: "",
                time: "",
            },
            timeFilter: "",
            dateFilter: "",
            happinessFilter: "",
            excitementFilter: "",
        };
    },
    // state getters you need to use
    computed: {
        ...mapGetters(["getEmotions"]),

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
            if (this.editedItem.time)
                return moment.utc(this.editedItem.time).format("HH:mm");
            else return "Select Time";
        },
    },
    methods: {
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
        checkEmotionInput() {
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
                    .format("DD/MM/YYYY")
                    .toString();
                let time = moment
                    .utc(this.editedItem.time)
                    .format("HH:mm")
                    .toString();

                let parameters = {
                    timestamp: moment(
                        moment(date + " " + time).format("MM-DD-YYYY HH:mm")
                    ).format("x"),
                    arousal: this.editedItem.excitement,
                    valence: this.editedItem.happiness,
                };

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
            if (this.editing) {
                this.close();
            } else {
                this.checkEmotionInput();
            }
            this.close();
        },
        deleteItem(id) {
            //this.editedItem.originalId = id;
            this.dialogDelete = true;
        },
        deleteItemConfirm() {
            this.closeDelete();
        },
        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
            });
        },
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
.mdi-minus {
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
.datePickerContainer {
    background-color: white;
}
.datePicker {
    border: none;
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
    background-color: white;
}
</style>