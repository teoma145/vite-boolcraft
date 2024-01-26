<template>
  <AppHeader/>
  <div class="space">
    <router-view ></router-view>
  </div>
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
.space{
  padding-top:100px;
}
</style>