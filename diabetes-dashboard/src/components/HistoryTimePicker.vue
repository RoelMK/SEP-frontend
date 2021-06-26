<template>
    <v-menu
        ref="timeMenu"
        v-model="timeMenu"
        :close-on-content-click="false"
        :return-value.sync="insulinTime"
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
                v-model="insulinTime"
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
                @click="
                    $refs.timeMenu.save(insulinTime);
                    emitTime();
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
    name: "HistoryTimePicker",
    // state props used by component
    props: ["time"],
    data() {
        return {
            // store time menu showing state
            timeMenu: false,
            // store time
            insulinTime: "",
        };
    },
    computed: {
        // method to convert time in menu
        convertTime() {
            if (this.insulinTime)
                return moment
                    .utc(this.insulinTime, "HH:mm")
                    .format("HH:mm")
                    .toString();
            else return "Select Time";
        },
    },
    methods: {
        // emit time to parent component
        emitTime() {
            this.$emit("selectedTime", this.insulinTime);
        },
    },
    watch: {
        // watch time prop for changes
        time: {
            handler(after) {
                // update time
                this.insulinTime = after;
            },
            immediate: true,
        },
    },
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