<template>
    <v-container class="emotion">
        <p class="header">Enter Emotions</p>
        <p>
            How happy are you?:
            <v-icon
                class="icon"
                size="25"
                v-on:click="selectedButtonHappiness = 'laugh'"
                v-bind:color="selectedButtonHappiness === 'laugh' ? 'blue darken-2' : 'gray'"
            >
                fas fa-laugh-beam
            </v-icon>
            <v-icon
                class="icon"
                size="25"
                v-on:click="selectedButtonHappiness = 'smile'"
                v-bind:color="selectedButtonHappiness === 'smile' ? 'blue darken-2' : 'gray'"
            >
                fas fa-smile-beam
            </v-icon>
            <v-icon
                class="icon"
                size="25"
                v-on:click="selectedButtonHappiness = 'angry'"
                v-bind:color="selectedButtonHappiness === 'angry' ? 'blue darken-2' : 'gray'"
            >
                fas fa-angry
            </v-icon>
        </p>
        <p>
            How excited are you?:
            <v-icon
                class="icon"
                size="25"
                v-on:click="selectedButtonExcitement = 'excited'"
                v-bind:color="selectedButtonExcitement === 'excited' ? 'blue darken-2' : 'gray'"
            >
                fas fa-grin-stars
            </v-icon>
            <v-icon
                class="icon"
                size="25"
                v-on:click="selectedButtonExcitement = 'smile-2'"
                v-bind:color="selectedButtonExcitement === 'smile-2' ? 'blue darken-2' : 'gray'"
            >
                fas fa-smile-beam
            </v-icon>
            <v-icon
                class="icon"
                size="25"
                v-on:click="selectedButtonExcitement = 'tired'"
                v-bind:color="selectedButtonExcitement === 'tired' ? 'blue darken-2' : 'gray'"
            >
                fas fa-tired
            </v-icon>
        </p>
        <div>
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
}

.emotion .header {
    font-size: 17px;
    font-weight: bold;
}

.bttn {
    margin: 0 auto;
    display: block;
}
.icon {
    margin-left: 15px;
}
</style>