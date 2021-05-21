<template>
    <div>
        <h4 class="">Upload</h4>
        <v-file-input
            truncate-length="15"
            label="Upload excel/csv file"
            small-chips
            accept=".csv, .xlsx"
        ></v-file-input>
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
        };
    },
};
</script>

<style>
</style>