<template>
    <v-dialog v-model="filter.show" max-width="800">
        <v-card>
            <v-card-title>Querying options</v-card-title>
            {{this.data}}
            <v-card-text class="pb-0">
                <v-row align="center" class="mx-0">
                    <v-col class="pl-0">
                        <p v-if="selectedParameters.length <= 0" class="mt-5">
                            No filters applied
                        </p>
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
                                {{ capitalizeFirstLetter(param) }}
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
                <v-btn
                    color="green darken-1"
                    text
                    @click="filterData"
                >
                    Apply Filters
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import Query from "@/components/Query.vue";
import properties from "@/components/configurations/queryProperties.js";
import { AxiosWrapper } from "@/helpers/wrapper.js";
import { mapState } from "vuex";
import moment from "moment";

const wrapper = new AxiosWrapper();

export default {
    components: {
        Query,
    },
    data() {
        return {
            parameters: {
                date: null,
                time: null,
                glucose: null,
                activity: null,
                arousal: null,
                valence: null,
                food: null,
            },
            properties: properties,
            reload: false,
            data: "",
        };
    },
    computed: {
        ...mapState(["filter"]),
        selectedParameters() {
            return Object.entries(this.parameters)
                .filter((f) => f[1] !== null)
                .map((d) => d[0]);
        },
    },
    methods: {
        updateParameters(index, value) {
            this.parameters[index] = value;
        },
        cancelFiltering() {
            for (let element in this.parameters) {
                this.parameters[element] = null;
            }
            this.reload = !this.reload;
            this.$store.dispatch("showFilter", { show: false });
        },
        capitalizeFirstLetter(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        filterData() {
            let parameters = this.parameters;

            let dataTypes = [];
            let startDate = moment.utc(parameters.date.start)
                .format("DD-MM-yyyy");
            let endDate = moment.utc(parameters.date.end).format("DD-MM-yyyy");
            //let startTime = moment.utc(parameters.time.start).format("HH:mm");
            //let endTime = moment.utc(parameters.time.end).format("HH:mm");

            if(parameters.glucose != null) {
                dataTypes.push("glucose", "insulin");
            }
            if(parameters.arousal != null || parameters.valence != null) {
                dataTypes.push("mood");
            }
            if(parameters.activity != null) {
                dataTypes.push("exercise");
            }
            if(parameters.food != null) {
                dataTypes.push("food");
            }

            wrapper.get(`http://localhost:8080/data?startDate=${startDate}
                &endDate=${endDate}&dataTypes=${dataTypes}
                &union=${false}`, (dataPromise) => dataPromise)
                .then((data) => {this.data = data;});

            this.cancelFiltering();
        },
    },
};
</script>

<style>
.mdi-plus {
    border-radius: 50%;
    padding: 0.2rem;
    background: rgba(0, 0, 0, 0.15);
}
</style>