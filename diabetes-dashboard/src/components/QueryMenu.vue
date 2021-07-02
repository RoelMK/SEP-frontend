<template>
    <v-dialog v-model="filter.show" max-width="800" persistent>
        <v-card>
            <v-card-title>Querying options</v-card-title>
            <v-card-text class="pb-0">
                <v-row align="center" class="mx-0">
                    <v-col class="pl-0">
                        <p v-if="selectedParameters.length <= 0" class="mt-5">No filters applied</p>
                        <div class="mb-3" v-else>
                            <v-chip
                                v-for="(param, index) in selectedParameters"
                                :key="index"
                                color="indigo"
                                class="mr-2"
                                label
                                filter
                                outlined
                            >
                                {{ formatLabel(param) }}
                            </v-chip>
                        </div>
                    </v-col>
                </v-row>
                <Query
                    v-for="(property, index) in properties"
                    :reload="reload"
                    :key="index"
                    :properties="property"
                    v-on:change="updateParameters"
                />
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="cancelFiltering">
                    Cancel
                </v-btn>
                <v-btn color="green darken-1" text @click="applyFiltering">
                    Apply Filters
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import Query from '@/components/Query.vue';
import properties from '@/components/configurations/queryProperties.js';
import filterHelpers from '@/helpers/filter.js';
import moment from 'moment';
import Data from '@/repositories/Data.js';
import { mapState } from 'vuex';

