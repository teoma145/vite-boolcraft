<template>
  <main class="container ">
    <div class="d-flex gap-5 pt-5">
      <div class="items-img" v-if="item">
        <img :src="store.imagesBaseUrl + item.image" :alt="item.name" v-if="item.image" />
        <img src="https://www.worldofleveldesign.com/categories/ue4/images/012-ue4-crash-course-86.jpg" class="card-img-top" :alt="item.name" v-else>
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
          <div class="d-flex flex-column ms-4">
            <i class="fa-solid fa-skull-crossbones items-icon text-center"></i>
            <span>{{ item.damage_dice }}</span>
          </div>
          <!-- <i class="fa-solid fa-skull-crossbones"></i> -->
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

<style lang="scss" scoped>
main{
  height:calc(100vh - 317px)
}
</style>
