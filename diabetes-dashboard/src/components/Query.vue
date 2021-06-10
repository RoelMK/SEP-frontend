<template>
    <div>
        <v-row v-if="selected === null" class="mx-0">
            <v-col cols="6" class="pl-0">
                <v-select v-model="selected" :items="properties.map(d => d.label)" label="Property" dense outlined></v-select>
            </v-col>
        </v-row>
        <v-row v-else class="mx-0">
            <v-col cols="6" class="pl-0">
                <v-select v-model="selected" :items="properties.map(d => d.label)" label="Property" dense outlined></v-select>
            </v-col>
            <v-col v-for="(property, index) in properties[selectionMapper[selected]].properties" :key="index">
                <DatePicker v-if="property.isDate" v-on:dateUpdated="datetime_ = $event" />
                <TimePicker v-if="property.isTime" v-on:timeUpdated="datetime_ = $event" />
                <v-text-field v-if="property.isSearchable" outlined dense label="Enter Food Name"></v-text-field>
                <div v-if="property.properties.length > 0">
                    <v-select v-if="property.isIcon" :items="property.properties" :label="property.label" dense outlined>
                        <template slot="selection" slot-scope="data">
                            <v-icon>{{ data.item }}</v-icon>
                        </template>
                        <template slot="item" slot-scope="data">
                            <v-icon>{{ data.item }}</v-icon>
                        </template>
                    </v-select>
                    <v-select v-else multiple :items="property.properties" :label="property.label" dense outlined></v-select>
                </div>
            </v-col>
            <v-col cols="1"><v-btn icon elevation="2" v-on:click="$emit('removeInstance', idx)"><v-icon>mdi-minus</v-icon></v-btn></v-col>
        </v-row>
    </div>
</template>

<script>
import DatePicker from '@/components/DatePicker.vue';
import TimePicker from '@/components/TimePicker.vue';
import properties from '@/components/configurations/queryProperties.js';

export default {
    components: {
        TimePicker,
        DatePicker
    },
    props: {
        idx: {
            type: Number,
            default: null,
        },
    },
    data() {
        return {
            datetime_: null,
            selected: null,
            properties: properties,
            selectionMapper: {
                "Date Range": 0,
                "Time Range": 1,
                "Glucose": 2,
                "Activity": 3,
                "Emotion": 4,
                "Food": 5,
            }
        };
    },
};
</script>

<style>

</style>