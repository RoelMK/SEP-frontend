<template>
    <div class="table">
        <v-data-table
            :headers="headers"
            :items="activities"
            item-key="name"
            :search="search"
            :hide-default-footer="true"
            elevation="0"
            @click:row="selectActivity"
        >
            <template v-slot:top>
                <v-container>
                    <v-row>
                        <v-col xs="10" sm="10" md="10" lg="10">
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
import moment from 'moment';

export default {
    name: 'TableActivitiesData',
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
                    text: "Start Time",
                    value: "startTime"
                },
                {
                    text: "End Time",
                    value: "endTime"
                },
                {
                    text: "Calories",
                    value: "calories"
                }
            ],
            activities: [
                {
                    activity: "Run",
                    date: moment().subtract(1,'day').format('L'),
                    startTime: moment().subtract(24,'hours').format('HH:mm'),
                    endTime: moment().subtract(23,'hours')
                        .subtract(10,'minutes').format('HH:mm'),
                    calories: 159
                },
                {
                    activity: "Yoga",
                    date: moment().subtract(1,'day').format('L'),
                    startTime: moment().subtract(20,'hours').format('HH:mm'),
                    endTime: moment().subtract(19,'hours')
                        .subtract(30,'minutes').format('HH:mm'),
                    calories: 100,
                },
                {
                    activity: "Chess",
                    date: moment().subtract(1,'day').format('L'),
                    startTime: moment().subtract(22,'hours').format('HH:mm'),
                    endTime: moment().subtract(21,'hours').format('HH:mm'),
                    calories: null,
                },
                {
                    activity: "Health check",
                    date: moment().format('L'),
                    startTime: moment().subtract(4,'hours').format('HH:mm'),
                    endTime: moment().subtract(3,'hours')
                        .subtract(30,'minutes').format('HH:mm'),
                    calories: null,
                },
                {
                    activity: "Ice hokey",
                    date: moment().format('L'),
                    startTime: moment().subtract(2,'hours').format('HH:mm'),
                    endTime: moment().subtract(1,'hours').format('HH:mm'),
                    calories: 349,
                },
            ],
            search: ""
        };
    },
    computed: {
    },
    methods: {
        selectActivity(activity) {
            this.$emit('selectedActivity', activity);
        }
    },
};
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
