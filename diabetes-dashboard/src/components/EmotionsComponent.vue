<template>
    <v-container class="emotion">
        <h2>Enter Emotions</h2>
        <p class="margin">
            How happy are you?:
            <v-icon
                class="margin"
                size="25"
                v-on:click="selectedButtonHappiness = 'laugh'"
                v-bind:color="selectedButtonHappiness === 'laugh' ? 'blue darken-2' : 'gray'"
            >
                fas fa-laugh-beam
            </v-icon>
            <v-icon
                class="margin"
                size="25"
                v-on:click="selectedButtonHappiness = 'smile'"
                v-bind:color="selectedButtonHappiness === 'smile' ? 'blue darken-2' : 'gray'"
            >
                fas fa-smile-beam
            </v-icon>
            <v-icon
                class="margin"
                size="25"
                v-on:click="selectedButtonHappiness = 'angry'"
                v-bind:color="selectedButtonHappiness === 'angry' ? 'blue darken-2' : 'gray'"
            >
                fas fa-angry
            </v-icon>
        </p>
        <p class="margin">
            How excited are you?:
            <v-icon
                class="margin"
                size="25"
                v-on:click="selectedButtonExcitement = 'excited'"
                v-bind:color="selectedButtonExcitement === 'excited' ? 'blue darken-2' : 'gray'"
            >
                fas fa-grin-stars
            </v-icon>
            <v-icon
                class="margin"
                size="25"
                v-on:click="selectedButtonExcitement = 'smile-2'"
                v-bind:color="selectedButtonExcitement === 'smile-2' ? 'blue darken-2' : 'gray'"
            >
                fas fa-smile-beam
            </v-icon>
            <v-icon
                class="margin"
                size="25"
                v-on:click="selectedButtonExcitement = 'tired'"
                v-bind:color="selectedButtonExcitement === 'tired' ? 'blue darken-2' : 'gray'"
            >
                fas fa-tired
            </v-icon>
        </p>
        <div class="margin">
            <v-btn color="primary" elevation="2" class="bttn">
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
.emotion {
    height: auto;
    text-align: center;
}

.emotion h2 {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.bttn {
    margin: 0 auto;
    display: block;
}
.margin {
    margin-left: 10px;
}
</style>