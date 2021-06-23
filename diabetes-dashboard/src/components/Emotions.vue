<template>
    <v-container class="emotion">
        <p class="header">Enter Emotions</p>
        <p>
            How happy are you?:
            <v-icon
                class="icon"
                size="25"
                v-on:click="
                    selectedButtonHappiness = 'laugh';
                    parameters.valence = 3;
                "
                v-bind:color="
                    selectedButtonHappiness === 'laugh'
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
                    selectedButtonHappiness = 'smile';
                    parameters.valence = 2;
                "
                v-bind:color="
                    selectedButtonHappiness === 'smile'
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
                    selectedButtonHappiness = 'angry';
                    parameters.valence = 1;
                "
                v-bind:color="
                    selectedButtonHappiness === 'angry'
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
                    selectedButtonExcitement = 'excited';
                    parameters.arousal = 3;
                "
                v-bind:color="
                    selectedButtonExcitement === 'excited'
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
                    selectedButtonExcitement = 'smile-2';
                    parameters.arousal = 2;
                "
                v-bind:color="
                    selectedButtonExcitement === 'smile-2'
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
                    selectedButtonExcitement = 'tired';
                    parameters.arousal = 1;
                "
                v-bind:color="
                    selectedButtonExcitement === 'tired'
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
    name: "EmotionComponent",
    data() {
        return {
            selectedButtonHappiness: "",
            selectedButtonExcitement: "",
            parameters: {
                timestamp: +moment(),
                arousal: 0,
                valence: 0,
            },
        };
    },
    methods: {
        async checkEmotionInput() {
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
                        this.$emit('emotions', this.parameters);
                        return resp.data;
                    },
                    (error) => {
                        console.log(error);
                    }
                );
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