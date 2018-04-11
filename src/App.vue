<template>
  <div id="app">
    <!-- <transition :name="transitionName"> 
　　　　　　<router-view class="Router"></router-view>
　　　　</transition> -->
<transition > 
　　　　　　<router-view ></router-view>
　　　　</transition>
  </div>
</template>

<script>
export default {
  name: "App",
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
  background: url("../static/background.png");
  background-size:cover;
  z-index: -9999;
}
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 1200px;
  height: 100%;  
  color: white;
}

.entry {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 525px;
  height: auto;
  transform: translateX(-50%) translateY(-50%) ;
  border: 1px solid #3889D9;
  padding: 30px 45px 30px 30px;
  border-radius: 9px;
  /* z-index: 9999; */
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
.ivu-form .ivu-form-item-label{
  color: #F6FBFB;
  font-size: 13px; 
}
.ivu-card-bordered .ivu-card-head{
  border-bottom:1px solid #3889D9 !important;
}
.ivu-btn-ghost{
  color: white;
}
.ivu-tabs-nav .ivu-tabs-tab{
  color: white;
}
.ivu-table td, .ivu-table th{
  height: 28px !important;
}
</style>
