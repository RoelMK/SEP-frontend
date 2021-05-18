<template>
  <v-container class="doughnut">
    <canvas style="position: center" id="doughnutChart"></canvas>
  </v-container>
</template>

<script>
import Chart from "chart.js/auto";
import { mapGetters } from "vuex";

export default {
  name: "doughnutChart",
  props: {
    datasets: Array,
  },
  data() {
    return {
      doughnutChart: null,
      config: {
        type: "doughnut",
        data: {
          labels: ["Very Low", "Low", "Normal", "High", "Very High"],
          datasets: [
            {
              label: "DoughnutChart",
              data: [],
              backgroundColor: [
                "rgb(128,0,128)",
                "rgb(255,0,0)",
                "rgb(0,255,0)",
                "rgb(255, 255, 0)",
                "rgb(255, 153, 51)",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Glucose Time Distribution",
            },
          },
        },
      },
    };
  },
  computed: {
    ...mapGetters(["getHealthSettings"]),
  },
  mounted() {
    const ctx1 = document.getElementById("doughnutChart");
    window.doughnutChart = new Chart(ctx1, this.config);
    this.updateDoughnutChart(this.datasets[0].data);
  },

  methods: {
    /**
     * Update doughnut chart for input data
     * data must have the precentages and the hours for each type of glucose,
     *      so that we do not have to comute manually
     * @param  { Array }       data Data object to be visualized in the doughnut chart
     * @return
     */
    updateDoughnutChart(data) {
      let len = data.length;
      let veryHighCount = 0;
      let highCount = 0;
      let normalCount = 0;
      let lowCount = 0;
      let veryLowCount = 0;
      let veryHighPercentage = 0;
      let highPercentage = 0;
      let normalPercentage = 0;
      let lowPercentage = 0;
      let veryLowPercentage = 0;

      // in the current fake glucose data there is 1 observation for every min
      for (var i = 0; i < len; i++) {
        if (data[i] > this.getHealthSettings.veryHighThreshold) {
            veryHighCount += 1;
        } else if (data[i] >= this.getHealthSettings.highRangeMin &&
          data[i] <= this.getHealthSettings.highRangeMax) {
            highCount += 1;
        } else if (data[i] >= this.getHealthSettings.normalRangeMin &&
          data[i] <= this.getHealthSettings.normalRangeMax) {
            normalCount += 1;
        } else if (data[i] >= this.getHealthSettings.lowRangeMin &&
          data[i] <= this.getHealthSettings.lowRangeMax) {
            lowCount += 1;
        } else {
            veryLowCount += 1;
        }
      }

      veryHighPercentage = (veryHighCount / len) * 100;
      highPercentage = (highCount / len) * 100;
      normalPercentage = (normalCount / len) * 100;
      lowPercentage = (lowCount / len) * 100;
      veryLowPercentage = (veryLowCount / len) * 100;

      let minutes = [
        veryLowCount,
        lowCount,
        normalCount,
        highCount,
        veryHighCount,
      ];
      let hours = [];

      for (var k = 0; k < minutes.length; k++) {
        var min = minutes[k] % 60;
        var hour = (minutes[k] - min) / 60;
        hours.push(
          hour.toString() + ":" + (min < 10 ? "0" : "") + min.toString()
        );
      }

      let percentages = [
        veryLowPercentage,
        lowPercentage,
        normalPercentage,
        highPercentage,
        veryHighPercentage,
      ];

      let labels = ["Very Low", "Low", "Normal", "High", "Very High"];
      for (var j = 0; j < labels.length; j++) {
        labels[j] =
          labels[j] +
          ": " +
          Math.round(percentages[j] * 100) / 100 +
          "%" +
          " | " +
          hours[j] +
          " h";
      }

      this.config.data.datasets[0].data = percentages;
      this.config.data.labels = labels;
      window.doughnutChart.data = this.config.data;
      window.doughnutChart.update();
    },
  },
  beforeDestroy() {
    // Destroy chart object before leaving the view
    if (window.doughnutChart) window.doughnutChart.destroy();
  },
  // when the input dataset changes modify the graph
  watch: {
    datasets: {
      deep: true,
      handler: function () {
          this.updateDoughnutChart(this.datasets[0].data);
      },
    },
  },
};
</script>

<style scoped>
</style>