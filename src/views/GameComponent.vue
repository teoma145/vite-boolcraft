<template>
    <div class="mybg-d">
        <div class="container d-flex h-100 align-items-center justify-content-center ">
            <div class="d-flex">
                <div class="text-black me-5 bg-white ">
                <select v-model="selectedCharacter" @change="getSelectedCharacterStats">
                    <option v-for="character in characters" :key="character.id" :value="character.name">{{ character.name }}</option>
                </select><br>
                    Difesa:{{ selectedCharacterStats.defence }}<br>
                    Vita:{{ selectedCharacterStats.life }}<br>
                    Speed:{{ selectedCharacterStats.speed }}<br>
                    Attacco:{{ selectedCharacterStats.attack }}<br>
                    
                </div>
                <div class="mt-4">
                    <h1 class="text-danger">VERSUS</h1>
                </div>
                <div class="text-black ms-5 bg-white ">
                    nome:{{ selectedOpponentStats.name }}<br>
                    Difesa:{{ selectedOpponentStats.defence }}<br>
                    Vita:{{ selectedOpponentStats.life }}<br>
                    Speed:{{ selectedOpponentStats.speed }}<br>
                    Attacco:{{ selectedOpponentStats.attack }}<br>
                    
                    
                </div>
            </div>
             <button @click="selectRandomOpponent">Entra nell'arena</button><br>
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
            selectedCharacter: "",
            selectedCharacterStats: {
                defence: 0,
                life: 0,
                speed: 0,
                attack: 0,
                
            },
            selectedOpponentStats: {
            name: "",
            defence: 0,
            life: 0,
            speed: 0,
            attack: 0,
            
      }
        }
    },
    methods: {
        getSelectedCharacterStats() {
            const selectedCharacter = this.characters.find(character => character.name === this.selectedCharacter);
            if (selectedCharacter) {
                this.selectedCharacterStats.defence = selectedCharacter.defence;
                this.selectedCharacterStats.life = selectedCharacter.life;
                this.selectedCharacterStats.speed = selectedCharacter.speed;
                this.selectedCharacterStats.attack = selectedCharacter.attack;
                 
                
            }
        },
        getGameCharacters() {
            axios.get(store.apiBaseUrl + "/characters").then((response) => {
                console.log(response);
                this.characters = response.data.data;
                console.log(this.characters);
            });
        },
         selectRandomOpponent() {
        const filteredCharacters = this.characters.filter(character => character.name !== this.selectedCharacter);
        const randomOpponent = this.getRandomCharacter(filteredCharacters);
        this.selectedOpponentStats.name = randomOpponent.name;
        this.selectedOpponentStats.defence = randomOpponent.defence;
        this.selectedOpponentStats.life = randomOpponent.life;
        this.selectedOpponentStats.speed = randomOpponent.speed;
        this.selectedOpponentStats.attack = randomOpponent.attack;
        },
        getGameTypes() {
            axios.get(store.apiBaseUrl + '/types').then(res => {
                //console.log(res);
                this.typesList = res.data.results;
            })
        },
        getGameItems() {
            axios.get(store.apiBaseUrl + `/items`).then((res) => {

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
.mybg-d {
    background-image: url(../assets/images/D&D.jpg);
    background-size: cover;
    height: 100vh;
    margin-top: -100px;
    margin-bottom: -100px;
}


html,
body {
    height: 100%;
    margin: 0;

}
</style>