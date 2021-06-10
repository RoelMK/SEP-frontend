<template>
    <div class="property">
        <p>{{ property.heading }}</p>
        <v-row>
            <v-col v-for="(prop, index) in property.properties" :key="index">
                <DatePicker v-if="prop.isDate" v-on:dateUpdated="update('change', prop.index, $event)" />
                <TimePicker v-else-if="prop.isTime" v-on:timeUpdated="update('change', prop.index, $event)" />
                <v-text-field
                    v-else-if="prop.isSearchable"
                    :label="prop.label"
                    v-on:change="update('change', prop.index, $event)"
                    clearable
                    outlined
                    dense
                ></v-text-field>
                <v-select
                    v-else-if="prop.isIcon"
                    :items="prop.properties"
                    :label="prop.label"
                    v-on:change="update('change', prop.index, $event)"
                    clearable
                    dense
                    outlined
                >
                    <template slot="selection" slot-scope="data">
                        <p class="mb-0">
                            Emotional status:
                            <v-icon class="pl-2">{{ data.item }}</v-icon>
                        </p>
                    </template>
                    <template slot="item" slot-scope="data">
                        <p class="mb-0">
                            Emotional status:
                            <v-icon class="pl-2">{{ data.item }}</v-icon>
                        </p>
                    </template>
                </v-select>
                <v-select
                    v-else
                    :multiple="prop.isMultiple"
                    :items="prop.properties"
                    :label="prop.label"
                    v-on:change="update('change', prop.index, $event)"
                    clearable
                    dense
                    outlined
                ></v-select>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import TimePicker from '@/components/TimePicker.vue';
import DatePicker from '@/components/DatePicker.vue';

export default {
    components: {
        TimePicker,
        DatePicker
    },
    props: {
        property: {
            type: Object,
            default: null
        },
    },
    methods: {
        update(event, index, value) {
            if (Array.isArray(value)) {
                if (value.length <= 0) {
                    this.$emit(event, index, null);
                } else {
                    this.$emit(event, index, value);
                }
            } else {
                this.$emit(event, index, value);
            }
        }
    }
};
</script>