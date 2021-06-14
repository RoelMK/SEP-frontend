<template>
    <v-card>
        <v-row class="mx-2">
            <v-col cols="12" class="gTitle">Glucose Settings</v-col>
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
                    ></v-slider>
                </div>
            </v-col>
        </v-row>
        <v-row class="mx-2">
            <v-col cols="12" class="gSection">Thresholds</v-col>
        </v-row>
        <v-row class="mx-2">
            <v-col cols="12" md="4" class="customCol">
                <v-text class="fSize14">A1C</v-text>
                <v-text-field v-model="healthSettings.goalA1C"/>
            </v-col>
            <v-col cols="12" md="4" class="customCol">
                <v-text class="fSize14">Hypoglycemia</v-text>
                <v-text-field v-model="healthSettings.valueHypoglycemia"/>
            </v-col>
            <v-col cols="12" md="4" class="customCol">
                <v-text class="fSize14">Hyperglycemia</v-text>
                <v-text-field v-model="healthSettings.valueHyperglycemia"/>
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
</style>