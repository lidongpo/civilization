<template>
  <div id="Home">
    <div class="logo">
        <img  alt="Sid Meier's Civilization VI " src="../assets/civ6rf_marquee_logo_light.png" /> 
    </div>
    
      <div class="backgroundImageAnimate">
        <img  src="../assets/bgs.jpg"/>
      </div>
      
      <div class="start">
      <button>start</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      name: "<h1>Home</h1>"
    };
  },
  created() {}
};
</script>
<style lang="scss" scoped>
#Home {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  .logo{
    text-align: center;
    margin-top: 20px;
    img{
      width: 90%;
      box-shadow: 0 0 4px rgba(255,255,255,.3);
    }
  }
  .start{
    margin-top: 50%;
    text-align: center;
    button{
    color: #fff;
    width: 40vw;
    box-shadow: 0 0 1px rgba(255,255,255,1);
    border-radius: 2px;
    background-color: transparent;
    border: none;
    line-height: 30px;
    font-size: 1.6rem;
    }
  }
}
.backgroundImageAnimate {
  position: fixed;
  animation: myfirst 25s linear infinite;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: -100;
  img {
    width: 250%;
    margin-left: -48%;
  }
}

@keyframes myfirst {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes die {
  from {
    transform: scale(.5);
    opacity: 1;
  }
  to {
    transform: rotate(2);
    opacity: 0;
  }
}
</style>

