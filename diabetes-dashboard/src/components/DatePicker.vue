<template>
    <v-menu
        ref="dateMenu"
        v-model="dateMenu"
        :close-on-content-click="false"
        :return-value.sync="dateRange"
        transition="scale-transition"
        offset-y
        min-width="auto"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="dateRangeText"
                readonly
                outlined
                dense
                append-icon="mdi-close"
                @click:append="clear"
                v-bind="attrs"
                prepend-inner-icon="mdi-calendar-text"
                v-on="on"
            ></v-text-field>
        </template>
        <v-container class="datePickerContainer">
            <vc-date-picker
                v-model="dateRange"
                :attributes="attrs"
                mode="date"
                is-expanded
                is-range
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
            dateMenu: false,
            dateRange: {
                start: null,
                end: null,
            },
            attrs: [
                {
                    key: 'today',
                    dot: true,
                    dates: new Date(),
                },
            ]
        };
    },
    watch: {
        // Reset field if reload variable was modified
        reload: function() {
            this.dateRange = { start: null, end: null };
        }
    },
    computed: {
        // Compute fields text
        dateRangeText() {
            if (this.dateRange.start && this.dateRange.end)
                return (
                    moment(this.dateRange.start).format("DD/MM/YYYY") +
                    " - " +
                    moment(this.dateRange.end).format("DD/MM/YYYY")
                );
            else
                return 'Select Date Range';
        },
    },
    methods: {
        /**
         * Update date selection on 'ok' button click
         * @return { void }
         */
        update() {
            var format = 'DD-MM-YYYY';
            this.$refs.dateMenu.save(this.dateRange);
            this.$emit('dateUpdated', {
                start: moment(this.dateRange.start).format(format),
                end: moment(this.dateRange.end).format(format)
            });
        },
        /**
         * Reset selection on 'close' button click
         * @return { void }
         */
        clear() {
            this.dateRange = { start: null, end: null };
            this.$emit('dateUpdated', null);
        }
    }
};
</script>

<style scoped>
.datePickerContainer {
    background-color: white;
}

.datePicker {
    border: none;
}
</style>