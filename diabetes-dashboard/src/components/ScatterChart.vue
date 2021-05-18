<template>
  <v-container>
    <canvas id="scatterChart"></canvas>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Chart from "chart.js/auto";
import pluginAnnotation from "chartjs-plugin-annotation";
import moment from "moment";

import "chartjs-adapter-moment";

Chart.register(pluginAnnotation);

export default {
  name: "scatter-Chart",
  props: {
    data: Object,
  },
  // when the input data changes modify the graph
  watch: {
    data: {
      deep: true,
      handler(newData) {
        if (newData === null) {
          this.$emit("noDataDialog", true);
        } else {
          const chart = window.scatterChart;
          chart.data = newData;
          chart.update();
        }
      },
    },
  },
  data() {
    return {
      scatterChart: null,
      config: {
        type: "scatter",
        data: this.data,
        options: {
          responsive: true,
          scales: {
            x: {
              type: "time",
              time: {
                minUnit: "minute",
              },
              max: moment().valueOf(),
              min: moment().subtract(5, "minutes").valueOf(),
            },
            y: {
              min: 0,
              max: 20,
              ticks: {
                stepSize: 0.1,
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Scatter Chart",
            },
            annotation: {
              annotations: {
                hypoThreshold: {
                  type: "line",
                  yMin: 1,
                  yMax: 1,
                  borderColor: "rgb(255, 0, 0)",
                  borderWidth: 7,
                },
                hyperThreshold: {
                  type: "line",
                  yMin: 8,
                  yMax: 8,
                  borderColor: "rgb(128,0,128)",
                  borderWidth: 7,
                },
                normal: {
                  type: "box",
                  yMin: 2,
                  yMax: 7,
                  backgroundColor: "rgba(0, 255, 0, 0.25)",
                },
              },
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
    const ctx1 = document.getElementById("scatterChart");
    window.scatterChart = new Chart(ctx1, this.config);
    window.scatterChart.options.plugins.annotation.annotations.hypoThreshold.yMin = this.getHealthSettings.hypoThreshold;
    window.scatterChart.options.plugins.annotation.annotations.hypoThreshold.yMax = this.getHealthSettings.hypoThreshold;
    window.scatterChart.options.plugins.annotation.annotations.hyperThreshold.yMin = this.getHealthSettings.hyperThreshold;
    window.scatterChart.options.plugins.annotation.annotations.hyperThreshold.yMax = this.getHealthSettings.hyperThreshold;
    window.scatterChart.options.plugins.annotation.annotations.normal.yMin = this.getHealthSettings.hypoThreshold;
    window.scatterChart.options.plugins.annotation.annotations.normal.yMax = this.getHealthSettings.hyperThreshold;
    window.scatterChart.update();
  },

  beforeDestroy() {
    // Destroy chart object before leaving the view
    if (this.scatterChart) this.scatterChart.destroy();
  },
};
</script>

<style scoped>
</style>