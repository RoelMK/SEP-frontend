<template>
    <v-card>
        <v-row class="mx-2">
            <v-col cols="8" class="gTitle">Food Settings</v-col>
            <v-col cols="4" class="cRow editBtn pointer pr-3" v-if="editing">
                <p @click="onDone">Done</p>
                <p @click="onCancel" id="cancel" class="pr-3">Cancel</p>
            </v-col>
        </v-row>
        <v-row class="mx-2">
            <v-col cols="12" md="6" class="customCol">
                <v-text class="fSize14">Consumed Calories Goal</v-text>
                <v-text-field value="1800" @click="onClick"/>
            </v-col>
            <v-col cols="12" md="6" class="customCol">
                <v-text class="fSize14">Burned Calories Goal</v-text>
                <v-text-field value="2000" @click="onClick"/>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    name: "FoodSettings",
    data() {
        return {
            editing: false,
            goalConsumedCalories: '',
            goalBurntCalories: '',
        };
    },
    methods: {
        onClick() {
            if (!this.editing) {
                this.editing = !this.editing;
            }
        },
        onCancel() {
            this.editing = false;
            // No changes are made
        },
        onDone() {
            this.editing = false;
            // Post request to Gamebus to make the changes
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

.customCol {
    display: flex;
    flex-direction: column;
}

.editBtn {
    font-size: 13px;
    font-weight: bold;
    height: 40px;
}

.editBtn #cancel {
    color: red;
}

.cRow {
    display: flex;
    flex-direction: row;
    direction: rtl;
}
</style>