<template>
    <div class="property">
        <p>{{ property.heading }}</p>
        <v-row>
            <v-col v-for="(prop, index) in property.properties" :key="index">
                <DatePicker
                    v-if="prop.isDate"
                    :reload="reload"
                    v-on:dateUpdated="update('change', prop.index, $event)"
                />
                <TimePicker
                    v-else-if="prop.isTime"
                    :reload="reload"
                    v-on:timeUpdated="update('change', prop.index, $event)"
                />
                <v-text-field
                    v-else-if="prop.isSearchable"
                    v-model="model1"
                    :label="prop.label"
                    v-on:change="update('change', prop.index, $event)"
                    clearable
                    outlined
                    dense
                ></v-text-field>
                <v-select
                    v-else-if="prop.isIcon"
                    :v-model="`model${index + 1}`"
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
                    v-model="model1"
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
        reload: {
            type: Boolean,
            default: null,
        },
    },
    watch: {
        reload: function() {
            this.model1 = null;
            this.model2 = null;
        }
    },
    data() {
        return {
            model1: null,
            model2: null,
        };
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