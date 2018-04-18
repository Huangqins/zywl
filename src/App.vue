<template>
  <div id="app">
        <headers v-if="token"></headers>
　　　　<router-view  :style="{marginTop: token ? '36px': 0}"></router-view>
    </div>     
</template>
<script>
import headers from "components/layout/headers";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
export default {
  name: "App",
  computed: {
    ...mapGetters(["token"])
  },
  components: {
    headers
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  position: relative;
  background: #171d25;
  background: linear-gradient(top, #13181e, #181e26 88%);
  z-index: -9999;
}
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 1200px;
  height: 100%;
  color: white;
  background: url("./assets/bg.png") repeat 0 0;
  background-size: 256px 150px;
  overflow: hidden;
  z-index: -9998;
}

.entry {
  position: absolute;
  left: 50%;
  top: 50%;
  height: auto;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 9px;
  z-index: 2;
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
