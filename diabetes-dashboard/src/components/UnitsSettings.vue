<template>
    <v-card>
        <v-row class="mx-2">
            <v-col cols="12" class="gTitle">Units</v-col>
        </v-row>
        <v-row class="mx-5" align="center">
            <v-radio-group row v-model="active">
                <label class="mr-5">Glucose units</label>
                <v-radio name="active" label="mmol/L" :value="0" color="#1B98E0"></v-radio>
                <v-radio name="active" label="mg/DL" :value="1" color="#1B98E0"></v-radio>
            </v-radio-group>
        </v-row>
    </v-card>
</template>

<script>
// Currently this component does not have any functionality. Needs to be implemented
// in the future releases.
export default {
    name: "UnitsSettings",
    data() {
        return {
            // Default settings for displaying glucose units in the application
            active: 0
        };
    },
};
</script>

<style>
.gTitle {
    font-size: 15px;
    font-weight: bold;
}
</style>