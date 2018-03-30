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
html,
body {
  width: 100%;
  height: 100%;
  position: relative;   
  background: url("./assets/background.jpg");
  background-size:cover;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 1200px;
  height: 100%;  
  color: white;
 
}
.Router {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 0.8s ease;
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
