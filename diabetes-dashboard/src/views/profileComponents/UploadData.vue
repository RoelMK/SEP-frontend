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
                    accept=".csv, .xlsx, .xml"
                    v-model="file"
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
            @click="fileUpload"
        >
            Upload
        </v-btn>

    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "UploadData",
    data() {
        return {
            items: ['Glucose', 'Insulin'],
            file: null,
        };
    },
    methods: {
        fileUpload() {
            let formData = new FormData();
            formData.append('file', this.file);

            axios.post('http://localhost:8080/upload/eetmeter', formData)
                .then((resp) => {
                    console.log(resp);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
};
</script>

<style>
</style>