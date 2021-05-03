<template>
  <div class="table">
    <v-data-table
      :headers="headers"
      :items="activities"
      item-key="name"
      class="elevation-1"
      :search="search"
      :hide-default-footer="true"
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
import moment from 'moment'
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
            activities: [
                {
                    activity: "Run",
                    date: moment("20210429T000000+0200").format('L'),
                    duration: "1 hour",
                    calories: 159
                },
                {
                    activity: "Yoga",
                    date: moment("20210424T000000+0200").format('L'),
                    duration: "30 minutes",
                    calories: 100,
                },
                {
                    activity: "Chess",
                    date: moment("20210425T000000+0200").format('L'),
                    duration: "1.5 hour",
                    calories: null,
                },
                {
                    activity: "Health check",
                    date: moment("20210426T000000+0200").format('L'),
                    duration: null,
                    calories: null,
                },
                {
                    activity: "Ice hokey",
                    date: moment("20210427T000000+0200").format('L'),
                    duration: "2.5 hours",
                    calories: 349,
                },
            ],
            search: ""
        }
    },
    mounted() {
    },
    computed: {
    },
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
