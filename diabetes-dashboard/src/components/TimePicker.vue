<template>
    <v-menu
        ref="timeMenu"
        v-model="timeMenu"
        :close-on-content-click="false"
        :return-value.sync="timeRange"
        transition="scale-transition"
        offset-y
        min-width="auto"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="timeRangeText"
                label="Select Start and End Time"
                outlined
                dense
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
        </template>
        <v-container class="timePickerContainer">
            <vc-date-picker
                v-model="timeRange"
                mode="time"
                :timezone="'utc'"
                is-expanded
                is-required
                is-range
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
                @click="$refs.timeMenu.save(timeRange); $emit('timeUpdated', timeRange)"
            >
                OK
            </v-btn>
        </v-container>
    </v-menu>
</template>

<script>
import moment from 'moment';

export default {
    data() {
        return {
            timeMenu: false,
            timeRange: {
                start: moment.utc("00:00", "HH:mm"),
                end: moment.utc("23:00", "HH:mm"),
            },
        };
    },
    computed: {
        timeRangeText() {
            return (
                moment.utc(this.timeRange.start).format("HH:mm") +
                " - " +
                moment.utc(this.timeRange.end).format("HH:mm")
            );
        },
    }
};
</script>

<style scoped>
.timePicker {
    border: none;
}
</style>