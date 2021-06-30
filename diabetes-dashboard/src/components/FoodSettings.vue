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
                <p class="fSize14">Consumed Calories Goal</p>
                <v-text-field v-model="settings.consume" @click="onClick"/>
            </v-col>
            <v-col cols="12" md="6" class="customCol">
                <p class="fSize14">Burned Calories Goal</p>
                <v-text-field v-model="settings.burned" @click="onClick"/>
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
            settings: {
                consume: 0,
                burned: 0,
            },
            defaultSettings: {
                consume: 1800,
                burned: 2000,
            }
        };
    },
    created() {
        // Set food settings upon rendering the component
        // eslint-disable-next-line
        for (const [key, value] of Object.entries(this.settings)) {
            let val = localStorage.getItem(key);
            if (key.includes("Range")) {
                if (val) {
                    this.settings[key] = JSON.parse(val) || [0,0];
                } else {
                    this.settings[key] = this.defaultSettings[key];
                }
            } else {
                if (val) {
                    this.settings[key] = val;
                } else {
                    this.settings[key] = this.defaultSettings[key];
                }
            }
        }

    },
    methods: {
        /**
         * Display editing options upon clicking on settings card
         * @return { void }
         */
        onClick() {
            if (!this.editing) {
                this.editing = !this.editing;
            }
        },
        /**
         * Reset editing options upon 'cancel' button click
         * @return { void }
         */
        onCancel() {
            this.editing = false;
        },
        /**
         * Save settings in local storage upon 'Done' button click
         * @return { void }
         */
        onDone() {
            this.editing = false;
            for (const [key, value] of Object.entries(this.settings)) {
                if (key.includes("Range")) {
                    localStorage.setItem(key, JSON.stringify(value));
                } else {
                    localStorage.setItem(key, value);
                }
            }
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
