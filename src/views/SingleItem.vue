<template>
  <main class="container mt-5">
    <div class="d-flex gap-5">
      <div class="items-img" v-if="item">
        <img src="/images/javelin.jpg" :alt="this.item.name" />
      </div>
      <div class="items-description">
        <h1 class="text-center items-name py-1">{{ item.name }}</h1>
        <p class="text-center my-4">{{ item.description }}</p>
        <div class="text-center items-prop py-1 mb-2">Category</div>
        <div class="text-center my-4">{{ item.category }}</div>
        <div class="text-center items-prop py-1 mb-2">Specs</div>
        <div class="d-flex justify-content-center align-items-center mt-3 mb-1">
          <div class="d-flex flex-column me-4">
            <i class="fa-solid fa-dumbbell items-icon text-center"></i>
            <span>{{ item.weight }}</span>
          </div>
          <div class="d-flex flex-column">
            <i class="fa-solid fa-coins items-icon text-center"></i>
            <span>{{ item.cost }}</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { store } from "../store";
export default {
  name: "SingleItem",
  data() {
    return {
      store,
      item: null,
    };
  },
  methods: {
    getItemData() {
      axios
        .get(`${this.store.apiBaseUrl}/items/${this.$route.params.id}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.result) {
            this.item = res.data.result;
          }
        });
    },
  },
  created() {
    this.getItemData();
  },
};
</script>

<style lang="scss" scoped></style>
