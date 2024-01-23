<template>
    <main class="container">
        <div v-if="Item">
            <h1>{{ Item.name }}</h1>
        </div>
    </main>
</template>

<script>
import axios from 'axios';
import { store } from '../store';
export default {
    name: 'SingleItem',
    data() {
        return {
            store,
            Item: null
        }
    },
    methods: {
        getItemData() {

            axios.get(`${this.store.apiBaseUrl}/items/${this.$route.params.id}`).then((res) => {
                console.log(res.data)
                if (res.data.result) {
                    this.Item = res.data.result
                }

            })
        }
    },
    created() {
        this.getItemData()
    }
}
</script>

<style lang="scss" scoped></style>