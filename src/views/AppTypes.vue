<template>
    <div class="container">
        <h1 class="text-center">Types</h1>
        <div class="row">

            <div v-for="item in typesList" class="col-3">
                <div class="card">
                    <div class="card-body">
                        <h3> {{ item.name }}</h3>
                        <p>{{ item.description.substring(0, 20) + '...' }}</p>
                        <router-link class="btn btn-primary" :to="{ name: 'type-details', params: { id: item.id } }"> See Details</router-link>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>
<script>
import { store } from '../store';
import axios from 'axios';
export default {
    name: 'AppTypes',
    data() {
        return {
            store,
            typesList: null
        }
    },
    methods: {
        getAllTypes() {
            axios.get(store.apiBaseUrl + '/types').then(res => {
                //console.log(res);
                this.typesList = res.data.results;
            })
        }
    },
    mounted() {
        this.getAllTypes();
    }
}
</script>
<style></style>