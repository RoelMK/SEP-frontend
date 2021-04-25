<template>
  <div class="profile">
      <h2>Hey Jeroen!</h2>
      <p>Your current glucose level is 140 mg/dL.</p>
      <p>Your heart rate is 90 bpm.</p>
      <p>And some more interesting data, of course</p>


  </div>
</template>

<script>
export default {
    name: 'profile',
    data() {
        return {
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
.profile {
    height: auto;
    min-height: 40vh;
    width: 100%;
    overflow: auto;
}
</style>
