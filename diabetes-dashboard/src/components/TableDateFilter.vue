<template>
    <v-menu
        ref="dateMenu"
        v-model="dateMenu"
        :close-on-content-click="false"
        :return-value.sync="date"
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
                v-model="date"
                mode="date"
                is-required
                is24hr
                class="datePicker"
            />
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="dateMenu = false">
                Cancel
            </v-btn>
            <v-btn
                text
                color="primary"
                @click="$refs.dateMenu.save(date); emitDate()"
            >
                OK
            </v-btn>
        </v-container>
    </v-menu>
</template>

<script>
import moment from 'moment';
export default {
    name: "TableDateFilter",
    data() {
        return {
            dateMenu: false,
            date: ""
        };
    },
    computed: {
        convertDate() {
            if (this.date)
                return moment(this.date).format("DD/MM/YYYY").toString();
            else return "Select Date";
        },
    },
    methods: {
        emitDate() {
            this.$emit("selectedDate", this.date);
        },
    }
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