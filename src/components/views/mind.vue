<template>
  <div class="mind-container">
      <div class="mind-big mind-scroll">
          <img :src="imgSrc">
      </div>
      <div class="mind-middle mind-scroll">
           <img :src="imgSrc">
      </div>
      <div class="mind-small mind-scroll">
          <img :src="imgSrc">
      </div>
      <div class="mind-status mind-scroll">
          <img :src="statusSrc">
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgSrc: require("assets/png/m1.png"),
      statusSrc: require("assets/png/download.png")
    };
  }
};
</script>
<style scoped>
.mind-container {
  display: inline-block;
  position: relative;
  width: 138px;
  height: 117px;
  background: url("../../assets/png/mind.png") no-repeat;
  background-size: contain;
  overflow: hidden;
  margin-left:5px;
}
.mind-scroll {
  position: absolute;
}
.mind-scroll img {
  width: 100%;
  height: 100%;
}
.mind-big {
  left: 17px;
  top: 15px;
  width: 60px;
  height: 60px;
  animation: clockwise 1s infinite;
}
.mind-middle {
  left: 76px;
  top: 46px;
  width: 45px;
  height: 45px;
  animation: anticlockwise 1s infinite;
}

.mind-small {
  left: 74px;
  top: 5px;
  width: 30px;
  height: 30px;
  animation: clockwise 1s infinite;
}
.mind-status {
  width: 100%;
  top: -12px;
  left: 0px;
  animation: scroll 3s infinite;
}

@keyframes clockwise {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes anticlockwise {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(-360deg);
  }
}
@keyframes scroll {
  0% {
    top: -12px;
  }
  100% {
    top: 92px;
  }
}
</style>
