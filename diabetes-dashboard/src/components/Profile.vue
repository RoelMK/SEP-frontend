<template>
    <div class="profile">
        <h2>
            {{ $t('profile.hello') }} Jeroen!
            <vue-reaction-emoji
                :reaction="reaction"
                :is-active="isActive"
                :is-disabled="isDisabled"
                :height="height"
            />
        </h2>
        <h4>{{ title }}</h4>
        <p>{{ $t('profile.glucose-level') }} 140 mg/dL.</p>
        <p>{{ $t('profile.heartrate-level') }} 90 bpm.</p>
        <p>{{ $t('profile.selected-activity') }} {{ selectedActivity }}</p>
        <p>{{ $t('profile.selected-food') }} {{ selectedFoodItem }}</p>
        <vue-feedback-reaction :labels="['angry', 'moody', 'neutral', 'happy', 'excellent']"/>
    </div>
</template>

<script>
import { VueReactionEmoji, VueFeedbackReaction } from 'vue-feedback-reaction';
export default {
    name: 'Profile',
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
        };
    },
    created() {
        console.log("Getting created");
        console.log(this.$route.query.expiresOn);
    },
    computed: {
    },
    methods: {
    },
    props: ['selectedFoodItem', 'selectedActivity'],
};
</script>

<style scoped>
.profile {
    height: auto;
    min-height: 40vh;
    width: 100%;
    overflow: auto;
    text-align: center;
}

.profile h2 {
    margin: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
