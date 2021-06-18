<template>
    <v-card-text>
        <v-row>
            <v-col class="legend-header d-flex align-center">
                <h3>Legend</h3>
            </v-col>
        </v-row>
        <v-row class="legend-content">
            <v-col v-for="(item, index) in legend.sections" :key="index">
                <ul>
                    <li v-for="(prop, index) in item.properties" :key="index">
                        <div
                            v-on:click="toggleLegendItem(prop.type, prop.key)"
                            :class="`legend-marker ${prop.class}`"
                            :style="`background-color: ${prop.color}`"
                        ></div>
                        <p>{{ prop.label }}</p>
                    </li>
                </ul>
            </v-col>
        </v-row>
    </v-card-text>
</template>

<script>
import legend from '@/components/configurations/legend.js';
import { mapState } from 'vuex';
import { getInstanceByDom } from 'echarts/core';

export default {
    computed: {
        ...mapState(['filteredData', 'data'])
    },
    watch: {
        filteredData: function(newValue, oldValue) {
            this.chartInstance = getInstanceByDom(document
                .getElementById('overview-chart-container')
                .firstElementChild
            );
        },
    },
    data() {
        return {
            legend: legend,
            chartInstance: getInstanceByDom(document
                .getElementById('overview-chart-container')
                .firstElementChild
            ),
        };
    },
    methods: {
        toggleLegendItem(type, key) {
            if (typeof this.chartInstance === 'undefined') return;
            if (type !== null) {
                this.chartInstance.dispatchAction({
                    type: type,
                    name: key
                });
            }
        }
    }
};
</script>

<style scoped>
.legend-header .v-btn {
    height: 24px;
}
.legend-content div ul {
    list-style: none;
    padding-left: 0;
}
.legend-content div ul li {
    display: flex;
    padding-bottom: .3rem;
}
.legend-content div ul li p {
    margin-bottom: 0;
    padding-left: .6rem;
}
.legend-marker {
    height: 18px;
    width: 18px;
    border: 1px solid inherit;
}
.__circle {
    border-radius: 50%;
    border: 1px solid inherit;
}
.__pointer {
    cursor: pointer;
}
</style>