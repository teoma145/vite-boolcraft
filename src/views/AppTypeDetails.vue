<template>
  <div class="container">
    <h1 class="text-center mb-5">Type Details</h1>
    <div class="row justify-content-center">
      <div class="col-6 type-details-img mb-3" v-if="type.image">
        <!-- <img :src="store.imagesBaseUrl + type.image" :alt="type.name"> -->
        <img src="/images/Barbarian_info.webp" alt="#" />
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
