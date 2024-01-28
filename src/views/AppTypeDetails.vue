<template>
    <div class="container">
      <h1 class="text-center mb-5">Type Details</h1>
      <div class="row justify-content-center">
        <div class="col-6 type-details-img mb-4">
           <img :src="store.imagesBaseUrl + type.image" :alt="type.name" v-if="type.image">
           <img src="https://www.worldofleveldesign.com/categories/ue4/images/012-ue4-crash-course-86.jpg" class="card-img-top" :alt="type.name" v-else>
        </div>
        <div class="col-8">
          <div class="card">
            <div class="card-body">
              <h3>{{ type.name }}</h3>
              <p>{{ type.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import axios from "axios";
  import { store } from "../store";
  
  export default {
    name: "AppTypeDetails",
    data() {
      return {
        type: null,
        store
      };
    },
    methods: {
      getSingleType() {
        console.log(this.$route);
  
        axios
          .get(store.apiBaseUrl + "/types/" + this.$route.params.id)
          .then((res) => {
            //console.log(res);
            this.type = res.data.results;
          });
      },
    },
    mounted() {},
    created() {
      this.getSingleType();
    },
  };
  </script>
  <style></style>
  