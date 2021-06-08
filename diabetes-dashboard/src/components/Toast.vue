<template>
    <v-snackbar v-model="show" :color="toast.color" right>
        {{ toast.message }}
        <template v-slot:action="{ attrs }">
            <v-btn text :color="toast.btnColor" v-bind="attrs" v-on:click="show = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            show: false,
            message: '',
            color: '',
        };
    },
    computed: {
        ...mapState(['toast'])
    },
    created() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'SHOW_MESSAGE') {
                this.message = state.toast.message;
                this.color = state.toast.color;
                this.show = true;
            }
        });
    }
};
</script>