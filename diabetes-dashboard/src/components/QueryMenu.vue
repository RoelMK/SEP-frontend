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
                    :property="property"
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
                time: null,
                glucose: null,
                activity: null,
                arousal: null,
                valence: null,
            },
            properties: properties,
            reload: false,
            emotionMap: {
                valence: {
                    'fas fa-angry': 1,
                    'fas fa-smile-beam': 2,
                    'fas fas fa-laugh-beam': 3
                },
                arousal: {
                    'fas fa-tired': 1,
                    'fas fa-smile-beam': 2,
                    'fas fa-grin-stars': 3
                },
            }
        };
    },
    computed: {
        ...mapState(['filter', 'data']),
        selectedParameters() {
            return Object.entries(this.parameters)
                .filter(f => f[1] !== null)
                .map(d => d[0]);
        },
        validation() {
            if (this.parameters.insulinMax < this.parameters.insulinMin)
                return false;
            if (this.parameters.date && this.parameters.time)
                if (this.parameters.date.start !== this.parameters.date.end)
                    return false;
            return true;
        }
    },
    methods: {
        applyFiltering() {
            // TODO: Remove options once we get more data in the backend
            if (this.validation) {
                const items = JSON.parse(JSON.stringify(this.data));
                // TODO remove 10-04-2027
                const date = (this.parameters.date)
                    ? this.parameters.date.start
                    : moment('10-04-2027', 'DD-MM-YYYY')
                        .format('DD-MM-YYYY');
                const selection = this.checkSelection({
                    time: this.parameters.time,
                    insulin: {
                        max: this.parameters.insulinMax,
                        min: this.parameters.insulinMin
                    },
                    glucose: this.parameters.glucose,
                    emotion: {
                        arousal: this.emotionMap
                            .arousal[this.parameters.arousal],
                        valence: this.emotionMap
                            .valence[this.parameters.valence]
                    }
                });
                const selectionKeys = Object.keys(selection);
                for (let item in this.data) {
                    if (selectionKeys.includes('insulin'))
                        items[item].insulinAmount = filterHelpers['insulin'](
                            this.data[item].insulinAmount,
                            ...selection['insulin']
                        );
                    if (selectionKeys.includes('time')) {
                        items[item].timestamp = filterHelpers['time'](
                            this.data[item].timestamp,
                            date,
                            ...selection['time']
                        );
                    }
                    if (selectionKeys.includes('glucose')) {
                        items[item].glucoseLevel = filterHelpers['glucose'](
                            this.data[item].glucoseLevel,
                            selection['glucose']
                        );
                    }
                    if (selectionKeys.includes('emotion')) {
                        items[item].arousal = filterHelpers['emotion'](
                            this.data[item].arousal,
                            selection['emotion'][0],
                        );
                        items[item].valence = filterHelpers['emotion'](
                            this.data[item].valence,
                            selection['emotion'][1],
                        );
                    }
                }
                this.$store.dispatch('setFilteredData', items);
                this.$store.dispatch('showFilter', { show: false });
                this.resetSelection();
            } else {
                this.$toaster.showMessage({
                    message: `Error occured. Please, check whether mininum
                    insulin value is less than maximum number and/or selected
                    date is not a range when filtering on time attribute.`,
                    color: 'dark',
                    btnColor: 'pink',
                    timeout: 6500
                });
            }
        },
        resetSelection() {
            for (let element in this.parameters) {
                this.parameters[element] = null;
            }
            this.reload = !this.reload;
        },
        updateParameters(index, value) {
            this.parameters[index] = value;
        },
        cancelFiltering() {
            this.$store.dispatch('showFilter', { show: false });
            this.resetSelection();
        },
        formatLabel(str) {
            var isCapital =  str.match(/[A-Z]/);
            if (isCapital) {
                str = str.slice(0, isCapital.index)
                    + " " + str.slice(isCapital.index);
            }
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        setupParameters(parameters) {
            // TODO: Remove 10-04-2027
            if (!parameters.date)
                var now = moment('10-04-2027', 'DD-MM-YYYY')
                    .format('DD-MM-YYYY');
            return {
                startDate: (parameters.date) ? parameters.date.start : now,
                endDate: (parameters.date) ? parameters.date.end : now,
                exerciseTypes: (parameters.activity)
                    ? parameters.activity.map(d => d.toUpperCase()).join(',')
                    : ''
            };
        },
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