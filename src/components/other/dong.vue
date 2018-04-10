<template>
  <div>
       <div  id="header">
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
       </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
#header{
    width: 500px;
    height: 500px;    
    margin: 0 auto;
}
.hero-logo-circles{
    width: 566px;
    height: 566px;
    margin: auto;
    position: relative;
}

.hero-logo-circle {
    position: absolute;
    left: 0;
    top: 0;
    -webkit-animation: hero-logo-circle 1s linear infinite;
    animation: hero-logo-circle 1s linear infinite;
    will-change: transform;
    width: 600px;
}
.hero-logo-circle:nth-child(1) {
    animation-duration: 30s;
}
.hero-logo-circle:nth-child(2) {
    animation-duration: 40s;
}
.hero-logo-circle:nth-child(3) {
    animation-duration: 50s;
}
.hero-logo-circle:nth-child(4) {
    animation-duration: 60s;
}
.hero-logo-circle:nth-child(5) {
    animation-duration: 70s;
}
.hero-logo-circle:nth-child(6) {
    animation-duration: 80s;
}
.hero-logo-circle:nth-child(7) {
    animation-duration: 90s;
}
.hero-logo-circle:nth-child(8) {
    animation-duration: 100s;
}
.hero-logo-circle:nth-child(9) {
    animation-duration: 110s;
}
.hero-logo-circle:nth-child(10) {
    animation-duration: 110s;
}
@keyframes hero-logo-circle{
    from{
       transform:rotate(0deg)
    }
    to{
       transform:rotate(360deg)
    }
}
</style>
