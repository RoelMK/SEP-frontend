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
                <p class="fSize14">Very High</p>
                <div class="mx-2">
                    <v-slider
                        thumb-label="always"
                        hide-details
                        max="20"
                        min="0"
                        step="0.1"
                        v-model="healthSettings.veryHighValue"
                        :color="colors.trackColor"
                        :track-color="colors.veryHigh"
                        :thumb-color="colors.veryHigh"
                        @change="onClick"
                        @input="catchVeryHighSlider"
                        :key="sliderKeyHigh"
                    ></v-slider>
                </div>
            </v-col>
        </v-row>
        <v-row class="mx-2">
            <v-col cols="12" class="customCol">
                <p class="fSize14">High</p>
                <div class="mx-2">
                    <v-range-slider
                        thumb-label="always"
                        hide-details
                        max="20"
                        min="0"
                        step="0.1"
                        v-model="healthSettings.highRange"
                        :color="colors.high"
                        :track-color="colors.trackColor"
                        @change="onClick"
                        @input="catchHighSlider"
                    ></v-range-slider>
                </div>
            </v-col>
        </v-row>
        <v-row class="mx-2">
            <v-col cols="12" class="customCol">
                <p class="fSize14">Normal</p>
                <div class="mx-2">
                    <v-range-slider
                        thumb-label="always"
                        hide-details
                        max="20"
                        min="0"
                        step="0.1"
                        v-model="healthSettings.normalRange"
                        :color="colors.normal"
                        :track-color="colors.trackColor"
                        @change="onClick"
                        @input="catchNormalSlider"
                    ></v-range-slider>
                </div>
            </v-col>
        </v-row>
        <v-row class="mx-2">
            <v-col cols="12" class="customCol">
                <p class="fSize14">Low</p>
                <div class="mx-2">
                    <v-range-slider
                        thumb-label="always"
                        hide-details
                        max="20"
                        min="0"
                        step="0.1"
                        v-model="healthSettings.lowRange"
                        :color="colors.low"
                        :track-color="colors.trackColor"
                        @change="onClick"
                        @input="catchLowSlider"
                    ></v-range-slider>
                </div>
            </v-col>
        </v-row>
        <v-row class="mx-2">
            <v-col cols="12" class="customCol">
                <p class="fSize14">Very Low</p>
                <div class="mx-2">
                    <v-slider
                        thumb-label="always"
                        hide-details
                        max="20"
                        min="0"
                        step="0.1"
                        v-model="healthSettings.veryLowValue"
                        :color="colors.veryLow"
                        :track-color="colors.trackColor"
                        @click="onClick"
                        @input="catchVeryLowSlider"
                        :key="sliderKeyLow"
                    ></v-slider>
                </div>
            </v-col>
        </v-row>
        <v-row class="mx-2">
            <v-col cols="12" class="gSection">Thresholds</v-col>
        </v-row>
        <v-row class="mx-2 pb-3">
            <v-col cols="12" md="4" class="customCol">
                <p class="fSize14">A1C</p>
                <v-text-field
                    v-model="healthSettings.goalA1C"
                    @click="onClick"
                />
            </v-col>
            <v-col cols="12" md="4" class="customCol">
                <p class="fSize14">Hypoglycemia</p>
                <v-text-field
                    v-model="healthSettings.valueHypoglycemia"
                    @click="onClick"
                />
            </v-col>
            <v-col cols="12" md="4" class="customCol">
                <p class="fSize14">Hyperglycemia</p>
                <v-text-field
                    v-model="healthSettings.valueHyperglycemia"
                    @click="onClick"
                />
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import legend from "@/components/configurations/legend.js";
export default {
    name: "glucoseSettings",
    data() {
        return {
            editing: false,
            options: {
                process: (pos) => [[pos[0], pos[1]]],
            },
            defaultValues: {
                unit: "mmol/L",
                veryHighValue: 14.0,
                highRange: [10.1, 13.9],
                normalRange: [3.9, 10.0],
                lowRange: [3.0, 3.8],
                veryLowValue: 2.9,
                goalA1C: 7,
                valueHypoglycemia: 4,
                valueHyperglycemia: 10,
            },
            healthSettings: {
                unit: "mmol/L",
                veryHighValue: 0,
                highRange: [0, 1],
                normalRange: [0, 1],
                lowRange: [0, 1],
                veryLowValue: 0,
                goalA1C: 0,
                valueHypoglycemia: 0,
                valueHyperglycemia: 0,
            },
            colors: {
                veryHigh: legend.sections[0].properties[4].color,
                high: legend.sections[0].properties[3].color,
                normal: legend.sections[0].properties[2].color,
                low: legend.sections[0].properties[1].color,
                veryLow: legend.sections[0].properties[0].color,
                trackColor: "gray",
            },
            sliderKeyHigh: 0,
            sliderKeyLow: 0
        };
    },
    created() {
        // Set glucose settings upon rendering the component
        // eslint-disable-next-line
        for (const [key, value] of Object.entries(this.healthSettings)) {
            let val = localStorage.getItem(key);
            if (key.includes("Range")) {
                if (val) {
                    this.healthSettings[key] = JSON.parse(val) || [0, 0];
                } else {
                    this.healthSettings[key] = this.defaultValues[key];
                }
            } else {
                if (val) {
                    this.healthSettings[key] = val;
                } else {
                    this.healthSettings[key] = this.defaultValues[key];
                }
            }
        }
    },
    methods: {
        /**
         * Display editing options upon clicking on settings card
         * @return { void }
         */
        onClick() {
            if (!this.editing) {
                this.editing = !this.editing;
            }
        },
        /**
         * Reset editing options upon 'cancel' button click
         * @return { void }
         */
        onCancel() {
            this.editing = false;
        },
        /**
         * Save settings in local storage upon 'Done' button click
         * @return { void }
         */
        onDone() {
            this.editing = false;
            for (const [key, value] of Object.entries(this.healthSettings)) {
                if (key.includes("Range")) {
                    localStorage.setItem(key, JSON.stringify(value));
                } else {
                    localStorage.setItem(key, value);
                }
            }
        },
        /**
         * Restricts slider functionality to prevent setting value lower than
         * preceding slider
         * @param { number }    e current value of the slider
         * @return { void }
         */
        catchVeryHighSlider(e) {
            if (e < this.healthSettings.highRange[1]) {
                this.healthSettings.veryHighValue =
                    this.healthSettings.highRange[1] + 0.1;
                this.sliderKeyHigh++;
            }
        },
        /**
         * Restricts slider functionality to prevent setting value lower than
         * preceding slider
         * @param { number }    e current value of the slider
         * @return { void }
         */
        catchHighSlider(e) {
            if (e[1] > this.healthSettings.veryHighValue) {
                this.healthSettings.highRange[1] =
                    this.healthSettings.veryHighValue - 0.1;
            }
            if (e[0] < this.healthSettings.normalRange[1]) {
                this.healthSettings.highRange[0] =
                    this.healthSettings.normalRange[1] + 0.1;
            }
        },
        /**
         * Restricts slider functionality to prevent setting value lower than
         * preceding slider
         * @param { number }    e current value of the slider
         * @return { void }
         */
        catchNormalSlider(e) {
            if (e[1] > this.healthSettings.highRange[0]) {
                this.healthSettings.normalRange[1] =
                    this.healthSettings.highRange[0] - 0.1;
            }
            if (e[0] < this.healthSettings.lowRange[1]) {
                this.healthSettings.normalRange[0] =
                    this.healthSettings.lowRange[1] + 0.1;
            }
        },
        /**
         * Restricts slider functionality to prevent setting value lower than
         * preceding slider
         * @param { number }    e current value of the slider
         * @return { void }
         */
        catchLowSlider(e) {
            if (e[1] > this.healthSettings.normalRange[0]) {
                this.healthSettings.lowRange[1] =
                    this.healthSettings.normalRange[0] - 0.1;
            }
            if (e[0] < this.healthSettings.veryLowValue) {
                this.healthSettings.lowRange[0] =
                    this.healthSettings.veryLowValue + 0.1;
            }
        },
        /**
         * Restricts slider functionality to prevent setting value lower than
         * preceding slider
         * @param { number }    e current value of the slider
         * @return { void }
         */
        catchVeryLowSlider(e) {
            if (e > this.healthSettings.lowRange[0]) {
                this.healthSettings.veryLowValue =
                    this.healthSettings.lowRange[0] - 0.1;
                this.sliderKeyLow++;
            }
        },
    },
};
</script>

<style>
.gTitle {
    font-size: 15px;
    font-weight: bold;
}

.gSection {
    color: #1b98e0;
    font-size: 14px;
}

.fSize14 {
    font-size: 14px;
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
