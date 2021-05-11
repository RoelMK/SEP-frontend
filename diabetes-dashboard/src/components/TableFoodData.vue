<template>
  <div class="table">
    <v-data-table
      :headers="headers"
      :items="desserts"
      item-key="name"
      class="elevation-1"
      :search="search"
      :hide-default-footer="true"
      @click:row="selectFood"
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
export default {
    name: 'TableFoodData',
    data() {
        return {
            headers: [
                {
                    text: "Dessert (100g topping)",
                    value: "dessert"
                },
                {
                    text: "Calories",
                    value: "calories"
                },
                {
                    text: "Fat (g)",
                    value: "fat"
                },
                {
                    text: "Carbs (g)",
                    value: "carbs"
                },
                { 
                    text: "Protein (g)",
                    value: "protein"
                },
                {
                    text: "Iron (%)",
                    value: "iron"
                }
            ],
            desserts: [
                {
                    dessert: "Frozen Yoghurt",
                    calories: 159,
                    fat: 6,
                    carbs: 24,
                    protein: 4,
                    iron: 1,
                },
                {
                    dessert: "Ice cream sandwich",
                    calories: 237,
                    fat: 9,
                    carbs: 37,
                    protein: 4.3,
                    iron: 1,
                },
                {
                    dessert: "Eclair",
                    calories: 262,
                    fat: 16,
                    carbs: 23,
                    protein: 6,
                    iron: 9,
                },
                {
                    dessert: "Cupcake",
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: 8,
                },
                {
                    dessert: "Gingerbread",
                    calories: 356,
                    fat: 16,
                    carbs: 49,
                    protein: 3.9,
                    iron: 16,
                },
            ],
            search: ""
        }
    },
    computed: {
    },
    methods: {
        selectFood(food) {
            this.$emit('selectedFood', food);
        }
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
