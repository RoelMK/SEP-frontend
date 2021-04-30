<template>
  <div class="table">
    <v-data-table
      :headers="headers"
      :items="allActivities"
      item-key="name"
      class="elevation-1"
      :search="search"
      :hide-default-footer="true"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-container>
            <v-row>
                <v-col xs="11" sm="11" md="11" lg="11">
                    <v-text-field v-model="search" label="Search"></v-text-field>
                </v-col>
                <v-col><v-icon medium>mdi-plus</v-icon></v-col>
            </v-row>
        </v-container>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'profile',
    data() {
        return {
            headers: [
                {
                    text: "Activities",
                    value: "activity"
                },
                {
                    text: "Date",
                    value: "date"
                },
                {
                    text: "Duration",
                    value: "duration"
                },
                {
                    text: "Calories",
                    value: "calories"
                }
            ],
            // desserts: [
            //     {
            //         activity: "Run",
            //         date: new Date("04-20-2021").toLocaleDateString(),
            //         duration: "1 hour",
            //         calories: 159
            //     },
            //     {
            //         activity: "Yoga",
            //         date: new Date("04-05-2021").toLocaleDateString(),
            //         duration: "30 minutes",
            //         calories: 100,
            //     },
            //     {
            //         activity: "Chess",
            //         date: new Date("04-01-2021").toLocaleDateString(),
            //         duration: "1.5 hour",
            //         calories: null,
            //     },
            //     {
            //         activity: "Health check",
            //         date: new Date("03-24-2021").toLocaleDateString(),
            //         duration: null,
            //         calories: null,
            //     },
            //     {
            //         activity: "Ice hokey",
            //         date: new Date("03-16-2021").toLocaleDateString(),
            //         duration: "2.5 hours",
            //         calories: 349,
            //     },
            // ],
            search: ""
        }
    },
    mounted() {
    },
    // state getters you need to use
    computed: mapGetters(['allActivities']),
    methods: {
    }
}
</script>

<style scoped>
.table {
    padding: 3%;
    height: auto;
    min-height: 40vh;
    width: 100%;
    overflow: auto;
}

.mdi-plus {
    border-radius: 50%;
    padding: .2rem;
    background: rgba(0, 0, 0, .15);
}
</style>
