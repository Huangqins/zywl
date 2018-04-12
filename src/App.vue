<template>
  <div id="app">
        <transition > 
　　　　<router-view ></router-view>
　　 </transition>
  </div>
</template>
<script>
export default {
  name: "App"
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  position: relative;
  background: url("../static/background.png");
  background-size: cover;
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
  /* width: 525px; */
  height: auto;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 9px;
  /* z-index: 9999; */
}
.ivu-form .ivu-form-item-label {
  color: #f6fbfb;
  font-size: 13px;
}
.ivu-card-bordered .ivu-card-head {
  border-bottom: 1px solid #3889d9 !important;
}
.ivu-btn-ghost {
  color: white;
}
.ivu-tabs-nav .ivu-tabs-tab {
  color: white;
}
.ivu-table td,
.ivu-table th {
  height: 28px !important;
}
</style>
