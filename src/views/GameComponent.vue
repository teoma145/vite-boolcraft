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
            savedScore: false,
            shiftsNumber: 0,

            //aggiunte per i turni
            shift: null, //booleano: falso turno nemico, vero turno giocatore
            //aggiunte per il lancio del d20 "tiro per colpire"
            shotToHitNumbers: [], //per creare uno storico dei tiri usciti, FORSE NON SERVE!!!
            // shotToHitCurrent: 0, //creato e restituito dalla funzione shotToHit()
            selectedCharacterDefenseBase20: 0,
            randomCharacterDefenseBase20: 0,
            penalityInAttack : false, //nel caso di 1 critico, l'arma cade e perde il turno successivo
            bonusInAttack: false, //nel caso di 20 critico i danni verranno raddoppiati
            realCharacterSpeed: 0, //calcolato in base agli items
            realRandomSpeed:0,
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

            // this.base20DefenseCalculation();
            // this.firstShift();
            // this.shotToHit();
            // this.damageCalculated();
            this.newPlayBattle();


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

        newPlayBattle(){
            this.base20DefenseCalculation();
            this.firstShift();
            this.shiftsNumber = 0;
            let selectedCharacterLife = this.selectedCharacter.life;
            let randomCharacterLife = this.randomCharacter.life;
            
            while(randomCharacterLife > 0 && selectedCharacterLife > 0 ){
                console.log('ROUND: '+this.shiftsNumber);

                let speedCurrent;
                let defenceCurrent;
                let lifeCurrent;

                if(this.shift){
                    speedCurrent = this.realCharacterSpeed;
                    defenceCurrent = this.selectedCharacterDefenseBase20;
                    lifeCurrent = selectedCharacterLife;
                    console.log('tocca a te');
                }else{
                    speedCurrent = this.realRandomSpeed;
                    defenceCurrent = this.randomCharacterDefenseBase20;
                    lifeCurrent = randomCharacterLife;
                    console.log("tocca all'avversario");
                }
                
                console.log('penalità: ' + this.penalityInAttack);
                if(!this.penalityInAttack){
                    let shotToHitCurrent = this.shotToHit();
                    shotToHitCurrent += Math.round(speedCurrent / 10);
                    // console.log(Math.round(speedCurrent / 10));
                    console.log('tiro a colpire finale: ' + shotToHitCurrent);
                    let damageCurrent;
                    if(shotToHitCurrent > defenceCurrent && this.penalityInAttack === false){
                        damageCurrent=this.damageCalculated();
                        if(this.bonusInAttack){
                            damageCurrent *= 2;
                        }
                        if(!this.shift) selectedCharacterLife -= damageCurrent;
                        else randomCharacterLife -= damageCurrent;
                        console.log('danni causati: ' + damageCurrent);
                    }else{
                        console.log('COLPO SCHIVATO');
                    }
                }else {
                    console.log("HAI RACCOLTO L'ARMA");
                    this.penalityInAttack = false;
                }

                console.log('vita giocatore: ' + selectedCharacterLife + ' --- vita nemico: ' + randomCharacterLife);
                this.shift = !this.shift;
                this.shiftsNumber++;
            }


            if (selectedCharacterLife > randomCharacterLife) {
                this.youWin = true;
                console.log('HAI VINTO');
            }else if(randomCharacterLife > selectedCharacterLife){
                this.youLose = true;
                console.log('HAI PERSO');
            }else{
                this.tie = true;
                console.log('PAREGGIO');
            }
            this.score = lifeSelected - lifeRandom;
        },

        /**
         * @function
         * Calcola la difesa su base 20 per difetto per il personaggio selezionato e l'avversario.
         * @returns {void}
         */
         base20DefenseCalculation(){
            this.selectedCharacterDefenseBase20 = Math.floor(this.selectedCharacter.defence / 5);
            console.log('difesa su base 100 giocatore: '+this.selectedCharacter.defence + ' --- difesa su base 20 giocatore: '+this.selectedCharacterDefenseBase20);
            this.randomCharacterDefenseBase20 = Math.floor(this.randomCharacter.defence / 5);
            console.log('difesa su base 100 nemico: '+this.randomCharacter.defence + ' --- difesa su base 20 nemico: '+this.randomCharacterDefenseBase20);
        },

        /**
         * @function
         * Calcola chi gioca il primo turno in base alla velocità variata in base agli items trasportati
         * @returns {void}
         */
         firstShift(){
            this.realCharacterSpeed = this.selectedCharacter.speed;
            this.realRandomSpeed = this.randomCharacter.speed;
            for(let i = 0; i<this.selectedCharacter.items.length;i++){
                let subtrahend = this.selectedCharacter.items[i].weight.trim().substring(0, 2);
                subtrahend =parseInt(subtrahend);
                subtrahend *= 4;
                if (!isNaN(subtrahend)) {
                    this.realCharacterSpeed -= subtrahend;
                } else {
                    this.realCharacterSpeed -= 8;
                }
            }

            for(let i = 0; i<this.randomCharacter.items.length;i++){
                let subtrahend = this.randomCharacter.items[i].weight.trim().substring(0, 2);
                subtrahend =parseInt(subtrahend);
                subtrahend *= 4;
                if (!isNaN(subtrahend)) {
                    this.realRandomSpeed -= subtrahend;
                } else {
                    this.realRandomSpeed -= 10;
                }
            }
            // this.realCharacterSpeed = 1000; //per forzare un risultato
            console.log('velocità alleato calcolata: ' + this.realCharacterSpeed);
            console.log('velocità nemico a: ' + this.realRandomSpeed);
            this.shift = this.realCharacterSpeed > this.realRandomSpeed ? true : false;
            console.log('shift primo turno calcolato: ' + this.shift);
        },

        /**
         * @function
         * setta la penalità e il bonus a false, genera il tiro per colpire random (da 1 a 20), setta la penalità o il bunus se dovessero essere usciti gli estremi 1 o 20, restituisce il tiro.
         * @returns {numeber}
         */
         shotToHit(){
            // this.penalityInAttack = false; //FORSE NON VA RESETTATO QUA
            this.bonusInAttack = false;
            const shotToHitCurrent  = Math.floor(Math.random() * 20) + 1;
            console.log('tiro per colpire, numero uscito:' + shotToHitCurrent );
            this.penalityInAttack = shotToHitCurrent === 1 ? true : false;
            this.bonusInAttack = shotToHitCurrent === 20 ? true : false;
            console.log('penalità nel tiro:' + this.penalityInAttack + ' --- bonus nel tiro: ' + this.bonusInAttack);
            return shotToHitCurrent; //RICORDATI, AGGIUNGERE AL TIRO LA VELOCITA' REALE /10 ARROTONDATO
        },

        /**
         * @function
         * restituisce il danno calcolato in base all'attacco del pg e ai tiri del danno dei dani di un item preso randomicamente dall'inventario
         * @returns {numeber}
         */
        damageCalculated(){
            let damage = this.shift ? Math.round(this.selectedCharacter.attack / 10) : Math.round(this.randomCharacter.attack / 10); //se shift è vero è il turno del giocatore, quindi il danno base è il suo 
            // console.log('danno base calcolato:' + damage);
            let randomItem;
            if(this.shift){
                randomItem= this.getRndInteger(0,this.selectedCharacter.items.length);
                randomItem = this.selectedCharacter.items[randomItem];
            }else{
                randomItem= this.getRndInteger(0,this.randomCharacter.items.length);
                randomItem = this.randomCharacter.items[randomItem];

            }
            console.log('item usato: ' + randomItem.name);
            
            // randomItem.damage_dice = '3d12'; //per forzare un risultato

            let amountRolls = parseInt(randomItem.damage_dice.substring(0, 1), 10);//in un 2d6 la prima cifra indica sempre quante volte bisogna lanciare quel dado
            // console.log('il dado:'+ randomItem.damage_dice +' --- va lanciato: ' + amountRolls + ' volte');
            let maxDamageOfShot = parseInt(randomItem.damage_dice.substring(2), 10);
            // console.log('danno massimo a dado: ' + maxDamageOfShot);
            for(let i=0;i<amountRolls;i++){
                let damageOfShot = this.getRndInteger(1,maxDamageOfShot);
                // console.log('danno del tiro: ' + damageOfShot);
                damage += damageOfShot;
                // console.log(i);
            }
            console.log('danno finale calcolato:' + damage);
            return damage;
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