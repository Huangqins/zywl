<template>
<div>
  <div class="welcome">
        <div class="card">
            <h2>欢迎您!{{trueName}}来到智刃攻防平台,<br/>您尚未添加资产,请先导入资产</h2>      
        </div> 
        <div class="arrow">
          <i-button type="text" class="go" @click="go">去导入<Icon type="arrow-right-c"></Icon></i-button>
        </div>  
     
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
    ...mapGetters(["trueName"])
  },
  methods:{
    go(){
       this.$router.push({ path: '/assetAdd' })
    }
  }
};
</script>
<style scoped>
.arrow{
  width:600px;
  height:  60px;
  margin: 0 auto;
}
.go {
  float: right;
  font-size: 30px;
  color:#E2B163;
}
.card{
  font-size: 20px;
  font-family: serif;
  width:600px;
  height: 200px;
  text-align: center;
  border: 2px solid #2E375E;
  margin: 100px auto;
  background:rgba(84,107,219,0.1);
  padding: 45px 0;
  border-radius: 6px;
  -moz-box-shadow:-2px -3px 20px #3889D9, 1px 6px 20px #3889D9, 4px -2px 20px #3889D9, -2px 6px 20px #3889D9;
  -webkit-box-shadow:-2px -3px 20px #3889D9, 1px 6px 20px #3889D9, 4px -2px 20px #3889D9, -2px 6px 20px #3889D9;
  box-shadow:-2px -3px 20px #3889D9, 1px 6px 20px #3889D9, 4px -2px 20px #3889D9, -2px 6px 20px #3889D9;
}
</style>