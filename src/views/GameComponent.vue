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
                                <div>Type: {{ selectedCharacter.type.name }}</div>
                                <div>Life:{{ selectedCharacter.life }}</div>
                                <div>Speed:{{ selectedCharacter.speed }} </div>
                                <div>Attack: {{ selectedCharacter.attack }}</div>
                                <div>Defence:{{ selectedCharacter.defence }} </div>

                                <div>Items: <span v-for="item in selectedCharacter.items ">, {{ item.name }}</span> .</div>




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
                            <div class="card-body mb-5">
                                <h5>Name:{{ randomCharacter.name }}</h5>
                                <div>Type: {{ randomCharacter.type.name }}</div>
                                <div>Life:{{ randomCharacter.life }}</div>
                                <div>Speed:{{ randomCharacter.speed }} </div>
                                <div>Attack: {{ randomCharacter.attack }}</div>
                                <div>Defence:{{ randomCharacter.defence }} </div>

                                <div>Items: <span v-for="item in randomCharacter.items ">, {{ item.name }}</span> .</div>
                            </div>
                        </div>

                    </div>

                </div>


            </div>

            <div class="text-black">
                <div v-if="randomCharacter" class="text-center">
                    <button class="btn btn-primary" @click="playBattle()"> Play the Battle</button>
                </div>

            </div>
            <div v-if="score" class="row w-100 justify-space-between">
                <div class="col-12 col-md-6 col-lg-4">
                    <h4>Results Battle</h4>
                    <div v-if="youLose">
                        <h2 class="text-danger">You Lose</h2>
                    </div>
                    <div v-if="youWin">
                        <h2 class="text-success">You Win</h2>
                    </div>
                    <div v-if="tie">
                        <h2 class="text-primary">Tie</h2>
                    </div>
                    <h6 class="mb-2">Score: {{ score }}</h6>
                    <div class="mb-5">
                        <button class="btn btn-warning" @click="newBattle()">Play New Battle</button>
                    </div>
                </div>

                <div v-if="!savedScore" class="col-12 col-md-6 ">
                    <label for="name">Insert Your Name and save the score</label>
                    <input v-model="inputName" id="name" class="form-control" type="text">
                    <button @click="saveScore()" class="btn btn-success"> Save Score</button>
                </div>
                <div v-else class="col-12 col-md-6 table-container">
                    <i class="text-success fa-solid fa-check"></i> <span class="text-capitalize">{{
                        inputName }}</span>, your Score ({{ score }}) Has Been Saved;

                    <h6>Best score class#107:</h6>
                    <table class="table table-dark table-striped">

                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>score</th>
                            </tr>

                        </thead>


                        <tbody>
                            <tr v-for="score in store.stats">
                                <td> {{ score.name }}</td>
                                <td> {{ score.score }}</td>
                            </tr>
                        </tbody>



                    </table>
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
            randomCharacter: null,
            selectedCharacterId: null,
            selectedCharacter: null,
            charactersFree: null,
            youWin: false,
            tie: false,
            youLose: false,
            score: null,
            inputName: null,
            savedScore: false
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
        getStats() {
            axios.get(store.apiBaseUrl + '/stats').then(res => {
                store.stats = res.data.results;
                console.log(store.stats);
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
        },
        playBattle() {
            // console.log('la battaglia inizia');

            let speed, lifeSelected, lifeRandom, attack, score;
            speed = this.selectedCharacter.speed - this.randomCharacter.speed;
            if (speed > 0) {
                attack = this.selectedCharacter.attack - this.randomCharacter.defence;
                if (attack > 0) {
                    lifeRandom = this.randomCharacter.life - this.selectedCharacter.attack;
                    lifeSelected = this.selectedCharacter.life;
                }
            } else {
                attack = this.randomCharacter.attack - this.selectedCharacter.defence;
                if (attack > 0) {
                    lifeSelected = this.selectedCharacter.life - this.randomCharacter.attack;
                    lifeRandom = this.randomCharacter.life;
                }
            }

            if (lifeSelected > lifeRandom) {
                this.youWin = true;
                score = lifeSelected - lifeRandom + speed - attack;
            } else if (lifeSelected === lifeRandom) {
                this.tie = true;
                score = speed - attack;
            } else {
                this.youLose = true;
                score = lifeSelected - lifeRandom - speed + attack;
            }
            console.log('vita nostro giocatore :' + lifeSelected);
            console.log('vita giocatore random:' + lifeRandom);
            this.score = score;

        },
        newBattle() {
            this.youLose = false;
            this.tie = false;
            this.youWind = false;
            this.score = null;
            this.selectedCharacter = null;
            this.randomCharacter = null;
            this.inputName = null;
            this.savedScore = false;

        },
        saveScore() {
            //console.log('punteggio :' + this.score);
            //console.log('nome :' + this.inputName);
            const params = { name: this.inputName, score: this.score };
            axios.post(store.apiBaseUrl + '/stats', params).then(res => {
                console.log(res);
                if (res.data.success) {

                    this.savedScore = true;
                    store.stats = res.data.results;
                }
            })


        }
    },


    created() {
        this.getGameCharacters();
        this.getGameTypes();
        this.getGameItems();
        this.getStats();
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