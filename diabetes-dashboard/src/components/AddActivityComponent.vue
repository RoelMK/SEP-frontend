<template>
    <form @submit="onSubmit">
        <input type="number" v-model="userId" placeholder="Add Activities (int)">
        <input type="number" v-model="id" placeholder="Add Date (int)">
        <input type="text" v-model="title" placeholder="Add Duration (str)">
        <input type="submit" value="Submit">
    </form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: "AddActivityComponent",
    // store data from form
    data() {
        return {
            userId: '',
            id: '',
            title: ''
        }
    },
    methods: {
        ...mapActions(['addActivity']),
        onSubmit(e) {
            e.preventDefault();
            this.addActivity(this.userId, this.id, this.title);
        }
    }
}
</script>

<style>

</style>