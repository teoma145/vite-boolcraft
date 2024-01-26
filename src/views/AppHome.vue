<template>
  <div class="conTain ">
    <img src="../assets/images/project2.jpg" alt="boolcraft" class="boolImages">
  </div>
  
  <div class="container d-flex justify-content-between align-items-center ">
   <button type="button" class="btn btn-outline-warning ">
   
    <p>INSERT COIN</p>
    <i class="fa-solid fa-circle-dollar-to-slot fa-bounce" style="color: #FFD43B;"></i>
  </button>
  
 
  <section class="d-flex ">
        <div class="container d-flex justify-content-between align-items-center ">
            
            <ul class="nav align-items-center icons">
                <li class="follow">Follow Us</li>
                <li><i class="fa-brands fa-facebook log"></i></li>
                <li><i class="fa-brands fa-square-x-twitter log" ></i></li>
                <li><i class="fa-brands fa-youtube log" ></i></li>
                <li><i class="fa-brands fa-periscope log" ></i></li>
            </ul>
        
          </div>

    </section>
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

.conTain{
    
   
    height: 100vh;
    width: 100%;
    
     
  }
  .boolImages{
    width: 100%;
    height: 100%;
    //background-repeat: no-repeat;
    //margin-left: 22%;
    position: relative;
    //object-fit: cover;
    //object-position: top;
   
}
.btn{
  position: absolute;
  top: 65%;
  
  //width: 300px;

  //height: 140px;
  //background-color: rgba(80, 76, 71, 0.815);
  background-color: rgba(8, 8, 38, 0.632);
  left: 43%;
  
  border:none;
  color: orange;
  font-size: 2.5em;
  //font-family: 'Sixtyfour', sans-serif;
  //font-family: 'Honk', system-ui;
  font-family: 'Black Ops One', system-ui;
  
}
 

.btn:hover { 
    transition: 1s;
    background-color: rgba(19, 19, 19, 0.849);
}

.icons{
  position: absolute;
  top: 90%;
  margin-left: 16%;
}

.log{
  margin-left: 60px;
  font-size: 2.3em;
  color: #FFD43B;
  
}

.follow{
  font-family: 'Black Ops One', system-ui;
  font-size: 1.5em;
  color: rgb(26, 24, 20);
}

</style>