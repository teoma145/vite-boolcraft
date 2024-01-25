
<template>
    <div class="mybg-d">
        <div class="container d-flex h-100 align-items-center justify-content-center ">
            <div class="d-flex">
                <div class="text-black me-5 bg-white ">
                    {{ getRandomCharacter(characters).name }}<br>
                    Difesa:{{ getRandomCharacter(characters).defence }}<br>
                    Vita:{{ getRandomCharacter(characters).life }}<br>
                    speed:{{ getRandomCharacter(characters).speed }}<br>
                    Attacco:{{ getRandomCharacter(characters).attack }}<br>
                    classe:{{ getRandomType(typesList).name }}<br>
                    oggetto:{{ getRandomItem(store.Items).name }}
                </div>
                <div class="mt-4">
                    <H1 class="text-danger">VERSUS</H1>
                </div>
                <div class="text-black ms-5 bg-white ">
                    {{ getRandomCharacter(characters).name }}<br>
                    Difesa:{{ getRandomCharacter(characters).defence }}<br>
                    Vita:{{ getRandomCharacter(characters).life }}<br>
                    speed:{{ getRandomCharacter(characters).speed }}<br>
                    Attacco:{{ getRandomCharacter(characters).attack }}<br>
                    classe:{{ getRandomType(typesList).name }}<br>
                    oggetto:{{ getRandomItem(store.Items).name }}
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import { store } from "../store";
    import axios from "axios";
    export default {
    name: 'GameComponent',
    data() {
        return {
            Items: null,
            typesList: null,
            characters: [],
            store,
        }
    },
    methods: {
        getGameCharacters() {
      axios.get(store.apiBaseUrl + "/characters").then((response) => {
        console.log(response);
        this.characters = response.data.data;
        console.log(this.characters);
      });
    },
    getGameTypes() {
            axios.get(store.apiBaseUrl + '/types').then(res => {
                //console.log(res);
                this.typesList = res.data.results;
            })
        },
    getGameItems() {
            axios.get(store.apiBaseUrl+`/items`).then((res) => {
                     
            store.Items = res.data.results
            })
            },
        getRandomCharacter(charactersArray) {
            const randomIndex = Math.floor(Math.random() * charactersArray.length);
            return charactersArray[randomIndex];
        },

        getRandomType(typesArray) {
            const randomIndex = Math.floor(Math.random() * typesArray.length);
            return typesArray[randomIndex];
        },

        getRandomItem(itemsArray) {
            const randomIndex = Math.floor(Math.random() * itemsArray.length);
            return itemsArray[randomIndex];
        },
    },
        
    
    created() {
        this.getGameCharacters();
        this.getGameTypes();  
        this.getGameItems();  
    }
    }
</script>

<style lang="scss" scoped>
.mybg-d{
    background-image: url(../assets/images/D&D.jpg);
    height: 100vh;
}

        
html, body {
    height: 100%;
    margin: 0;
    
        }

</style>