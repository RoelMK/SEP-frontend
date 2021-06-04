<template>
    <div>
        <h4 class="">Upload</h4>
        <v-row class="mt-2">
            <v-col cols="9">
                <v-file-input
                    truncate-length="15"
                    label="Upload excel/csv file"
                    small-chips
                    outlined
                    accept=".csv, .xlsx"
                ></v-file-input>
            </v-col>
            <v-col cols="3">
                <v-select
                    :items="items"
                    label="Select type"
                    outlined
                ></v-select>
            </v-col>
        </v-row>
        <v-btn
            color="primary"
        >
            Upload
        </v-btn>

    </div>
</template>

<script>
export default {
    name: "UploadData",
    data() {
        return {
            items: ['Glucose', 'Insulin']
        };
    },
};
</script>

<style>
</style>