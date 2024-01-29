<template>
  <div class="bg">
    <div class="conTain ">
      <img src="../assets/images/project2.jpg" alt="boolcraft" class="boolImages">
    </div>
    <div class="container d-flex justify-content-between align-items-center ">
      <div>
        <router-link :to="{ name: 'game' }" type="button" class="btn btn-outline-warning ">
          <p>INSERT COIN</p>
          <i class="fa-solid fa-circle-dollar-to-slot fa-bounce" style="color: #FFD43B;"></i>
        </router-link>
        <div class="d-flex flex-column align-items-center socials">
          <h3 class="follow">Follow Us</h3>
          <ul class="navicons list-unstyled d-flex justify-content-center">
            <li><i class="fa-brands fa-facebook mx-3 log"></i></li>
            <li><i class="fa-brands fa-square-x-twitter mx-3 log"></i></li>
            <li><i class="fa-brands fa-youtube mx-3 log"></i></li>
            <li><i class="fa-brands fa-periscope mx-3 log"></i></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store";

export default {
  name: 'AppHome',
  data() {
    return {

    }
  },

}
</script>

<style lang="scss" scoped>
.conTain {
  height: 100vh;
  width: 100%;
}

.socials{
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.boolImages {
  width: 100%;
  height: 100%;
  //background-repeat: no-repeat;
  //margin-left: 22%;
  position: relative;
  //object-fit: cover;
  //object-position: top;
}

.btn {
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  //width: 300px;
  //height: 140px;
  //background-color: rgba(80, 76, 71, 0.815);
  background-color: rgba(8, 8, 38, 0.632);
  border: none;
  color: orange;
  font-size: 2.5em;
  font-family: 'Black Ops One', system-ui;
}


.btn:hover {
  transition: 1s;
  background-color: rgba(19, 19, 19, 0.849);
}

.icons {
  position: absolute;
  top: 90%;
  //margin-left: 16%;
  right: 40%;
}

.log {
  font-size: 2.3em;
  //color: #FFD43B;
  color: black;
}

.follow {
  font-family: 'Black Ops One', system-ui;
  font-size: 1.5em;
  color: rgb(26, 24, 20);
}

.bg {
  margin-top: -100px;

  background-image: url('../assets/images/project2.jpg');
  background: no-repeat;
  background-size: cover;
}
</style>