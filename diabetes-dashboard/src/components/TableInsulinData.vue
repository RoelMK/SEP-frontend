<template>
    <div class="table">
        <v-data-table
            :headers="headers"
            :items="getInsulinData"
            :search="search"
            elevation="0"
            @click:row="selectInsulin"
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
                                    <TableDateFilter
                                        @selectedDate="getSelectedDate"
                                    />
                                </v-row>
                                <v-row>
                                    <TableTimeFilter
                                        @selectedTime="getSelectedTime"
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

            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small @click="editItem(item)"> mdi-pencil </v-icon>
                <v-icon small @click="deleteItem(item.id)"> mdi-minus </v-icon>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import TableDateFilter from "@/components/TableDateFilter.vue";
import TableTimeFilter from "@/components/TableTimeFilter.vue";
import Insulin from "@/repositories/Insulin.js";

export default {
    name: "TableInsulinData",
    components: {
        TableDateFilter,
        TableTimeFilter,
    },
    // must match data values from json
    data() {
        return {
            // must be modified when we use real data
            headers: [
                {
                    text: "Value",
                    value: "userId",
                    sortable: false,
                },
                {
                    text: "Type",
                    value: "id",
                    sortable: false,
                },
                {
                    text: "Date",
                    value: "title",
                    sortable: false,
                },
                {
                    text: "Actions",
                    value: "actions",
                    sortable: false,
                },
            ],
            editing: false,
            dialog: false,
            dialogDelete: false,
            editedItem: {
                amount: 0,
                type: "",
                date: "",
                time: "",
            },
            defaultItem: {
                amount: "",
                type: "",
                date: "",
                time: "",
            },
            search: "",
            types: ["Rapid", "Long"],
        };
    },
    methods: {
        ...mapActions([
            "fetchInsulinData",
            "addInsulinInput",
            "deleteInsulinInput",
            "updateInsulinInput",
        ]),

        getSelectedDate(date) {
            this.editedItem.date = date;
        },

        getSelectedTime(time) {
            this.editedItem.time = time;
        },

        selectInsulin(insulin) {
            this.$emit("selectedInsulin", insulin);
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

        checkInsulinInput() {
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
                    .format("DD/MM/YYYY")
                    .toString();
                let time = moment
                    .utc(this.editedItem.time)
                    .format("HH:mm")
                    .toString();
                let insulinType = "";
                if (this.editedItem.type === "Rapid") {
                    insulinType = 0;
                } else {
                    insulinType = 1;
                }

                let parameters = {
                    timestamp: moment(
                        moment(date + " " + time).format("MM-DD-YYYY HH:mm")
                    ).format("x"),
                    type: insulinType,
                    amount: parseInt(this.editedItem.amount),
                    activityId: 2,
                };
                console.log(parameters.timestamp);
                this.postInsulin(parameters);
            }
        },

        editItem(item) {
            this.editedItem = Object.assign({}, item);
            this.editedItem.originalId = item.id;
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
                this.updateInsulinInput({
                    originalId: this.editedItem.originalId,
                    userId: this.editedItem.userId,
                    id: this.editedItem.id,
                    title: this.editedItem.title,
                });
            } else {
                this.checkInsulinInput();
            }
            this.close();
        },
        deleteItem(id) {
            this.editedItem.originalId = id;
            this.dialogDelete = true;
        },
        deleteItemConfirm() {
            this.deleteInsulinInput(this.editedItem.originalId);
            this.closeDelete();
        },
        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
            });
        },
    },
    // state getters you need to use
    computed: {
        ...mapGetters(["getInsulinData"]),

        formTitle() {
            return this.editing === false
                ? "New Insulin Input"
                : "Edit Insulin Input";
        },
    },
    // when a component is created call actions
    created() {
        this.fetchInsulinData();
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
.mdi-minus {
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
</style>