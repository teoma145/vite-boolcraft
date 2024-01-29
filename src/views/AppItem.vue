<template>
    <div class="container">
        <h1 class="text-center text-uppercase mb-3">Items list</h1>
        <div class="row d-flex justify-content-center align-items-stretch">
            <div class="col-12 col-md-4 col-lg-3" v-for="item in store.Items" :key="item.id">
                <div class="card mb-3 dnd-card" style="width: 18rem;">
                    <div class="wrap-image">
                        <img :src="store.imagesBaseUrl + item.image" class="card-img-top" :alt="item.name" v-if="item.image">
                        <img src="https://www.worldofleveldesign.com/categories/ue4/images/012-ue4-crash-course-86.jpg" class="card-img-top" :alt="item.name" v-else>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title dnd-card-title">{{ item.name }}</h5>
                        <p class="card-text dnd-card-text">{{ item.description.substring(0, 40) + '...' }}</p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>Type:</strong>{{ item.type }} </li>
                            <li class="list-group-item"><strong>Category:</strong>{{ item.category }} </li>
                            <router-link :to="{ name: 'single-item', params: { id: item.id } }"
                                class="btn btn-primary dnd-btn">
                                Show {{ item.name }}
                            </router-link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


 
<script>
import { store } from "../store";
import axios from "axios";

export default {
    name: 'AppItem',

    data() {
        return {
            store,

        }
    },
    methods: {
        getItems() {
            axios.get(store.apiBaseUrl + `/items`).then((res) => {

                store.Items = res.data.results
            })
        }
    },
    created() {
        this.getItems();
    }
}
</script>
 
<style lang="scss" scoped>
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

.wrap-image{
    height: 300px; 
    overflow: hidden;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>