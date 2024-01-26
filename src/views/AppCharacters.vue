<template>
  <h1 class="text-center text-uppercase mb-3">Characters list</h1>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4 mb-3 d-flex" v-for="character in characters" :key="character.id">
        <div class="card dnd-card flex-fill">
          <img :src="store.imagesBaseUrl + character.image" class="card-img-top" :alt="character.name">
          <div class="card-body">
            <h5 class="card-title dnd-card-title">{{ character.name }}</h5>
            <p class="card-text dnd-card-text">{{ character.description }}</p>
            <div>
              <span class="badge text-bg-danger">ATK: </span>
              <span>{{ ' '+ character.attack }}</span>
            </div>
            <div>
              <span class="badge text-bg-primary">DEF: </span>
              <span>{{ ' '+ character.defence }}</span>
            </div>
            <div>
              <span class="badge text-bg-success">SPEED: </span>
              <span>{{ ' '+ character.speed }}</span>
            </div>
            <div>
              <span class="badge text-bg-warning">LP: </span>
              <span>{{ ' '+ character.life }}</span>
            </div>
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
  name: "AppCharacters",
  data() {
    return {
      store,
      characters: [],
    };
  },
  methods: {
    getAllCharacters() {
      axios.get(store.apiBaseUrl + "/characters").then((response) => {
        console.log(response);
        this.characters = response.data.data;
        console.log(this.characters);
      });
    },
  },
  mounted() {
    this.getAllCharacters();
  },
};
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
</style>