<template>
    <div id="test">
        <div class="main">
            <v-row>
                <v-col class="col" cols="12">
                    <v-container>
                        <div class="col1">
                            <Ranger/>
                        </div>
                    </v-container>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import Ranger from '@/components/RangeSelector.vue';

export default {
  name: 'Test',
  components: {
      Ranger
  }
}
</script>

<style>
.unalloc {
  min-height: 40vh;
}
.col {
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
</style>
