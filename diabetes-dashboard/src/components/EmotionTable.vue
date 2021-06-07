<template>
    <div class="table">
        <v-data-table
            :headers="headers"
            :items="getEmotions"
            item-key="name"
            elevation="0"
            :search="search"
            :hide-default-footer="true"
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
                        <v-col>
                            <v-dialog v-model="dialog" max-width="500px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon v-bind="attrs" v-on="on">
                                        mdi-plus
                                    </v-icon>
                                </template>
                            </v-dialog>
                        </v-col>
                    </v-row>
                </v-container>

                <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{formTitle}}
                            </span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <p class="ml-0 pl-0">
                                    Happiness:
                                    <v-icon
                                        class="icon"
                                        size="25"
                                        v-on:click="editedItem.happiness = 2"
                                        v-bind:color="
                                            editedItem.happiness === 2
                                                ? 'blue darken-2'
                                                : 'gray'
                                        "
                                    >
                                        fas fa-laugh-beam
                                    </v-icon>
                                    <v-icon
                                        class="icon"
                                        size="25"
                                        v-on:click="editedItem.happiness = 1"
                                        v-bind:color="
                                            editedItem.happiness === 1
                                                ? 'blue darken-2'
                                                : 'gray'
                                        "
                                    >
                                        fas fa-smile-beam
                                    </v-icon>
                                    <v-icon
                                        class="icon"
                                        size="25"
                                        v-on:click="editedItem.happiness = 0"
                                        v-bind:color="
                                            editedItem.happiness === 0
                                                ? 'blue darken-2'
                                                : 'gray'
                                        "
                                    >
                                        fas fa-angry
                                    </v-icon>
                                </p>
                                <p class="ml-0 pl-0">
                                    Excitement:
                                    <v-icon
                                        class="icon"
                                        size="25"
                                        v-on:click="editedItem.excitement = 2"
                                        v-bind:color="
                                            editedItem.excitement === 2
                                                ? 'blue darken-2'
                                                : 'gray'
                                        "
                                    >
                                        fas fa-grin-stars
                                    </v-icon>
                                    <v-icon
                                        class="icon"
                                        size="25"
                                        v-on:click="editedItem.excitement = 1"
                                        v-bind:color="
                                            editedItem.excitement === 1
                                                ? 'blue darken-2'
                                                : 'gray'
                                        "
                                    >
                                        fas fa-smile-beam
                                    </v-icon>
                                    <v-icon
                                        class="icon"
                                        size="25"
                                        v-on:click="editedItem.excitement = 0"
                                        v-bind:color="
                                            editedItem.excitement === 0
                                                ? 'blue darken-2'
                                                : 'gray'
                                        "
                                    >
                                        fas fa-tired
                                    </v-icon>
                                </p>
                                <v-row>
                                    <v-text-field
                                        v-model="editedItem.date"
                                        label="Date"
                                    ></v-text-field>
                                </v-row>
                                <v-row>
                                    <v-text-field
                                        v-model="editedItem.time"
                                        label="Time"
                                    ></v-text-field>
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
                                @click="closeDelete">
                                Cancel
                            </v-btn>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="deleteItemConfirm">
                                OK
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
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
                            v-model="time"
                            type="string"
                            label="Before"
                        ></v-text-field>
                    </td>
                    <td></td>
                </tr>
            </template>

            <template v-slot:item="{ item }">
                <tr>
                    <td>
                        <v-icon
                            size="25"
                            v-bind:color="displayExcitement(item.excitement)"
                        >
                            {{ displayHappiness(item.happiness) }}
                        </v-icon>
                    </td>
                    <td>
                        {{ item.date }}
                    </td>
                    <td>
                        {{ item.time }}
                    </td>
                    <td>
                        <v-icon small @click="editItem(item)">
                            mdi-pencil
                        </v-icon>
                        <v-icon small @click="deleteItem(item.id)">
                            mdi-minus
                        </v-icon>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);
export default {
    name: "EmotionTable",
    // must match data values from json
    data() {
        return {
            // must be modified when we use real data
            headers: [
                // {
                //     text: "Happiness",
                //     value: "happiness",
                // },
                // {
                //     text: "Excitement",
                //     value: "excitement",
                // },
                {
                    text: "Emotion",
                    value: "emotion",
                    sortable: false,
                },
                {
                    text: "Date",
                    value: "date",
                    filter: (value) => {
                        if (!this.date) return true;
                        return moment(value) < moment(this.date);
                    },
                },
                {
                    text: "Time",
                    value: "time",
                    filter: (value) => {
                        if (!this.time) return true;
                        return (
                            moment(value, "HH:mm").format("HH:mm") <
                            moment(this.time, "HH:mm").format("HH:mm")
                        );
                    },
                },
                {
                    text: "Actions",
                    value: "actions",
                    sortable: false,
                },
            ],
            search: "",
            date: "",
            time: "",
            dialog: false,
            dialogDelete: false,
            editing: false,
            editedItem: {
                happiness: -1,
                excitement: -1,
                date: "",
                time: "",
            },
            defaultItem: {
                happiness: -1,
                excitement: -1,
                date: "",
                time: "",
            },
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
    },
    methods: {
        displayHappiness(happiness) {
            if (happiness === 0) {
                return "fas fa-angry";
            } else if (happiness === 1) {
                return "fas fa-smile-beam";
            } else {
                return "fas fa-laugh-beam";
            }
        },
        displayExcitement(excitement) {
            if (excitement === 0) {
                return "red";
            } else if (excitement === 1) {
                return "blue darken-2";
            } else {
                return "green";
            }
        },

        ///
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
                this.close();
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
</style>