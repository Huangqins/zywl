<template>
  <div id="app">
    <transition :name="transitionName"> 
　　　　　　<router-view class="Router"></router-view>
　　　　</transition>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data() {
    return {
      transitionName: "slide-right" // 默认动态路由变化为slide-right
    };
  },
  watch: {
    $route(to, from) {
      let isBack = this.$router.isBack; //  监听路由变化时的状态为前进还是后退
      if (isBack) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
      this.$router.isBack = false;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 1200px;
  height: 100%;
  /* background: url('./bg.jpg') no-repeat;
  background-size: cover; */
}
.Router {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 0.8s ease;
  top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.entry {
  width: 400px;
  height: 560px;
  padding: 30px 50px 0px 10px;
  /* transform: translate3d(-50%, -50%, 0); */
  box-shadow:0px 1px 6px #B3B3B3, -2px 4px 15px #B3B3B3;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}
</style>
