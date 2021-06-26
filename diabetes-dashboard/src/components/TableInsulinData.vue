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

        <v-data-table :headers="headers" :items="insulinData" elevation="0">
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

            <template v-slot:item="{ item }">
                <tr>
                    <td width="10%" @click="selectInsulin(item)">
                        {{ item.amount }}
                    </td>
                    <td width="10%" @click="selectInsulin(item)">
                        {{ displayType(item.type) }}
                    </td>
                    <td width="10%" @click="selectInsulin(item)">
                        {{ item.date }}
                    </td>
                    <td width="10%" @click="selectInsulin(item)">
                        {{ item.time }}
                    </td>
                    <td width="10%">
                        <v-icon small @click="editItem(item)">
                            mdi-pencil
                        </v-icon>
                        <v-icon small @click="showDeleteDialog(item)">
                            mdi-minus
                        </v-icon>
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
                                        @selectedDate="editedItem.date = $event"
                                        :date="editedItem.date"
                                    />
                                </v-row>
                                <v-row>
                                    <HistoryTimePicker
                                        @selectedTime="editedItem.time = $event"
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

                <v-dialog v-model="dialogDelete" max-width="500px">
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
                </v-dialog>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import moment from "moment";
import HistoryDatePicker from "@/components/HistoryDatePicker.vue";
import HistoryTimePicker from "@/components/HistoryTimePicker.vue";
import Data from "@/repositories/Data.js";
import { deleteMixin } from "@/helpers/deleteMixin.js";
import { mapState } from "vuex";

