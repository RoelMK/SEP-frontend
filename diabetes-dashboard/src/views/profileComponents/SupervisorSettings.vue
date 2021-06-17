<template>
    <v-card>
        <v-row class="mx-2">
            <v-col cols="8" class="gTitle">Supervisors</v-col>
            <v-col cols="4" class="rightAligned">
                <v-icon @click="dialog = true" color="#1B98E0">
                    mdi-plus-circle-outline</v-icon
                >
            </v-col>
            <v-dialog v-model="dialog" scrollable max-width="600px">
                <v-card>
                    <v-card-title>Request permission</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text style="height: 200px">
                        <v-form>
                            <v-text-field
                                v-model="childEmail"
                                label="Enter user email"
                                :rules="[
                                    (v) =>
                                        !v ||
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                                        'E-mail must be valid',
                                ]"
                            >
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn color="secondary darken-1" @click="dialog = false">
                            Cancel
                        </v-btn>
                        <v-btn
                            color="primary darken-1"
                            @click="
                                dialog = false;
                                request();
                            "
                        >
                            Request
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

        <v-col cols="8" class="gTitle">Approved</v-col>
        <v-row
            class="mx-2 temporaryPadding"
            align="center"
            v-for="supervisor in supervisors"
            :key="supervisor.supervisor_email"
        >
            <v-col cols="9">
                <p class="fSize14">{{ supervisor.supervisor_email }}</p>
            </v-col>
            <v-col cols="3">
                <v-btn
                    @click="remove(supervisor)"
                    class="white--text ml-2"
                    color="red"
                    small
                >
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-divider class="mt-3" />
        <v-col cols="8" class="gTitle">Awaiting approval</v-col>
        <v-row
            class="mx-2 temporaryPadding"
            align="center"
            v-for="supervisor in requestedSupervisors"
            :key="supervisor.supervisor_email"
        >
            <v-col cols="7">
                <p class="fSize14">{{ supervisor.supervisor_email }}</p>
            </v-col>
            <v-col cols="5">
                <v-btn
                    @click="approve(supervisor)"
                    class="white--text"
                    color="green"
                    small
                >
                    <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn
                    @click="reject(supervisor)"
                    class="white--text ml-2"
                    color="red"
                    small
                >
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import Supervisor from "../../repositories/Supervisor";
export default {
    name: "SupervisorSettings",
    async created() {
        if (this.$store.state.user.email) {
            this.getRequested();
            this.getApproved();
        }
    },
    data() {
        return {
            boolAsk: true,
            supervisors: [],
            requestedSupervisors: [],
            dialog: false,
            childEmail: "",
        };
    },
    watch: {
        "$store.state.user.email": async function() {
            await this.getRequested();
            await this.getApproved();
        }
    },
    methods: {
        request() {
            Supervisor.request({
                supervisorEmail: this.$store.state.user.email,
                childEmail: this.childEmail,
            }).then(
                (resp) => {
                    this.childEmail = "";
                    console.log(resp);
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        getRequested() {
            Supervisor.getSupervisors({
                childEmail: this.$store.state.user.email,
            }).then(
                (resp) => {
                    this.requestedSupervisors = resp.data.supervisors;
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        approve(supervisor) {
            Supervisor.request({
                supervisorEmail: supervisor.supervisor_email,
                childEmail: this.$store.state.user.email,
                confirm: true,
            }).then(
                () => {
                    this.requestedSupervisors.splice(
                        this.requestedSupervisors.indexOf(supervisor),
                        1
                    );
                    this.supervisors.push(supervisor);
                    this.$toaster.showMessage({
                        message: "Successfully approved!",
                        color: "blue",
                        btnColor: "white",
                    });
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        reject(supervisor) {
            Supervisor.deleteSupervisor({
                supervisorEmail: supervisor.supervisor_email,
                childEmail: this.$store.state.user.email,
            }).then(
                (resp) => {
                    this.requestedSupervisors.splice(
                        this.requestedSupervisors.indexOf(supervisor),
                        1
                    );
                    console.log(resp);
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        getApproved() {
            Supervisor.getApproved({
                childEmail: this.$store.state.user.email,
            }).then(
                (resp) => {
                    this.supervisors = resp.data.supervisors;
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        remove(supervisor) {
            Supervisor.deleteSupervisor({
                supervisorEmail: supervisor.supervisor_email,
                childEmail: this.$store.state.user.email,
            }).then(
                (resp) => {
                    this.supervisors.splice(
                        this.supervisors.indexOf(supervisor), 1);
                    console.log(resp);
                },
                (error) => {
                    console.log(error);
                }
            );
        },
    },
};
</script>

<style>
.gTitle {
  font-size: 15px;
  font-weight: bold;
}

.fSize14 {
  font-size: 14px;
}

.rightAligned {
  text-align: right;
}

.centerAligned {
  text-align: center;
}

.temporaryPadding {
  padding-top: 14px;
}
</style>