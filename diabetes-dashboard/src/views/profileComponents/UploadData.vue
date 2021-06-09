<template>
    <div>
        <h4 class="">Upload</h4>
        <v-form
            lazy-validation
            v-model="valid"
        >
            <v-row class="mt-2">
                <v-col cols="9">
                    <v-file-input
                        truncate-length="15"
                        label="Upload excel/csv file"
                        small-chips
                        outlined
                        :rules="[v => !!v || 'Upload a file first', v => (v && v.size > 0) || 'File is required',]"
                        accept=".csv, .xlsx, .xml"
                        v-model="file"
                    ></v-file-input>
                </v-col>
                <v-col cols="3">
                    <v-select
                        :items="items"
                        :rules="[v => !!v || 'Required', v => (v && v.length) > 0 || 'Required']"
                        label="Select type"
                        outlined
                        v-model="value"
                    ></v-select>
                </v-col>
            </v-row>
            <v-btn
                color="primary"
                @click="fileUpload"
                :disabled="!isDisabled"
            >
                Upload
            </v-btn>
        </v-form>

    </div>
</template>

<script>
import Upload from '../../repositories/Upload';
export default {
    name: "UploadData",
    data() {
        return {
            items: ['Food diary', 'Eetmeter', 'Abbott'],
            file: null,
            value: null,
            valid: false,
        };
    },
    methods: {
        fileUpload() {
            let formData = new FormData();
            formData.append('file', this.file);
            formData.append('format', this.value);

            Upload.upload( formData )
                .then(
                    (resp) => { console.log(resp); },
                    (error) => { console.log(error); }
                );
        }
    },
    computed: {
        isDisabled() {
            return this.value && this.file;
        }
    }
};
</script>
<style>
</style>