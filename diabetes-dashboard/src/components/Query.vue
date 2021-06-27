<template>
    <div class="property">
        <p>{{ properties.heading }}</p>
        <v-row>
            <v-col v-for="(prop, index) in properties.properties" :key="index">
                <DatePicker
                    v-if="prop.isDate"
                    :reload="reload"
                    v-on:dateUpdated="update('change', prop.index, $event)"
                />
                <v-text-field
                    v-else-if="prop.isSearchable"
                    v-model="model[index]"
                    :label="prop.label"
                    v-on:change="update('change', prop.index, $event)"
                    clearable
                    outlined
                    dense
                ></v-text-field>
                <v-select
                    v-else-if="prop.isIcon"
                    v-model="model[index]"
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
                <v-text-field
                    v-else-if="prop.isNumber"
                    v-model="model[index]"
                    :label="prop.label"
                    v-on:change="update('change', prop.index, $event)"
                    type="number"
                    min="0"
                    clearable
                    dense
                    outlined
                ></v-text-field>
                <v-select
                    v-else
                    v-model="model[index]"
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
import DatePicker from '@/components/DatePicker.vue';

export default {
    components: {
        DatePicker
    },
    props: {
        properties: {
            type: Object,
            default: null
        },
        reload: {
            type: Boolean,
            default: null,
        },
    },
    watch: {
        // if reload variable was modified reset query field models
        reload() {
            this.model = [];
        }
    },
    data() {
        return {
            model: [],
        };
    },
    methods: {
        /**
         * Update/reset query menu fields
         * @param  { string }   event type of the event to be emitted
         * @param  { number }   index index of the field
         * @param  { any }      value Value of the field
         * @return { void }
         */
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