export default {
    components: {
        Query
    },
    data() {
        return {
            parameters: {
                insulinMin: null,
                insulinMax: null,
                date: null,
                glucose: null,
                activity: null,
                arousal: null,
                valence: null,
            },
            properties: properties,
            reload: false
        };
    },
    computed: {
        ...mapState(['filter', 'data', 'date', 'filteredData']),
        // Check parameters that were selected from the query
        // menu in order to show label in the UI
        selectedParameters() {
            return Object.entries(this.parameters)
                .filter(f => f[1] !== null)
                .map(d => d[0]);
        },
        // Validate min/max fields
        validation() {
            if (this.parameters.insulinMax < this.parameters.insulinMin
                && this.parameters.insulinMax !== null)
                return false;
            return true;
        }
    },
    methods: {
        /**
         * Apply filtering onto data object
         * @return { void }
         */
        async applyFiltering() {
            // Validate fields before filtering
            if (this.validation) {
                var items = [];
                // Create an object with selected parameters
                const selection = this.checkSelection({
                    date: this.parameters.date,
                    activity: this.parameters.activity,
                    insulin: {
                        max: this.parameters.insulinMax,
                        min: this.parameters.insulinMin
                    },
                    glucose: this.parameters.glucose,
                    emotion: {
                        arousal: this.$store.state.emotionToValue
                            .arousal[this.parameters.arousal],
                        valence: this.$store.state.emotionToValue
                            .valence[this.parameters.valence]
                    }
                });
                const keys = Object.keys(selection);
                // Check selected filtering options and if that
                // property exists in an object apply specific filtering
                if (keys.includes('date') || keys.includes('activity')) {
                    const config = {
                        startDate: (this.parameters.date)
                            ? selection['date'][0]
                            : this.date.start,
                        endDate: (this.parameters.date)
                            ? selection['date'][1]
                            : this.date.end,
                        exerciseTypes: (this.parameters.activity)
                            ? selection['activity']
                                .map(d => d.toUpperCase())
                                .join(',')
                            : ''
                    };
                    if (this.parameters.date) {
                        this.$store.commit('SET_DATE', {
                            start: selection['date'][0],
                            end: selection['date'][1]
                        });
                    }
                    if (config.startDate.includes("Invalid") ||
                        config.startDate.includes("Invalid")) {
                        this.$toaster.showMessage({
                            message: 'Please select date',
                            color: 'dark',
                            btnColor: 'pink',
                            timeout: 6500
                        });
                        return;
                    }
                    let token = this.$cookies.get("JWT");
                    if (this.$store.state.supervising.token) {
                        token = this.$store.state.supervising.token;
                    }
                    await Data.fetch(config, token).then(
                        (dataPromise) => dataPromise,
                        (err) => console.log(err))
                        .then(data => {
                            items = JSON.parse(JSON.stringify(data.data));
                            this.$store.dispatch('setData', data.data);
                        });
                } else {
                    items = JSON.parse(JSON.stringify(this.data));
                }
                if (keys.includes('insulin')) {
                    for (let item in this.data['insulin']) {
                        items['insulin'][item].insulinAmount =
                            filterHelpers['insulin'](
                                this.data['insulin'][item].insulinAmount,
                                ...selection['insulin']
                            );
                    }
                }
                if (keys.includes('glucose')) {
                    const ranges = (localStorage
                        .getItem('valueHyperglycemia') === null)
                        ? null
                        : {
                            hypers: parseFloat(localStorage
                                .getItem('valueHyperglycemia')),
                            hypos: parseFloat(localStorage
                                .getItem('valueHypoglycemia')),
                        };
                    for (let item in this.data['glucose']) {
                        items['glucose'][item].glucoseLevel =
                            filterHelpers['glucose'](
                                this.data['glucose'][item].glucoseLevel,
                                selection['glucose'],
                                ranges
                            );
                    }
                }
                if (keys.includes('emotion')) {
                    for (let item in this.data['mood']) {
                        var value = items['mood'][item];
                        value.arousal = filterHelpers['emotion'](
                            this.data['mood'][item].arousal,
                            selection['emotion'][0],
                        );
                        value.valence = filterHelpers['emotion'](
                            this.data['mood'][item].valence,
                            selection['emotion'][1],
                        );
                        if (value.arousal === null || value.values === null) {
                            value.arousal = null;
                            value.valence = null;
                        }
                    }
                }
                // Save filtered object in vuex
                this.$store.commit('UPDATE_FILTERED_DATA', items);
                this.$store.commit('SHOW_FILTER', { show: false });
                this.resetSelection();
            } else {
                this.$toaster.showMessage({
                    message: `Error occured. Please, check whether mininum
                    insulin value is less than maximum number.`,
                    color: 'dark',
                    btnColor: 'pink',
                    timeout: 6500
                });
            }
        },
        /**
         * Reset selection in a query menu
         * @return { void }
         */
        resetSelection() {
            for (let element in this.parameters) {
                this.parameters[element] = null;
            }
            this.reload = !this.reload;
        },
        /**
         * Update parameters object
         * @return { void }
         */
        updateParameters(index, value) {
            this.parameters[index] = value;
        },
        /**
         * Cancel filtering
         * @return { void }
         */
        cancelFiltering() {
            this.$store.commit('SHOW_FILTER', { show: false });
            this.resetSelection();
        },
        /**
         * Capitalize first letter of the attribute
         * Split attribute if it is provided in camel case format
         * @param  { string }   str string which is going to be formatted
         * @return { string }
         */
        formatLabel(str) {
            var isCapital =  str.match(/[A-Z]/);
            if (isCapital) {
                str = str.slice(0, isCapital.index)
                    + " " + str.slice(isCapital.index);
            }
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        /**
         * Setup parameters for sending fetch request
         * @param  { any }  parameters Payload of the request
         * @return { any }
         */
        setupParameters(parameters) {
            if (!parameters.date)
                var now = moment().format('DD-MM-YYYY');
            return {
                startDate: (parameters.date) ? parameters.date.start : now,
                endDate: (parameters.date) ? parameters.date.end : now,
                exerciseTypes: (parameters.activity)
                    ? parameters.activity.map(d => d.toUpperCase()).join(',')
                    : ''
            };
        },
        /**
         * Check Selected properties from query menu
         * @param  { any }   parameters Object containing all the properties from
         * query menu. Properties that are not selected are null
         * @return { any }
         */
        checkSelection(parameters) {
            const output = {};
            for (let param in parameters) {
                var member = parameters[param];
                var isObject = typeof member === "object" && member !== null;
                if (isObject && !Array.isArray(member)) {
                    for (let sub in member) {
                        if (member[sub] !== null) {
                            output[param] = Object.values(member);
                            break;
                        }
                    }
                } else {
                    if (member !== null)
                        if (Array.isArray(member))
                            output[param] = member;
                        else
                            output[param] = [member];
                }
            }
            return output;
        }
    }
};
</script>