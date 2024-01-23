<template>
    <div v-if="character">{{ character.name }}</div>
    <div v-else>Loading...</div>
</template>

<script>
import axios from 'axios';
import { store } from "../store";

export default {
    name: 'CharacterDetail',
    data() {
        return {
            character: null,
            store,
        };
    },
    methods: {
        getCharacterData() {
            axios.get(`${this.store.apiBaseUrl}/characters/${this.$route.params.id}`)
            .then((res) => {
                console.log(res.data.data);
                if (res.data.success) {
                    this.character = res.data.data;
                } else {
                    console.error('Failed to fetch character data:', res.data.error);
                }
            })
            .catch((error) => {
                console.error('Error fetching character data:', error);
            });
        }
    },
    created() {
        this.getCharacterData();
    }
}
</script>

<style lang="scss" scoped>
    
</style>