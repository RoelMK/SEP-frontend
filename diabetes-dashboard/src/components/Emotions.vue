<template>
    <v-container class="emotion">
        <p class="header">Enter Emotions</p>
        <p>
            How happy are you?:
            <v-icon
                class="icon"
                size="25"
                v-on:click="
                    happinessOption = 'laugh';
                    parameters.valence = 3;
                "
                v-bind:color="
                    happinessOption === 'laugh'
                        ? 'blue darken-2'
                        : 'gray'
                "
            >
                fas fa-laugh-beam
            </v-icon>
            <v-icon
                class="icon"
                size="25"
                v-on:click="
                    happinessOption = 'smile';
                    parameters.valence = 2;
                "
                v-bind:color="
                    happinessOption === 'smile'
                        ? 'blue darken-2'
                        : 'gray'
                "
            >
                fas fa-smile-beam
            </v-icon>
            <v-icon
                class="icon"
                size="25"
                v-on:click="
                    happinessOption = 'angry';
                    parameters.valence = 1;
                "
                v-bind:color="
                    happinessOption === 'angry'
                        ? 'blue darken-2'
                        : 'gray'
                "
            >
                fas fa-angry
            </v-icon>
        </p>
        <p>
            How excited are you?:
            <v-icon
                class="icon"
                size="25"
                v-on:click="
                    excitementOption = 'excited';
                    parameters.arousal = 3;
                "
                v-bind:color="
                    excitementOption === 'excited'
                        ? 'blue darken-2'
                        : 'gray'
                "
            >
                fas fa-grin-stars
            </v-icon>
            <v-icon
                class="icon"
                size="25"
                v-on:click="
                    excitementOption = 'smile-2';
                    parameters.arousal = 2;
                "
                v-bind:color="
                    excitementOption === 'smile-2'
                        ? 'blue darken-2'
                        : 'gray'
                "
            >
                fas fa-smile-beam
            </v-icon>
            <v-icon
                class="icon"
                size="25"
                v-on:click="
                    excitementOption = 'tired';
                    parameters.arousal = 1;
                "
                v-bind:color="
                    excitementOption === 'tired'
                        ? 'blue darken-2'
                        : 'gray'
                "
            >
                fas fa-tired
            </v-icon>
        </p>
        <div>
            <v-btn color="primary" elevation="2" @click="checkEmotionInput">
                Enter Emotion
            </v-btn>
        </div>
    </v-container>
</template>

<script>
import moment from "moment";
import Data from "@/repositories/Data.js";

export default {
    // set name of component
    name: "EmotionComponent",
    data() {
        return {
            happinessOption: "",
            excitementOption: "",
            parameters: {
                timestamp: +moment(),
                arousal: 0,
                valence: 0,
            },
        };
    },
    methods: {
        /**
         * Check provided input, translate it from emoticons to numbers and
         * post selection to the backend
         * @return { void }
         */
        async checkEmotionInput() {
            // check if a necessary property was not set
            if (
                this.parameters.arousal === 0 ||
                this.parameters.valance === 0
            ) {
                this.$toaster.showMessage({
                    message: "Enter happiness and excitement!",
                    color: "dark",
                    btnColor: "pink",
                });
            } else {
                let emotion = await Data.postEmotion(
                    this.parameters,
                    this.$cookies.get("JWT")
                ).then(
                    (resp) => {
                        this.$toaster.showMessage({
                            message: "Upload is successful",
                            color: "dark",
                            btnColor: "pink",
                        });
                        this.$emit("emotions", this.parameters);
                        return resp.data;
                    },
                    (error) => {
                        console.log(error);
                    }
                );
                // update local data
                this.$store.commit("ADD_EMOTION", emotion);
            }
        },
    },
};
</script>

<style>
.emotion {
    height: auto;
}

.emotion .header {
    font-size: 17px;
    font-weight: bold;
}

.icon {
    margin-left: 15px;
}
</style>