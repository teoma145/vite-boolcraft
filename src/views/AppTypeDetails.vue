<template>
    <div class="container">
        <h1 class="text-center">Type Details</h1>
        <div class="row justify-content-center">

            <div class="col-8">
                <div class="card">
                    <div class="card-body">
                        <h3> {{ item.name }}</h3>
                        <p>{{ item.description }}</p>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { store } from '../store'

export default {
    name: 'AppTypeDetails',
    data() {
        return {
            item: null

        }
    },
    methods: {
        getSingleType() {
            console.log(this.$route);

            axios.get(store.apiBaseUrl + '/types/' + this.$route.params.id).then(res => {
                //console.log(res);
                this.item = res.data.results;
            })
        }
    },
    mounted() {

    },
    created() {
        this.getSingleType();
    }
}
</script>
<style></style>