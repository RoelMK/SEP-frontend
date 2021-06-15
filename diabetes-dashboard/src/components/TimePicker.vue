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
                outlined
                dense
                readonly
                v-bind="attrs"
                append-icon="mdi-close"
                @click:append="clear"
                prepend-inner-icon="mdi-clock-outline"
                v-on="on"
            ></v-text-field>
        </template>
        <v-container class="timePickerContainer">
            <vc-date-picker
                v-model="timeRange"
                mode="time"
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
                @click="update"
            >
                OK
            </v-btn>
        </v-container>
    </v-menu>
</template>

<script>
import moment from 'moment';

export default {
    props: {
        reload: {
            type: Boolean,
            default: null
        }
    },
    data() {
        return {
            timeMenu: false,
            timeRange: {
                start: null,
                end: null,
            },
        };
    },
    watch: {
        reload: function() {
            this.timeRange = { start: null, end: null };
        }
    },
    computed: {
        timeRangeText() {
            if (this.timeRange.start && this.timeRange.end)
                return (
                    moment(this.timeRange.start).format("HH:mm") +
                    " - " +
                    moment(this.timeRange.end).format("HH:mm")
                );
            else
                return 'Select Time Range';
        },
    },
    methods: {
        update() {
            var format = 'HH:mm';
            this.$refs.timeMenu.save(this.timeRange);
            this.$emit('timeUpdated', {
                start: moment(this.timeRange.start).format(format),
                end: moment(this.timeRange.end).format(format)
            });
        },
        clear() {
            this.timeRange = { start: null, end: null };
            this.$emit('timeUpdated', null);
        }
    }
};
</script>

<style scoped>
.timePicker {
    border: none;
}
.timePickerContainer {
    background-color: white;
}
</style>