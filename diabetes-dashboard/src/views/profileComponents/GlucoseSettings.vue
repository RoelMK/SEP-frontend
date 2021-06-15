<template>
    <v-card>
        <v-row class="mx-2">
            <v-col cols="8" class="gTitle">Glucose Settings</v-col>
            <v-col cols="4" class="cRow editBtn pointer pr-3" v-if="editing">
                <p @click="onDone">Done</p>
                <p @click="onCancel" id="cancel" class="pr-3">Cancel</p>
            </v-col>
        </v-row>
        <v-row class="mx-2">
            <v-col cols="12" class="gSection">Glucose Range</v-col>
        </v-row>
        <v-row class="mx-2">
            <v-col cols="12" class="customCol">
                <v-text class="fSize14">Very High</v-text>
                <div class="mx-2">
                    <v-slider
                        thumb-label
                        hide-details
                        max="14"
                        min="0"
                        step="0.1"
                        v-model="healthSettings.veryHighValue"
                        :color="colors.trackColor"
                        :track-color="colors.veryHigh"
                        :thumb-color="colors.veryHigh"
                        @change="onClick"
                    ></v-slider>
                </div>
            </v-col>
        </v-row>
        <v-row class="mx-2">
            <v-col cols="12" class="customCol">
                <v-text class="fSize14">High</v-text>
                <div class="mx-2">
                    <v-range-slider
                        thumb-label
                        hide-details
                        max="14"
                        min="0"
                        step="0.1"
                        v-model="healthSettings.highRange"
                        :color="colors.high"
                        :track-color="colors.trackColor"
                        @change="onClick"
                    ></v-range-slider>
                </div>
            </v-col>
        </v-row>
        <v-row class="mx-2">
            <v-col cols="12" class="customCol">
                <v-text class="fSize14">Normal</v-text>
                <div class="mx-2">
                    <v-range-slider
                        thumb-label
                        hide-details
                        max="14"
                        min="0"
                        step="0.1"
                        v-model="healthSettings.normalRange"
                        :color="colors.normal"
                        :track-color="colors.trackColor"
                        @change="onClick"
                    ></v-range-slider>
                </div>
            </v-col>
        </v-row>
        <v-row class="mx-2">
            <v-col cols="12" class="customCol">
                <v-text class="fSize14">Low</v-text>
                <div class="mx-2">
                    <v-range-slider
                        thumb-label
                        hide-details
                        max="14"
                        min="0"
                        step="0.1"
                        v-model="healthSettings.lowRange"
                        :color="colors.low"
                        :track-color="colors.trackColor"
                        @change="onClick"
                    ></v-range-slider>
                </div>
            </v-col>
        </v-row>
        <v-row class="mx-2">
            <v-col cols="12" class="customCol">
                <v-text class="fSize14">Very Low</v-text>
                <div class="mx-2">
                    <v-slider
                        thumb-label
                        hide-details
                        max="14"
                        min="0"
                        step="0.1"
                        v-model="healthSettings.veryLowValue"
                        :color="colors.veryLow"
                        :track-color="colors.trackColor"
                        @click="onClick"
                    ></v-slider>
                </div>
            </v-col>
        </v-row>
        <v-row class="mx-2">
            <v-col cols="12" class="gSection">Thresholds</v-col>
        </v-row>
        <v-row class="mx-2 pb-3">
            <v-col cols="12" md="4" class="customCol">
                <v-text class="fSize14">A1C</v-text>
                <v-text-field v-model="healthSettings.goalA1C" @click="onClick"/>
            </v-col>
            <v-col cols="12" md="4" class="customCol">
                <v-text class="fSize14">Hypoglycemia</v-text>
                <v-text-field v-model="healthSettings.valueHypoglycemia" @click="onClick"/>
            </v-col>
            <v-col cols="12" md="4" class="customCol">
                <v-text class="fSize14">Hyperglycemia</v-text>
                <v-text-field v-model="healthSettings.valueHyperglycemia" @click="onClick"/>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import legend from '@/components/configurations/legend.js';
export default {
    name: "glucoseSettings",
    data() {
        return {
            editing: false,
            options: {
                process: pos => [
                    [pos[0], pos[1]],
                ],
            },
            healthSettings: {
                unit: "mmol/L",
                veryHighValue: 13.0,
                highRange: [10.0, 13.0],
                normalRange: [3.9, 10.0],
                lowRange: [3.0, 3.9],
                veryLowValue: 3.0,
                goalA1C: 7,
                valueHypoglycemia: 6,
                valueHyperglycemia: 10
            },
            colors: {
                veryHigh: legend.sections[0].properties[4].color,
                high: legend.sections[0].properties[3].color,
                normal: legend.sections[0].properties[2].color,
                low: legend.sections[0].properties[1].color,
                veryLow: legend.sections[0].properties[0].color,
                trackColor: "gray"
            }
        };
    },
    methods: {
        onClick() {
            if (!this.editing) {
                this.editing = !this.editing;
            }
        },
        onCancel() {
            this.editing = false;
            // No changes are made
        },
        onDone() {
            this.editing = false;
            // Post request to Gamebus to make the changes
        }
    }
};
</script>

<style>
.gTitle {
    font-size: 15px;
    font-weight: bold;
}

.gSection {
    color: #1B98E0;
    font-size: 14px;
}

.fSize14 {
    font-size: 14px
}

.customCol {
    display: flex;
    flex-direction: column;
}

.editBtn {
    font-size: 13px;
    font-weight: bold;
    height: 40px;
}

.editBtn #cancel {
    color: red;
}

.cRow {
    display: flex;
    flex-direction: row;
    direction: rtl;
}

.rightAligned {
  text-align: right;
}
</style>