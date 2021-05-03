<template>
  <div id="app">
    <Header class="header"/>
    <div class="clearfix"></div>
    <div class="main">
      <v-row>
        <v-col class="col" cols="12" md="6">
          <v-container>
            <div class="col1">
              <Glucose/>
            </div>
          </v-container>
        </v-col>
        <v-col class="col" cols="12" md="6">
          <v-container>
            <div class="col1">
              <Profile/>
            </div>
          </v-container>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col" cols="12" md="6">
          <v-container>
            <div class="col1">
              <TableFoodData/>
            </div>
          </v-container>
        </v-col>
        <v-col class="col" cols="12" md="6">
          <v-container>
            <div class="col1 unalloc">
              <TableActivitiesData/>
            </div>
          </v-container>
        </v-col>
      </v-row>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import Glucose from './components/Glucose.vue'
import Profile from './components/Profile.vue'
import TableFoodData from './components/TableFoodData.vue'
import TableActivitiesData from './components/TableActivitiesData.vue'

export default {
  name: 'App',
  components: {
    Footer,
    Header,
    Glucose,
    Profile,
    TableFoodData,
    TableActivitiesData
  }
}
</script>

<style>
.unalloc {
  min-height: 40vh;
}
.col {
  padding: 5%;
  justify-content: center;
  align-items: center;
  display: flex;
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
.clearfix {
  height: 3vh;
  background-color: #f2f2f2;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
