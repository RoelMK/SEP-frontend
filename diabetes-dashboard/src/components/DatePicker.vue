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
                label="Select Start and End Date"
                readonly
                outlined
                dense
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker
            range
            v-model="dateRange"
            no-title
            scrollable
            show-adjacent-months
        >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="dateMenu = false">
                Cancel
            </v-btn>
            <v-btn
                text
                color="primary"
                @click="$refs.dateMenu.save(dateRange); $emit('dateUpdated', dateRange)"
            >
                OK
            </v-btn>
        </v-date-picker>
    </v-menu>
</template>

<script>
export default {
    data() {
        return {
            dateMenu: false,
            dateRange: [new Date().toISOString().substr(0, 10)],
        };
    },
    computed: {
        dateRangeText() {
            return this.dateRange.join(" - ");
        },
    },
};
</script>