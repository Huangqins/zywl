<template>
  <div class="entry">
    <Row  class="header">
         <i-col span="12">请选择您的导入方式</i-col>
    </Row>
    <Row>
        <Tabs type="card" :animated="false">
        <Tab-pane label="手动导入">
            <span>

                <Input v-model="password" placeholder="请输入资产"/>
            </span>
              
            
        </Tab-pane>
        <Tab-pane label="批量导入">
             
             <Upload  multiple  action="*">
             <i-button type="ghost" icon="ios-cloud-upload-outline">导入文件</i-button>
            </Upload>
           
        </Tab-pane>        
       </Tabs>
      
                   
    </Row>
    <br>
    <Row class="primary" type="flex" align='middle' justify="center">
        <i-col >
            <i-button type="primary">提交</i-button> 
        </i-col>
        
    </Row>
     
  </div>
</template>
<script>
export default {
  data(){
      return{
          password:''
      }
      
  }
}
</script>
<style scoped>
.entry{
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 600px;
  transform: translate3d(-50%, -50%, 0);
}
.header{
    height:40px;
    margin-bottom: 5px;
    line-height: 40px;
    font-size: 26px;

}
</style>
