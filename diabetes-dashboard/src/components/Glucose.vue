<template>
  <div class="glucose">
    <canvas id="planet-chart"></canvas></div>
</template>

<script>
import Chart from 'chart.js/auto'
import planetChartData from '../planet-data.js'
export default {
    name: 'glucose',
    data() {
        return {
        planetChartData: planetChartData
        }
    },
    mounted() {
        const ctx = document.getElementById('planet-chart');
        new Chart(ctx, this.planetChartData);
    },
    computed: {
    },
    methods: {
    }
}
</script>

<style scoped>
.glucose {
    height: auto;
    width: 100%;
    overflow: auto;
}
</style>
