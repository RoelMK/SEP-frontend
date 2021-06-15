<template>
    <v-card>
        <v-row class="mx-2">
            <v-col cols="8" class="gTitle">Supervisor</v-col>
            <v-col cols="4" class="rightAligned">
                <v-icon class="pr-3" @click="loadMore" color="#1B98E0">{{supSettIcon}}</v-icon>
                <v-icon @click="addMore" color="#1B98E0">mdi-plus-circle-outline</v-icon>
            </v-col>
        </v-row>
        <v-row class="mx-2 customPadding" align="center" v-if="supervisorsHidden">
            <v-col cols="12">
                <div class="customRow">
                    <v-text class="fSize14">{{this.supervisors[0]}}</v-text>
                    <v-btn @click="removeSupervisor" class="white--text" color="red" small>
                        <v-icon left>mdi-delete</v-icon>
                        Remove
                    </v-btn>
                </div>
            </v-col>
        </v-row>
        <v-row class="mx-2 customPadding" align="center" v-if="!supervisorsHidden">
            <v-col cols="12" v-for="supervisor in supervisors" :key="supervisor">
                <div class="customRow">
                    <v-text class="fSize14">{{supervisor}}</v-text>
                    <v-btn @click="removeSupervisor" class="white--text" color="red" small>
                        <v-icon left>mdi-delete</v-icon>
                        Remove
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    name: "SupervisorSettings",
    data() {
        return {
            boolAsk: true,
            supervisors: ["Samuel Ivanovich", "Georgi Simeonov"],
            supervisorsHidden: true,
            supSettIcon: "mdi-chevron-down"
        };
    },
    methods: {
        loadMore() {
            this.supervisorsHidden = !this.supervisorsHidden;
            if (!this.supervisorsHidden) {
                this.supSettIcon = "mdi-chevron-up";
            }
            else {
                this.supSettIcon = "mdi-chevron-down";
            }
        },
        addMore() {
            this.$toasted.show('Adding more supervisors');
        },
        removeSupervisor() {
            this.$toasted.show('Removing Supervisor');
        }
    }
};
</script>

<style>
.gTitle {
    font-size: 15px;
    font-weight: bold;
}

.fSize14 {
    font-size: 14px
}

.rightAligned {
    text-align: right;
}

.customRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.customPadding {
    padding-top: 14px;
}
</style>