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
                :disabled="!uploadDisabled"
            >
                Upload
            </v-btn>
        </v-form>
        <v-divider class="mt-3 mb-3"></v-divider>
        <h4>Connect Nightscout API</h4>
        <v-form
            lazy-validation
            v-model="nightscoutValid"
        >
            <v-row class="mt-2">
                <v-col cols="9">
                    <v-text-field
                        v-model="nightscoutUrl"
                        required
                        label="Enter Nightscout URL"
                        :rules="[v => !!v || 'Required']"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-btn
                        color="primary"
                        style="margin-top: auto; margin-bottom: auto;"
                        :disabled="!nightscoutValid"
                    >
                        Connect
                    </v-btn>
                </v-col>
            </v-row>
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
            nightscoutUrl: "",
            nightscoutValid: false,
        };
    },
    methods: {
        fileUpload() {
            let formData = new FormData();
            formData.append('file', this.file);
            formData.append('format', this.value);

            Upload.upload( formData )
                .then(
                    (resp) => {
                        this.$toaster.showMessage({
                            message: 'File uploaded successfully!',
                            color: 'green',
                            btnColor: 'pink'
                        });
                    },
                    (error) => {
                        console.log(error);
                        this.$toaster.showMessage({
                            message: 'Something went wrong',
                            color: 'dark',
                            btnColor: 'pink'
                        });
                    }
                );
        }
    },
    computed: {
        uploadDisabled() {
            return this.value && this.file;
        }
    }
};
</script>
<style>
</style>