export default {
    // name component
    name: "TableInsulinData",
    // specify mixins
    mixins: [deleteMixin],
    // include the following components
    components: {
        HistoryDatePicker,
        HistoryTimePicker,
    },
    watch: {
        //watch filteredData for changes
        filteredData: function (value) {
            // if filteredData has contents
            if (value.length > 0) {
                // update insulinData using it
                this.insulinData = this.convertInsulin(value.insulin);
            } else {
                // otherwise update insulinData using data
                this.insulinData = this.convertInsulin(this.data.insulin);
            }
        },
    },
    data() {
        return {
            // store insulin data
            insulinData: [],
            // local filter operators
            items: ["<=", ">=", "="],
            headers: [
                // amount header
                {
                    text: "Amount",
                    value: "amount",
                    sortable: false,
                    // filter amount based on chosen filter operator and value
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
                // type header
                {
                    text: "Type",
                    value: "type",
                    sortable: false,
                    // filter type
                    filter: (value) => {
                        if (this.typeFilter === "") return true;
                        return this.displayType(value) === this.typeFilter;
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
                // actions header
                {
                    text: "Actions",
                    value: "actions",
                    sortable: false,
                },
            ],
            // variable to store editing state
            editing: false,
            // variable to store dialog state
            dialog: false,
            // variable to store delete editing state
            dialogDelete: false,
            // object to store property values of an edited item
            editedItem: {
                amount: 0,
                type: "",
                date: "",
                time: "",
                id: -1,
            },
            // object to represent a default item
            defaultItem: {
                amount: "",
                type: "",
                date: "",
                time: "",
                id: -1,
            },
            // insulin types
            types: ["Rapid", "Slow"],
            // chosen time filter
            timeFilter: "",
            // chosen date filter
            dateFilter: "",
            // insulin filter types
            typeFilterItems: ["", "Rapid", "Slow"],
            // chosen amount filter
            amountFilter: "",
            // store insulin amount
            amount: "",
            // chosen type filter
            typeFilter: "",
            // date value
            date: "",
            // time value
            time: "",
        };
    },
    methods: {
        /**
         * Convert initial data object to a structure used in a table
         * @param  { any }    data data object
         * @return { void }
         */
        convertInsulin(data) {
            return data.map((f) => ({
                amount: f.insulinAmount,
                type: f.insulinType,
                date: moment(new Date(f.timestamp)).format("yyyy-MM-DD"),
                time: moment(new Date(f.timestamp)).format("HH:mm"),
                id: f.activityId,
            }));
        },
        /**
         * Handle row click action
         * @param  { any }    insulin insulin object
         * @return { void }
         */
        selectInsulin(insulin) {
            let startTime = moment(insulin.time, "HH:mm")
                .subtract(2, "hours")
                .format("HH:mm");
            let endTime = moment(insulin.time, "HH:mm")
                .add(2, "hours")
                .format("HH:mm");
            let start = moment(
                moment(insulin.date + " " + startTime, "yyyy-MM-DD HH:mm")
            ).format("YYYY-MM-DDTHH:mm");
            let end = moment(
                moment(insulin.date + " " + endTime, "yyyy-MM-DD HH:mm")
            ).format("YYYY-MM-DDTHH:mm");
            this.$store.dispatch("setNewTimeFrame", {
                start,
                end,
                now: moment(),
            });
        },
        /**
         * Convert value of insulin type to a respective string
         * @param  { number }    type insulin type as a number
         * @return { string }
         */
        displayType(type) {
            if (type === 0) {
                return "Rapid";
            } else {
                return "Slow";
            }
        },
        /**
         * Check insulin fields in editing mode and post new
         * settings upon change approval
         * @param  { boolean }    editing validation variable
         * @return { void }
         */
        async checkInsulinInput(editing) {
            // check if a necessary property was not set
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
                // prepare the date for request
                let date = moment(this.editedItem.date)
                    .format("MM/DD/YYYY")
                    .toString();
                // prepare the time for request
                let time = moment
                    .utc(this.editedItem.time, "HH:mm")
                    .format("HH:mm")
                    .toString();
                // set parameters for request
                let parameters = {
                    // get timestamp
                    timestamp: moment(
                        moment(date + " " + time, "MM/DD/YYYY HH:mm")
                    ).format("x"),
                    //get insulin type
                    insulinType: this.editedItem.type === "Rapid" ? 0 : 1,
                    // get insulin amount
                    insulinAmount: parseInt(this.editedItem.amount),
                };
                if (editing) {
                    // if in editing mode, add activityId and set it
                    parameters["activityId"] = this.editedItem.id;
                    // get token
                    let token = this.$cookies.get("JWT");
                    if (this.$store.state.supervising.token) {
                        token = this.$store.state.supervising.token;
                    }

                    let insulin = await Data.postInsulin(
                        parameters,
                        token
                    ).then(
                        (resp) => {
                            this.$toaster.showMessage({
                                message: "Upload is successful",
                                color: "dark",
                                btnColor: "pink",
                            });
                            return resp.data;
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
                    // update local data
                    this.$store.commit("UPDATE_INSULIN", insulin);
                    this.updateInsulinTable();
                } else {
                    // get token
                    let token = this.$cookies.get("JWT");
                    if (this.$store.state.supervising.token) {
                        token = this.$store.state.supervising.token;
                    }
                    let insulin = await Data.postInsulin(
                        parameters,
                        token
                    ).then(
                        (resp) => {
                            this.$toaster.showMessage({
                                message: "Upload is successful",
                                color: "dark",
                                btnColor: "pink",
                            });
                            return resp.data;
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
                    // update local data
                    this.$store.commit("ADD_INSULIN", insulin);
                    this.updateInsulinTable();
                }
            }
        },
        /**
         * Assign field value to an object upon input
         * @param  { any }    item selected item from table
         * @return { void }
         */
        editItem(item) {
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
            this.editing = true;
        },
        /**
         * Close editing pop up
         * @return { void }
         */
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editing = false;
            });
        },
        /**
         * Save modified fields
         * @return { void }
         */
        save() {
            this.checkInsulinInput(this.editing);
            this.close();
        },
        /**
         * Show delete pop up
         * @param  { any }    item item selected item from table
         * @return { void }
         */
        showDeleteDialog(item) {
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },
        /**
         * Confirm deletion of the item from table
         * @return { void }
         */
        deleteItemConfirm() {
            let parameters = { activityId: this.editedItem.id };
            this.deleteItem(parameters);
            this.closeDelete();
            this.$store.commit("DELETE_INSULIN", parameters.activityId);
            this.updateInsulinTable();
        },
        /**
         * Close delete pop up
         * @return { void }
         */
        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
            });
        },
        /**
         * Update values in insulin table
         * @return { void }
         */
        updateInsulinTable() {
            // if filteredData has contents use that to update table
            if (this.filteredData > 0) {
                this.insulinData = this.convertInsulin(
                    this.filteredData.insulin
                );
            } else {
                // otherwise use data
                this.insulinData = this.convertInsulin(this.data.insulin);
            }
        },
    },
    computed: {
        // obtain "filteredData", "data" from store state
        ...mapState(["filteredData", "data"]),
        // set title of the pop up
        formTitle() {
            return this.editing === false
                ? "New Insulin Input"
                : "Edit Insulin Input";
        },
    },
    created() {
        this.updateInsulinTable();
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
    margin-left: 27px;
}
.mdi-minus {
    border-radius: 50%;
    padding: 0.2rem;
    background: rgba(0, 0, 0, 0.15);
    margin-left: 15px;
}
.mdi-pencil {
    border-radius: 50%;
    padding: 0.2rem;
    background: rgba(0, 0, 0, 0.15);
    margin-left: 15px;
}
.selector {
    width: 13.3rem;
}
</style>