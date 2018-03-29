<template>
<div>
  <div class="welcome">
      <div class="homepage">
          <div>历史信息查询</div>
          <div>资产信息管理</div>
          <div>攻防测试</div>
          <div>报告信息管理</div>
          <div>知识库管理</div>
          <div>智能服务</div>
      </div>
  </div>
  </div>
</template>
<script>
export default {
    name:'taskhomepage',
    data(){
        return{

        }
    }
  
}
</script>
<style scoped>
.welcome {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 410px;
  height: 600px;
  transform: translate3d(-50%, -50%, 0);
}
.homepage{
    width: 410px;
    height: 600px;
    background: #cccccc; 
    display: flex; 
    font-size: 26px;
    flex-flow: row wrap;    
    border: 1px solid #666000;  

}
.homepage div{
    /* margin:10px 10px 0 10px; */
    background: dodgerblue;
    /* border-radius:50%; */
   
    line-height: 200px;
    text-align: center;
    width:204px;
    height: 196px;
}
</style>
  