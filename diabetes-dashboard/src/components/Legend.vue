<template>
    <v-card-text>
        <v-row>
            <v-col class="legend-header d-flex align-center">
                <h3>Legend</h3>
                <v-btn :v-ripple="false" small plain text>{{ buttonText }}</v-btn>
            </v-col>
        </v-row>
        <v-row class="legend-content">
            <v-col>
                <ul>
                    <li>
                        <div class="legend-marker red-1"></div>
                        <p>Very High</p>
                    </li>
                    <li>
                        <div class="legend-marker redish-1"></div>
                        <p>High</p>
                    </li>
                    <li>
                        <div class="legend-marker orange-1"></div>
                        <p>Normal</p>
                    </li>
                    <li>
                        <div class="legend-marker yellow-1"></div>
                        <p>Low</p>
                    </li>
                </ul>
            </v-col>
            <v-col>
                <ul>
                    <li>
                        <div class="legend-marker green-1"></div>
                        <p>Emotions</p>
                    </li>
                    <li>
                        <div class="legend-marker blue-1"></div>
                        <p>Exercises</p>
                    </li>
                </ul>
            </v-col>
            <v-col>
                <ul>
                    <li>
                        <div class="legend-marker pink-1"></div>
                        <p>Insulin</p>
                    </li>
                </ul>
            </v-col>
            <v-col>
                <ul>
                    <li>
                        <div class="legend-marker brown-1"></div>
                        <p>Breakfast</p>
                    </li>
                    <li>
                        <div class="legend-marker deep-purple-1"></div>
                        <p>Lunch</p>
                    </li>
                    <li>
                        <div class="legend-marker ocean-blue-1"></div>
                        <p>Snack</p>
                    </li>
                    <li>
                        <div class="legend-marker purple-1"></div>
                        <p>Dinner</p>
                    </li>
                </ul>
            </v-col>
        </v-row>
    </v-card-text>
</template>

<script>
export default {
    props: {
        chart: Object,
        default: null
    },
    mounted() {
        console.log(this.chart.overview.$children[0]);
    },
    data() {
        return {
            buttonText: 'Show less'
        };
    },
    methods: {

    }
};
</script>

<style scoped>
.legend-header .v-btn {
    height: 24px;
}
.legend-content div ul {
    list-style: none;
    padding-left: 0;
}
.legend-content div ul li {
    display: flex;
    padding-bottom: .3rem;
}
.legend-content div ul li p {
    margin-bottom: 0;
    padding-left: .6rem;
}
.legend-marker {
    height: 18px;
    width: 18px;
}
.red-1 {
    background-color: rgba(191,68,76,1);
}
.redish-1 {
    background-color: rgba(208,109,102,1);
}
.orange-1 {
    background-color: #ECC1AA;
}
.yellow-1 {
    background-color: #F4EEBE;
}
.green-1 {
    background-color: #91cc75;
}
.blue-1 {
    background-color: #0c4271;
}
.pink-1 {
    background-color: #ce97b0;
}
.brown-1 {
    background-color: #de8971;
}
.deep-purple-1 {
    background-color: #7b6079;
}
.ocean-blue-1 {
    background-color: #a7d0cd;
}
.purple-1 {
    background-color: #867ae9;
}
</style>