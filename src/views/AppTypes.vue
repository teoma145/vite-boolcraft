
<template>
    <div class="container">
        <h1 class="text-center">Types</h1>
        <div class="row">
            <div v-for="item in typesList" class="col-3">
                <div class="card dnd-card mb-3">
                    <img :src="store.imagesBaseUrl + item.image" class="card-img-top" :alt="item.name">
                    <div class="card-body">
                        <h3 class="card-title dnd-card-title"> {{ item.name }}</h3>
                        <p class="card-text dnd-card-text">{{ item.description.substring(0, 40) + '...' }}</p>
                        <router-link class="btn btn-primary dnd-btn"
                            :to="{ name: 'type-details', params: { id: item.id } }">See Details</router-link>
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
                console.log(res.data.results);
                this.typesList = res.data.results;
            })
        }
    },
    mounted() {
        this.getAllTypes();
    }
}
</script>
<style lang="scss" scoped >
.dnd-card {
    border: 2px solid #6b4226;
    background-color: #fff8e6;
    transition: transform 0.2s;
}

.dnd-card:hover {
    transform: scale(1.05);
}

.dnd-card-title {
    color: #6b4226;
}

.dnd-card-text {
    color: #000;
}

.dnd-btn {
    background-color: #6b4226;
    border-color: #6b4226;
}

.dnd-btn:hover {
    background-color: #4d2c18;
    border-color: #4d2c18;
}
</style>