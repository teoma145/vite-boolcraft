<template>
  <AppHeader/>
  <router-view></router-view>
</template>

<script>
import { store } from "./store";
import AppHeader from "./components/AppHeader.vue"
export default {
  name: 'App',
  data() {
    return {

    }
  },
  components:{ AppHeader }
  
}
</script>

<style lang="scss" scoped>

</style>