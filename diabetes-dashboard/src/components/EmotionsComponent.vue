<template>
    <v-container>
        <h1 class="title">Enter Emotions</h1>
        <v-row align="center" justify="space-around" style="padding: 0.5rem">
            <b style="padding: 0.5rem">How happy are you?:</b>
            <v-icon
                style="padding: 0.5rem"
                x-large
                v-on:click="selectedButtonHappiness = 'laugh'"
                v-bind:color="
                    selectedButtonHappiness === 'laugh' ? 'blue darken-2' : 'gray'
                "
            >
                fas fa-laugh-beam
            </v-icon>
            <v-icon
                style="padding: 0.5rem"
                x-large
                v-on:click="selectedButtonHappiness = 'smile'"
                v-bind:color="
                    selectedButtonHappiness === 'smile' ? 'blue darken-2' : 'gray'
                "
            >
                fas fa-smile-beam
            </v-icon>
            <v-icon
                style="padding: 0.5rem"
                x-large
                v-on:click="selectedButtonHappiness = 'angry'"
                v-bind:color="
                    selectedButtonHappiness === 'angry' ? 'blue darken-2' : 'gray'
                "
            >
                fas fa-angry
            </v-icon>
        </v-row>
        <v-row align="center" justify="space-around" style="padding: 0.5rem">
            <b style="padding: 0.5rem">How excited are you?:</b>
            <v-icon
                style="padding: 0.5rem"
                x-large
                v-on:click="selectedButtonExcitement = 'excited'"
                v-bind:color="
                    selectedButtonExcitement === 'excited' ? 'blue darken-2' : 'gray'
                "
            >
                fas fa-grin-stars
            </v-icon>
            <v-icon
                style="padding: 0.5rem"
                x-large
                v-on:click="selectedButtonExcitement = 'smile-2'"
                v-bind:color="
                    selectedButtonExcitement === 'smile-2' ? 'blue darken-2' : 'gray'
                "
            >
                fas fa-smile-beam
            </v-icon>
            <v-icon
                style="padding: 0.5rem"
                x-large
                v-on:click="selectedButtonExcitement = 'tired'"
                v-bind:color="
                    selectedButtonExcitement === 'tired' ? 'blue darken-2' : 'gray'
                "
            >
                fas fa-tired
            </v-icon>
        </v-row>
        <div style="padding: 0.5rem">
            <v-btn color="primary" elevation="2" rounded class="bttn">
                Enter Emotion
            </v-btn>
        </div>
    </v-container>
</template>

<script>
export default {
    name: "EmotionComponent",
    data() {
        return {
            selectedButtonHappiness: "",
            selectedButtonExcitement: "",
        };
    },
};
</script>

<style>
.title {
    text-decoration: underline;
    font-weight: bolder;
}
.bttn {
    margin: 0 auto;
    display: block;
}
</style>