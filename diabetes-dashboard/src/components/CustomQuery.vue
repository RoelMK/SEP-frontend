<template>
    <v-dialog v-model="filter.show" max-width="800">
        <v-card>
            <v-card-title>Querying options</v-card-title>
            <v-card-text class="pb-0">
                <v-row align="center" class="mx-0">
                    <v-col class="pl-0">
                        <p v-if="instances.length <= 0" class="mt-5">No filters applied</p>
                    </v-col>
                    <v-col class="text-right pr-0">
                        <v-btn v-on:click="addInstance(instances.length)" text tile plain>
                            Add filter
                            <v-icon size="18" class="ml-2">mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <Query v-for="(instance, index) in instances" :key="index" :idx="index" v-on:removeInstance="removeInstance" />
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="$store.dispatch('showFilter', { show: false })">
                    Cancel
                </v-btn>
                <v-btn color="green darken-1" text @click="$store.dispatch('showFilter', { show: false })">
                    Apply Filters
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import Query from '@/components/Query.vue';
import { mapState } from 'vuex';

export default {
    components: {
        Query
    },
    data() {
        return {
            instances: [],
        };
    },
    computed: {
        ...mapState(['filter'])
    },
    methods: {
        addInstance(count) {
            if (count < 5)
                this.instances.push(Query);
            else
                this.$toaster.showMessage({
                    message: 'Maximum number of query filters exceeded',
                    color: 'dark',
                    btnColor: 'pink'
                });
        },
        removeInstance(idx) {
            this.instances.splice(idx, 1);
        }
    }
};
</script>

<style>
.mdi-plus {
  border-radius: 50%;
  padding: 0.2rem;
  background: rgba(0, 0, 0, 0.15);
}
</style>