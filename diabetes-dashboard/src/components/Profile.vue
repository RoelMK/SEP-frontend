<template>
  <div class="profile">
      <h2>
          Hey Jeroen!
          <vue-reaction-emoji :reaction="reaction" :is-active="isActive" :is-disabled="isDisabled" :height="height" />
      </h2>
      <h4>{{ title }}</h4>
      <p>Your current glucose level is 140 mg/dL.</p>
      <p>Your heart rate is 90 bpm.</p>
      <p>And some more interesting data, of course</p>
      <vue-feedback-reaction />
  </div>
</template>

<script>
import { VueReactionEmoji, VueFeedbackReaction } from 'vue-feedback-reaction'
import { AxiosWrapper } from '@/helpers/wrapper.js'

/* Create a new instance of AxiosWrapper with required headers */
const wrapper = new AxiosWrapper({ 'accept': 'application/json' })

export default {
    name: 'profile',
    components: {
        VueReactionEmoji,
        VueFeedbackReaction
    },
    data() {
        return {
            reaction: 'excellent',
            isActive: false,
            isDisabled: false,
            height: "30px",
            title: '',
            payload: {
                title: 'Hello from POST request',
                body: 'Example body',
                userId: 1,
            }
        }
    },
    mounted() {
        /* Example of POST Request, similar requests can be made for GET, PUT and DELETE */
        wrapper.post('https://jsonplaceholder.typicode.com/posts', this.payload, dataPromise => dataPromise)
            .then(data => this.title = data.title)
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

.profile h2 {
    margin: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
