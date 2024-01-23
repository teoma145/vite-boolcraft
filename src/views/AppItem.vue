<template>
    <main class="container">
        <h1>Item List</h1>
    
    <div class="col-12 col-md-4 col-lg-3" v-for="item in store.Items" :key="item.id"><router-link :to="{ name: 'single-item', params: { id: item.id } }" class="btn btn-primary">{{ item.name }}</router-link></div>
    
    </main>
 
             
 
 </template>
 
 <script>
  import { store } from "../store";
  import axios from "axios";
  
     export default {
         name: 'AppItem',
         
         data(){
             return {
                 store,

             }
         },
         methods: {
             getItems() {
                 axios.get(store.apiBaseUrl+`/items`).then((res) => {
                     
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
 
 </style>