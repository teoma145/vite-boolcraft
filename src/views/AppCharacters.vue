<template>
    <h1 class="text-center text-uppercase mb-3">Characters list</h1>
    <div class="container">
        <div class="row">
            <div class="col-md-4 mb-3" v-for="character in characters" :key="character.id">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Name: {{character.name}}</h5>
                  <p class="card-text">Description: {{ character.description }}</p>
                  <p class="card-text">Attack Power: {{ character.attack }}</p>
                  <p class="card-text">Defense Power: {{ character.defence }}</p>
                  <p class="card-text">Speed: {{ character.speed }}</p>
                  <p class="card-text">Life: {{ character.life }}</p>
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

<style lang="scss" scoped></style>
