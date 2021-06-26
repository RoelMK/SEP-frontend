<template>
    <v-menu
        ref="dateMenu"
        v-model="dateMenu"
        :close-on-content-click="false"
        :return-value.sync="insulinDate"
        transition="scale-transition"
        offset-y
        min-width="auto"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="convertDate"
                label="Select date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
        </template>
        <v-container class="datePickerContainer">
            <vc-date-picker
                v-model="insulinDate"
                mode="date"
                is-required
                is24hr
                :max-date="new Date()"
                class="datePicker"
            />
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="dateMenu = false">
                Cancel
            </v-btn>
            <v-btn
                text
                color="primary"
                @click="
                    $refs.dateMenu.save(insulinDate);
                    $emit('selectedDate', insulinDate);
                "
            >
                OK
            </v-btn>
        </v-container>
    </v-menu>
</template>

<script>
import moment from "moment";
export default {
    // name component
    name: "HistoryDatePicker",
    // state props used by component
    props: ["date"],
    data() {
        return {
            // store date menu showing state
            dateMenu: false,
            // store date
            insulinDate: "",
        };
    },
    computed: {
        // method to convert date in menu
        convertDate() {
            if (this.insulinDate)
                return moment(this.insulinDate).format("DD/MM/YYYY").toString();
            else return "Select Date";
        },
    },
    watch: {
        // watch date prop for changes
        date: {
            handler(after) {
                // update date
                this.insulinDate = after;
            },
            immediate: true,
        },
    },
};
</script>

<style>
.datePickerContainer {
    background-color: white;
}
.datePicker {
    border: none;
}
</style>