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
import Data from '@/repositories/Data.js';
import activities from '@/components/configurations/queryProperties.js';
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
        ...mapState(['filter', 'data', 'date', 'filteredData']),
        selectedParameters() {
            return Object.entries(this.parameters)
                .filter(f => f[1] !== null)
                .map(d => d[0]);
        },
        validation() {
            if (this.parameters.insulinMax < this.parameters.insulinMin
                && this.parameters.insulinMax !== null)
                return false;
            return true;
        }
    },
    methods: {
        async applyFiltering() {
            if (this.validation) {
                var items = [];
                const selection = this.checkSelection({
                    date: this.parameters.date,
                    activity: this.parameters.activity,
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
                const keys = Object.keys(selection);
                if (keys.includes('date') || keys.includes('activity')) {
                    const config = {
                        startDate: (this.parameters.date)
                            ? selection['date'][0]
                            : this.date.start.format('DD-MM-YYYY'),
                        endDate: (this.parameters.date)
                            ? selection['date'][1]
                            : this.date.end.format('DD-MM-YYYY'),
                        exerciseTypes: (this.parameters.activity)
                            ? selection['activity']
                                .map(d => d.toUpperCase())
                                .join(',')
                            : activities[3].properties[0].properties
                                .map(d => d.toUpperCase())
                                .join(',')
                    };
                    this.$store.dispatch('setDate', {
                        start: selection['date'][0],
                        end: selection['date'][1]
                    });
                    await Data.fetch(config, this.$cookies.get('JWT')).then(
                        (dataPromise) => dataPromise,
                        (err) => console.log(err))
                        .then(data => {
                            items = data.data;
                            this.$store.dispatch('setData', items);
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
                    for (let item in this.data['glucose']) {
                        items['glucose'][item].glucoseLevel =
                            filterHelpers['glucose'](
                                this.data['glucose'][item].glucoseLevel,
                                selection['glucose']
                            );
                    }
                }
                if (keys.includes('emotion')) {
                    for (let item in this.data['mood']) {
                        items['mood'][item].arousal =
                            filterHelpers['emotion'](
                                this.data['mood'][item].arousal,
                                selection['emotion'][0],
                            );
                        items['mood'][item].valence =
                            filterHelpers['emotion'](
                                this.data['mood'][item].valence,
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
                    insulin value is less than maximum number.`,
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