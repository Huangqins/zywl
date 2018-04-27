<template>
<div>
  <div class="entry welcome">
        <div class="card">
            <h2>欢迎您使用智刃智能攻防平台,<br/>系统检测您尚未导入资产,请先进行资产导入</h2>  
            <div >
          <i-button type="text" class="go" @click="go">去导入<Icon type="arrow-right-c"></Icon></i-button>
        </div>    
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
.welcome{
  border: none;
  width: 600px;
  color:#fff ;
}
.arrow{
  width:600px;
  height:  60px;
  margin: 0 auto;
}
.go {
  font-size: 18px;
  color:white;
  margin-top:24px;
  margin-left: 330px;
  background: #43B8EA; 
  border-radius: 30px;
}
.go:hover{
transform: scale(1.5,1.5)
}
.card{
  font-size: 15px;
  font-family: serif;
  width:100%;
  height: 400px;
  text-align: center;
  /* background:rgba(84,107,219,0.1); */
  background: url("../../assets/card.svg") no-repeat 100%;
  background-size: contain;
  padding: 90px 0 0 80px;
  /* -moz-box-shadow:-2px -3px 20px #3889D9, 1px 6px 20px #3889D9, 4px -2px 20px #3889D9, -2px 6px 20px #3889D9;
  -webkit-box-shadow:-2px -3px 20px #3889D9, 1px 6px 20px #3889D9, 4px -2px 20px #3889D9, -2px 6px 20px #3889D9;
  box-shadow:-2px -3px 20px #3889D9, 1px 6px 20px #3889D9, 4px -2px 20px #3889D9, -2px 6px 20px #3889D9; */
}
</style>