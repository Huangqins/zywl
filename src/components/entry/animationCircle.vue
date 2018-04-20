<template>
    <div class="hero-logo-circles">
               <img src="../../assets/svg/1.svg" class="hero-logo-circle"/>
               <img src="../../assets/svg/2.svg" alt="" class="hero-logo-circle">
               <img src="../../assets/svg/3.svg" alt="" class="hero-logo-circle">
               <img src="../../assets/svg/4.svg" alt="" class="hero-logo-circle">
               <img src="../../assets/svg/5.svg" alt="" class="hero-logo-circle">
               <img src="../../assets/svg/6.svg" alt="" class="hero-logo-circle">
               <img src="../../assets/svg/7.svg" alt="" class="hero-logo-circle">
               <img src="../../assets/svg/8.svg" alt="" class="hero-logo-circle">
               <img src="../../assets/svg/9.svg" alt="" class="hero-logo-circle">
               <img src="../../assets/svg/10.svg" alt="" class="hero-logo-circle">
           </div>
</template>
<script>
export default {};
</script>
<style scoped>
.hero-logo-circles {
  width: 400px;
  height: 400px;
  margin: auto;
  position: relative;
  /* margin-top: -55px;
  margin-left: 20px; */
}
.hero-logo-circle {
  position: absolute;
  left: 0;
  top: 0;
  -webkit-animation: hero-logo-circle 1s linear infinite;
  -ms-animation:  hero-logo-circle 1s linear infinite;
  animation: hero-logo-circle 1s linear infinite;
  will-change: transform;
  width: 400px;
}
.hero-logo-circle:nth-child(1) {
  animation-duration: 30s;
  -ms-animation-duration: 30s;
}
.hero-logo-circle:nth-child(2) {
  animation-duration: 40s;
  -ms-animation-duration: 40s;
}
.hero-logo-circle:nth-child(3) {
  animation-duration: 50s;
   -ms-animation-duration: 50s;
}
.hero-logo-circle:nth-child(4) {
  animation-duration: 60s;
   -ms-animation-duration: 60s;
}
.hero-logo-circle:nth-child(5) {
  animation-duration: 70s;
   -ms-animation-duration: 70s;
}
.hero-logo-circle:nth-child(6) {
  animation-duration: 80s;
   -ms-animation-duration: 80s;
}
.hero-logo-circle:nth-child(7) {
  animation-duration: 90s;
   -ms-animation-duration: 90s;
}
.hero-logo-circle:nth-child(8) {
  animation-duration: 100s;
   -ms-animation-duration: 100s;
}
.hero-logo-circle:nth-child(9) {
  animation-duration: 110s;
   -ms-animation-duration: 110s;
}
.hero-logo-circle:nth-child(10) {
  animation-duration: 110s;
   -ms-animation-duration: 110s;
}
@keyframes hero-logo-circle {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@-ms-keyframes hero-logo-circle {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>


