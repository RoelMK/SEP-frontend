<template>
    <v-card>
        <v-row class="mx-2">
            <v-col cols="12" class="gTitle">Upload</v-col>
        </v-row>
        <v-row class="mx-2">
            <v-col cols="8">
                <v-file-input
                    outlined
                    hide-details
                    truncate-length="15"
                    label="Upload excel/csv file"
                    small-chips
                    accept=".csv, .xlsx, .xml"
                    v-model="file"
                ></v-file-input>
            </v-col>
            <v-col cols="4">
                <v-select
                    outlined
                    hide-details
                    :items="items"
                    label="Select type"
                ></v-select>
            </v-col>
        </v-row>
        <v-row class="centered">
            <v-col cols="12">
                <v-btn
                    class="white--text"
                    color="#1B98E0"
                    @click="fileUpload"
                >
                    Upload
                </v-btn>
            </v-col>
        </v-row>
    </v-card>
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
.gTitle {
    font-size: 15px;
    font-weight: bold;
}

.centered {
    text-align: center;
}
</style>