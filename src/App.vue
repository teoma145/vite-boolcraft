<template>
  <AppHeader/>
  <div class="space">
    <router-view ></router-view>
  </div>
  <AppFooter/>
</template>

<script>
import { store } from "./store";
import AppHeader from "./components/AppHeader.vue"
import AppFooter from "./components/AppFooter.vue";
export default {
  name: 'App',
  data() {
    return {

    }
  },
  components:{ AppHeader, AppFooter }
  
}
</script>

<style lang="scss" scoped>
.space{
  padding-top:100px;
}
</style>