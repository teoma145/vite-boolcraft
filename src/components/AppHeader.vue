<template>
    <div class="bg-personal">
        <div class="container d-flex align-items-center justify-content-between">
            <div class="logo">
                <img src="../../public/images/Senza titolo-1.png" alt="logo">
            </div>
            <nav>
                <ul class="d-flex align-items-center ">
                    <li v-for="(item) in routes" class="mx-2">
                        <router-link class="text-decoration-none text-black" :to="{ name: `${item.path}`}"> {{ item.name }}</router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppHeader',
    data() {
        return {
            routes: [
                {
                    path: 'home',
                    name: 'Home',
                },
                {
                    path: 'types',
                    name: 'Types',
                },
                {
                    path: 'characters',
                    name: 'Characters',
                },
                {
                    path: 'items',
                    name: 'Items',
                }
            ]
        }
    },
}
</script>

<style lang="scss" scoped>
img {
    width: 250px;
    object-fit: cover;
}

ul {
    list-style: none;
}

.bg-personal{
    background: rgb(58,120,38);
    background: linear-gradient(180deg, rgba(58,120,38,1) 0%, rgba(58,120,38,0) 100%);
    position: fixed;
    z-index: 1000;
    width:100vw;
    height:100px;
}
</style>