<template>

    <v-card class="pa-4">
        <h4 class="">Upload</h4>
        <v-form
            lazy-validation
            v-model="valid"
        >
            <v-row class="mt-2">
                <v-col cols="9">
                    <v-file-input
                        truncate-length="15"
                        label="Upload file"
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
                        @click="connectNightscout"
                    >
                        Connect
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
        <v-divider class="mt-3 mb-3"></v-divider>
        <h4 class="mt-2">Connect OneDrive</h4>
        <v-btn
            v-if="onedriveSet"
            color="primary"
            class="mt-2"
            @click="connectOnedrive()"
        >
            Connect
        </v-btn>
        <v-row
            v-if="!onedriveSet"
            class="pr-3 mt-3 pl-3"
        >
            <v-text-field
                v-model="onedriveFileUrl"
                required
                label="Enter link to file in OneDrive"
                :rules="[v => !!v || 'Required']"
            >
            </v-text-field>
            <v-btn
                v-if="!onedriveSet"
                color="primary"
                class="ml-2"
                @click="uploadOnedrive"
                :disabled="fileUploading"
            >
                Upload
            </v-btn>
        </v-row>
        <v-btn
            v-if="!onedriveSet"
            color="secondary"
            class="mt-3"
            @click="disconnectOnedrive()"
        >
            Disconnect OneDrive
        </v-btn>
    </v-card>
</template>

<script>
import Upload from '../../repositories/Upload';
import axios from "axios";
export default {
    name: "UploadData",
    created() {
        this.nightscoutUrl = localStorage.getItem("nightscout_url") || "";
        this.onedriveFileUrl = localStorage.getItem("od_path") || "";
        if (this.$route.query.accessToken && this.$route.query.homeAccountId) {
            this.$cookies.set("od_access_token",
                this.$route.query.accessToken,
                this.$route.query.expiresOn);
            this.$cookies.set("od_homeaccount_id",
                this.$route.query.homeAccountId);
        }
        if (!this.$cookies.get("od_access_token")) {
            this.onedriveSet = true;
        }
    },
    data() {
        return {
            items: ['Food diary', 'Eetmeter', 'Abbott'],
            file: null,
            value: null,
            valid: false,
            nightscoutUrl: "",
            nightscoutValid: false,
            onedriveFileUrl: "",
            fileUploading: false,
            onedriveSet: false,
        };
    },
    methods: {
        fileUpload() {
            let formData = new FormData();
            let format = "";
            /** SOFTWARE TRANSFER DOCUMENT:
             * This switch statement can be changed
             * to STRIP blank spaces .toLowercase()
            */
            switch (this.value) {
            case 'Food diary':
                format = "fooddiary";
                break;
            case 'Eetmeter':
                format = "eetmeter";
                break;
            case 'Abbott':
                format = "abbott";
                break;
            }
            formData.append('file', this.file);
            formData.append('format', format);

            axios({
                method: "post",
                url: "http://diabetter.win.tue.nl:8080/upload",
                data: formData,
                headers: { "Authorization":
                    "Bearer " + this.$cookies.get("JWT") }
            })
                .then(
                    (resp) => {
                        this.$toaster.showMessage({
                            message: 'File uploaded successfully!',
                            color: 'green',
                            btnColor: 'pink'
                        });
                    },
                    (error) => {
                        this.$toaster.showMessage({
                            message: 'Something went wrong',
                            color: 'dark',
                            btnColor: 'pink'
                        });
                    }
                );
        },
        connectNightscout() {
            localStorage.setItem("nightscout_url", this.nightscoutUrl);
        },
        connectOnedrive() {
            window.open('http://diabetter.win.tue.nl:8080/onedrive/login');
        },
        disconnectOnedrive() {
            this.$cookies.remove('od_access_token');
            this.$cookies.remove('od_homeaccount_id');
            this.onedriveSet = true;
        },
        uploadOnedrive() {
            let access_token = this.$cookies.get("od_access_token");
            if (!access_token) {
                access_token = Upload.fetchOnedriveToken({
                    homeAccountId: this.$cookies.get("od_homeaccount_id")
                })
                    .then(
                        (resp) => {
                            this.$cookies.set("od_access_token",
                                resp.data.accessToken, resp.data.expiresOn);
                            return resp.data.accessToken;
                        },
                        (error) => { console.log(error); }
                    );
            }
            this.fileUploading = true;
            Upload.uploadOnedrive({
                oneDriveToken: access_token,
                filePath: this.onedriveFileUrl
            }, this.$cookies.get("JWT")).then(
                (resp) => {
                    localStorage.setItem("od_path", this.onedriveFileUrl);
                    this.fileUploading = false;
                    this.$toaster.showMessage({
                        message: "File upload succesful!",
                        color: "dark",
                        btnColor: "pink",
                    });
                },
                (error) => {
                    this.$toaster.showMessage({
                        message: "Something went wrong, " +
                        "try again later or contact a developer",
                        color: "dark",
                        btnColor: "pink",
                    });
                    this.fileUploading = false;
                }
            );
        }
    },
    computed: {
        uploadDisabled() {
            return this.value && this.file;
        },
    },
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