<template>
<div>
  <div class="welcome">
     <Card style="width:100%;background:#3399FF" >
        <div style="text-align:center">
            <h2>欢迎您{{true_name}}来到智刃攻防平台,您尚未添加资产,请先导入资产</h2>      
        </div>
    </Card>
     <i-button type="text" class="go" >去导入<Icon type="arrow-right-c"></Icon></i-button>
  </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "welcome",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["true_name"])
  }
};
</script>
<style scoped>
.welcome {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 408px;
  height: 600px;
  transform: translate3d(-50%, -50%, 0);
}
.go {
  font-size: 30px;
  position: absolute;
  bottom: 0px;
  right: 0px;
}
</style>