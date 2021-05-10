<template>
    <div id="test">
        <div class="main">
            <v-row>
                <v-col cols="12">
                    <v-container>
                        <div class="col1">
                            <LineChart :datasets="this.datasets" :labels="this.labels" />
                        </div>
                    </v-container>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

// For testing purposes
const rr = moment.range(moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm'), moment().format("YYYY-MM-DD HH:mm"));
const arr = Array.from(rr.by("minutes"));

export default {
  name: 'Test',
  components: {
      LineChart
  },
  data() {
    return {
      labels: arr.map(date => moment(date)),
      datasets: [  
          {
              label: 'Glucose',
              fill: 'start',
              data: Array.from({length: arr.length}, () => Math.floor(Math.random() * 120)),
              backgroundColor: "rgba(54,73,93,.5)",
              borderColor: "#36495d",
              borderWidth: 3
          },
          {
              label: 'Iron',
              fill: 'start',
              data: Array.from({length: arr.length}, () => Math.floor(Math.random() * 120)),
              backgroundColor: "rgba(71, 183,132,.5)",
              borderColor: "#47b784",
              borderWidth: 3
          }
      ]
    }
  }
}
</script>

<style>
.unalloc {
  min-height: 40vh;
}
.col1 {
  border-radius: 20px;
  left: 3%;
  right: 3%;
  background-color: white
}
.main {
  background-color: #f2f2f2;
  padding: 0 2% 0 2%;
}
</style>
