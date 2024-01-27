<template>
    <div class="mybg-d">
        <div class="container h-100 align-items-center justify-content-center ">
            <div class="row justify-content-center py-5">
                <h1 class="text-center text-danger">
                    Select Your Character
                </h1>
                <div class="col-3 pt-5">

                    <div v-if="!randomCharacter">
                        <select @change="getSelectedCharacter()" name="" id="" class="form-select"
                            v-model="selectedCharacterId">
                            <option :value="character.id" v-for="character in characters"> {{ character.name }}
                            </option>
                        </select>
                    </div>

                </div>

            </div>

            <div class="text-black me-5">
                <div class="d-flex justify-content-between" v-if="selectedCharacter">
                    <div class="">
                        <div class="card">
                            <div class="card-body mb-5">
                                <h5>Name:{{ selectedCharacter.name }}</h5>
                                <div>Defence:{{ selectedCharacter.defence }} </div>
                                <div>Life:{{ selectedCharacter.life }}</div>
                            </div>

                        </div>
                        <button v-if="!randomCharacter" @click.once="rndOpponent()" class="btn btn-primary">Random
                            Opponent</button>
                    </div>


                    <div>

                        <div class="mb-5" v-if="randomCharacter">
                            <div class="mt-4">
                                <h2 class="text-danger">VERSUS</h2>
                            </div>
                        </div>
                    </div>

                    <div v-if="randomCharacter">

                        <div class="card">
                            <div class="card-body">
                                <h5>{{ randomCharacter.name }}</h5>
                                <div>{{ randomCharacter.defence }} </div>
                                <div>{{ randomCharacter.life }}</div>
                            </div>
                        </div>

                    </div>

                </div>


            </div>

            <div class="text-black ms-5">

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
            randomCharacter: null,
            selectedCharacterId: null,
            selectedCharacter: null,
            charactersFree: null
        }
    },
    methods: {
        getGameCharacters() {
            axios.get(store.apiBaseUrl + "/characters").then((response) => {
                this.characters = response.data.data;
            });
        },
        getSelectedCharacter() {
            this.characters.forEach(el => {
                if (el.id == this.selectedCharacterId) {
                    this.selectedCharacter = el;
                }
            })

        },
        rndOpponent() {
            const charactersFree = this.characters.filter(el => el.id != this.selectedCharacterId)
            console.log(charactersFree);
            this.randomCharacter = charactersFree[this.getRndInteger(0, charactersFree.length)];
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
            console.log('numero random type :' + randomIndex);
            return typesArray[randomIndex];
        },

        getRandomItem(itemsArray) {
            const randomIndex = Math.floor(Math.random() * itemsArray.length);
            return itemsArray[randomIndex];
        },
        getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
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
}

.my-bg-white {
    background-color: #ffffff8f;
}


html,
body {
    height: 100%;
    margin: 0;

}
</style>