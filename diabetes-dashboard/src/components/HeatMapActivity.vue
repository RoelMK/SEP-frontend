<template>
  <div>
    <VueChartHeatmap :entries="entries"></VueChartHeatmap>
  </div>
</template>

<script>
import VueChartHeatmap from "vue-chart-heatmap";
export default {
  name: "activityMap",
  components: {
    VueChartHeatmap,
  },
  data() {
    return {
      entries: [
        {
          counting: 2070,
          created_at: "2021-01-21",
        },
        {
          counting: 3493,
          created_at: "2021-01-22",
        },
        {
          counting: 1000,
          created_at: "2021-01-24",
        },
        {
          counting: 750,
          created_at: "2021-01-23",
        },
        {
          counting: 2070,
          created_at: "2021-01-11",
        },
        {
          counting: 2000,
          created_at: "2021-01-10",
        },
        {
          counting: 4500,
          created_at: "2021-01-12",
        },
        {
          counting: 2070,
          created_at: "2020-06-21",
        },
        {
          counting: 3493,
          created_at: "2020-06-22",
        },
        {
          counting: 1000,
          created_at: "2020-06-24",
        },
        {
          counting: 750,
          created_at: "2020-06-23",
        },
        {
          counting: 2070,
          created_at: "2020-07-11",
        },
        {
          counting: 2000,
          created_at: "2020-07-10",
        },
        {
          counting: 4500,
          created_at: "2020-07-12",
        },
        {
          counting: 349,
          created_at: "2020-07-13",
        },
        {
          counting: 988,
          created_at: "2020-07-14",
        },
        {
          counting: 3043,
          created_at: "2020-07-15",
        },
        {
          counting: 3400,
          created_at: "2020-07-16",
        },
        {
          counting: 5000,
          created_at: "2020-08-01",
        },
        {
          counting: 120,
          created_at: "2020-08-02",
        },
        {
          counting: 6304,
          created_at: "2020-08-03",
        },
        {
          counting: 876,
          created_at: "2020-08-04",
        },
        {
          counting: 5000,
          created_at: "2020-08-05",
        },
        {
          counting: 120,
          created_at: "2020-08-06",
        },
        {
          counting: 6304,
          created_at: "2020-08-07",
        },
        {
          counting: 500,
          created_at: "2020-09-01",
        },
        {
          counting: 1020,
          created_at: "2020-09-02",
        },
        {
          counting: 634,
          created_at: "2020-09-03",
        },
        {
          counting: 8706,
          created_at: "2020-09-04",
        },
        {
          counting: 5020,
          created_at: "2020-09-05",
        },
        {
          counting: 1207,
          created_at: "2020-09-06",
        },
        {
          counting: 6301,
          created_at: "2020-09-07",
        },
        {
          counting: 5010,
          created_at: "2020-10-01",
        },
        {
          counting: 120,
          created_at: "2020-10-02",
        },
        {
          counting: 6304,
          created_at: "2020-10-03",
        },
        {
          counting: 706,
          created_at: "2020-10-04",
        },
        {
          counting: 240,
          created_at: "2020-10-05",
        },
        {
          counting: 2107,
          created_at: "2020-10-06",
        },
        {
          counting: 538,
          created_at: "2020-10-07",
        },
        {
          counting: 500,
          created_at: "2020-11-01",
        },
        {
          counting: 1020,
          created_at: "2020-11-02",
        },
        {
          counting: 634,
          created_at: "2020-11-03",
        },
        {
          counting: 8706,
          created_at: "2020-11-04",
        },
        {
          counting: 5020,
          created_at: "2020-11-05",
        },
        {
          counting: 1207,
          created_at: "2020-11-06",
        },
        {
          counting: 6301,
          created_at: "2020-11-07",
        }
      ]
    };
  },
};
</script>
