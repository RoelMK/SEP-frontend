<template>
    <v-menu
        ref="timeMenu"
        v-model="timeMenu"
        :close-on-content-click="false"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        min-width="auto"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="convertTime"
                label="Select time"
                prepend-icon="mdi-clock"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
        </template>
        <v-container class="timePickerContainer">
            <vc-date-picker
                v-model="time"
                mode="time"
                :timezone="'utc'"
                is-required
                is24hr
                class="timePicker"
            />
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="timeMenu = false">
                Cancel
            </v-btn>
            <v-btn
                text
                color="primary"
                @click="$refs.timeMenu.save(time); emitTime()"
            >
                OK
            </v-btn>
        </v-container>
    </v-menu>
</template>

<script>
import moment from 'moment';
export default {
    name: "TableTimeFilter",
    data() {
        return {
            timeMenu: false,
            time: ""
        };
    },
    computed: {
        convertTime() {
            if (this.time)
                return moment.utc(this.time).format("HH:mm").toString();
            else return "Select Time";
        },
    },
    methods: {
        emitTime() {
            this.$emit("selectedTime", this.time);
        },
    }
};
</script>

<style>
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