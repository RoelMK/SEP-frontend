<template>
    <div class="table">
        <div>
            <tr>
                <td class="border">
                    <div class="filterElement">
                        <span class="filterText">Amount</span>
                        <v-select
                            v-model="amountFilter"
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

        <v-data-table
            :headers="headers"
            :items="insulinData"
            elevation="0"
        >
            <template v-slot:[`body.prepend`]>
                <tr>
                    <td>
                        <v-text-field
                            v-model="amount"
                            type="string"
                        ></v-text-field>
                    </td>
                    <td>
                        <v-select v-model="typeFilter" :items="typeFilterItems">
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
            <template v-slot:top>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">
                                {{ formTitle }}
                            </span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-text-field
                                        v-model="editedItem.amount"
                                        label="Amount"
                                    ></v-text-field>
                                </v-row>
                                <v-row>
                                    <v-select
                                        v-model="editedItem.type"
                                        label="Type"
                                        :items="types"
                                    ></v-select>
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
                                Are you sure you want to delete this insulin
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

            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small @click="editItem(item)"> mdi-pencil </v-icon>
                <!-- <v-icon small @click="deleteItem(item.id)"> mdi-minus </v-icon> -->
            </template>
        </v-data-table>
    </div>
</template>

<script>
import moment from "moment";
import HistoryDatePicker from "@/components/HistoryDatePicker.vue";
import HistoryTimePicker from "@/components/HistoryTimePicker.vue";
import Insulin from "@/repositories/Insulin.js";

export default {
    name: "TableInsulinData",
    components: {
        HistoryDatePicker,
        HistoryTimePicker,
    },
    // must match data values from json
    data() {
        return {
            items: ["<=", ">=", "="],
            // must be modified when we use real data
            headers: [
                {
                    text: "Amount",
                    value: "amount",
                    sortable: false,
                    filter: (value) => {
                        if (!this.amount) return true;
                        if (this.amountFilter === "<=") {
                            return value <= this.amount;
                        } else if (this.amountFilter === ">=") {
                            return value >= this.amount;
                        } else {
                            return value == this.amount;
                        }
                    },
                },
                {
                    text: "Type",
                    value: "type",
                    sortable: false,
                    filter: (value) => {
                        if (this.typeFilter === "") return true;
                        return value === this.typeFilter;
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
            editing: false,
            dialog: false,
            //dialogDelete: false,
            editedItem: {
                amount: 0,
                type: "",
                date: "",
                time: "",
                id: -1,
            },
            defaultItem: {
                amount: "",
                type: "",
                date: "",
                time: "",
                id: -1,
            },
            types: ["Rapid", "Long"],
            timeFilter: "",
            dateFilter: "",
            typeFilterItems: ["", "Rapid", "Long"],
            amountFilter: "",
            amount: "",
            typeFilter: "",
            date: "",
            time: "",

            insulinData: [
                {
                    amount: 1,
                    type: "Long",
                    date: "05/30/2021",
                    time: "16:00",
                    id: 0,
                },
                {
                    amount: 1,
                    type: "Long",
                    date: "05/30/2021",
                    time: "16:00",
                    id: 1,
                },
                {
                    amount: 1,
                    type: "Long",
                    date: "05/30/2021",
                    time: "16:00",
                    id: 2,
                },
                {
                    amount: 1,
                    type: "Long",
                    date: "05/30/2021",
                    time: "16:00",
                    id: 3,
                },
                {
                    amount: 1,
                    type: "Long",
                    date: "05/30/2021",
                    time: "16:00",
                    id: 4,
                },
                {
                    amount: 1,
                    type: "Long",
                    date: "05/30/2021",
                    time: "16:00",
                    id: 5,
                },

                {
                    amount: 1,
                    type: "Rapid",
                    date: "05/30/2021",
                    time: "16:00",
                    id: 6,
                },
                {
                    amount: 1,
                    type: "Rapid",
                    date: "05/30/2021",
                    time: "16:00",
                    id: 7,
                },
                {
                    amount: 1,
                    type: "Rapid",
                    date: "05/30/2021",
                    time: "16:00",
                    id: 8,
                },
                {
                    amount: 1,
                    type: "Rapid",
                    date: "05/30/2021",
                    time: "16:00",
                    id: 9,
                },
                {
                    amount: 1,
                    type: "Rapid",
                    date: "05/30/2021",
                    time: "16:00",
                    id: 10,
                },
            ],
        };
    },
    methods: {
        getSelectedDate(date) {
            this.editedItem.date = date;
        },

        getSelectedTime(time) {
            this.editedItem.time = time;
        },

        async postInsulin(parameters) {
            Insulin.post(parameters, this.$cookies.get("JWT")).then(
                () => {
                    this.$toaster.showMessage({
                        message: "Upload is successful",
                        color: "dark",
                        btnColor: "pink",
                    });
                },
                (error) => {
                    console.log(error);
                }
            );
        },

        checkInsulinInput(editing) {
            if (
                this.editedItem.amount === "" ||
                this.editedItem.type === "" ||
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
                    insulinType: this.editedItem.type.toLowerCase(),
                    insulinAmount: parseInt(this.editedItem.amount),
                };
                if (editing) {
                    parameters["activityId"] = this.editedItem.id;
                    parameters["modify"] = true;
                }
                this.postInsulin(parameters);
            }
        },

        editItem(item) {
            this.editedItem = Object.assign({}, item);
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
            this.checkInsulinInput(this.editing);
            this.close();
        },
        // deleteItem(id) {
        //     this.editedItem.originalId = id;
        //     this.dialogDelete = true;
        // },
        // deleteItemConfirm() {
        //     //TODO:
        //     this.closeDelete();
        // },
        // closeDelete() {
        //     this.dialogDelete = false;
        //     this.$nextTick(() => {
        //         this.editedItem = Object.assign({}, this.defaultItem);
        //     });
        // },
    },
    // state getters you need to use
    computed: {
        formTitle() {
            return this.editing === false
                ? "New Insulin Input"
                : "Edit Insulin Input";
        },
    },
    // when a component is created call actions
    created() {
        //this.fetchInsulinData();
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
.mdi-pencil {
    border-radius: 50%;
    padding: 0.2rem;
    background: rgba(0, 0, 0, 0.15);
    margin-left: 15px;
}
.mdi-plus {
    border-radius: 50%;
    padding: 0.2rem;
    background: rgba(0, 0, 0, 0.15);
}
.selector {
    width: 12.3rem;
}
</style>